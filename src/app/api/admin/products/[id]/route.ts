import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/admin-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID produktu je povinné' },
        { status: 400 }
      );
    }
    
    const { data: product, error } = await getProductById(id);
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    if (!product) {
      return NextResponse.json(
        { error: 'Produkt sa nenašiel' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Nastala neočakávaná chyba pri získavaní produktu' },
      { status: 500 }
    );
  }
}
