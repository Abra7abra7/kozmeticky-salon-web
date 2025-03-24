import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    
    // Získanie dát z formData
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json(
        { error: 'Žiadny obrázok nebol poskytnutý' },
        { status: 400 }
      );
    }
    
    // Kontrola typu súboru
    if (!image.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Nahraný súbor nie je obrázok' },
        { status: 400 }
      );
    }
    
    // Kontrola veľkosti súboru (max 5MB)
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Obrázok je príliš veľký (max 5MB)' },
        { status: 400 }
      );
    }
    
    // Konverzia na buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Spracovanie obrázka pomocou sharp
    const webpBuffer = await sharp(buffer)
      .resize(1200, 800, { fit: 'inside', withoutEnlargement: true }) // Resize obrázka
      .webp({ quality: 80 }) // Konverzia na WebP s 80% kvalitou
      .toBuffer();
    
    // Generovanie unikátneho názvu súboru
    const fileName = `${uuidv4()}.webp`;
    const filePath = `uploads/${fileName}`;
    
    // Skontrolujeme, či bucket existuje a prípadne ho vytvoríme
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === 'images');
    
    if (!bucketExists) {
      // Vytvoríme bucket, ak neexistuje
      const { error: bucketError } = await supabase.storage.createBucket('images', {
        public: true, // Nastavíme bucket ako verejný
      });
      
      if (bucketError) {
        console.error('Error creating bucket:', bucketError);
        return NextResponse.json(
          { error: 'Chyba pri vytváraní úložiska pre obrázky' },
          { status: 500 }
        );
      }
    }
    
    // Nahratie do Supabase Storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, webpBuffer, {
        contentType: 'image/webp',
        upsert: false,
      });
    
    if (error) {
      console.error('Supabase storage error:', error);
      return NextResponse.json(
        { error: 'Chyba pri nahrávaní obrázka do úložiska' },
        { status: 500 }
      );
    }
    
    // Získanie verejnej URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
    
    return NextResponse.json({ imageUrl: publicUrl });
  } catch (error: any) {
    console.error('Error processing image upload:', error);
    return NextResponse.json(
      { error: error.message || 'Nastala neočakávaná chyba pri spracovaní obrázka' },
      { status: 500 }
    );
  }
}
