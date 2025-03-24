'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ImageUploader from '../components/ImageUploader';

export default function ProductImageUploadPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (editId) {
      setIsEditMode(true);
    }
  }, [editId]);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImageUrl(imageUrl);
  };

  const handleSubmit = async () => {
    if (!uploadedImageUrl) {
      alert('Prosím, najprv nahrajte obrázok.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Uložíme URL obrázka do lokálneho úložiska, aby sme ho mohli použiť pri vytváraní/úprave produktu
      localStorage.setItem('productImageUrl', uploadedImageUrl);
      
      // Presmerujeme používateľa na príslušnú stránku podľa režimu
      if (isEditMode && editId) {
        router.push(`/admin/products/${editId}/edit`);
      } else {
        router.push('/admin/products/new');
      }
    } catch (error) {
      console.error('Error saving image URL:', error);
      alert('Nastala chyba pri ukladaní URL obrázka.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link 
          href={isEditMode && editId ? `/admin/products/${editId}/edit` : "/admin/products"} 
          className="text-indigo-600 hover:text-indigo-900"
        >
          &larr; {isEditMode ? 'Späť na úpravu produktu' : 'Späť na zoznam produktov'}
        </Link>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Nahratie obrázka produktu
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {isEditMode 
              ? 'Nahrajte nový obrázok produktu' 
              : 'Nahrajte obrázok produktu pred jeho vytvorením'}
          </p>
        </div>
        
        <div className="px-6 py-5 space-y-6">
          <ImageUploader 
            onImageUploadAction={handleImageUpload}
            currentImageUrl={uploadedImageUrl}
          />
          
          <div className="flex justify-end space-x-3 pt-5">
            <Link
              href={isEditMode && editId ? `/admin/products/${editId}/edit` : "/admin/products"}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Zrušiť
            </Link>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!uploadedImageUrl || isSubmitting}
              className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white 
                ${!uploadedImageUrl || isSubmitting 
                  ? 'bg-indigo-300 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
            >
              {isSubmitting 
                ? 'Spracovávam...' 
                : isEditMode 
                  ? 'Pokračovať k úprave produktu' 
                  : 'Pokračovať k vytvoreniu produktu'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
