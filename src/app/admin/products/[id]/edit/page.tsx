'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { handleUpdateProduct } from '../../actions';
import { Product } from '@/lib/admin-service';

type EditProductPageProps = {
  params: {
    id: string;
  };
};

export default function EditProductPage({ params }: EditProductPageProps) {
  const { id } = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/admin/products/${id}`);
        if (!response.ok) {
          throw new Error('Produkt sa nepodarilo načítať');
        }
        
        const data = await response.json();
        setProduct(data);
        if (data.image_url) {
          setImageUrl(data.image_url);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Nastala chyba pri načítavaní produktu.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProduct();
  }, [id]);
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const image_url = formData.get('image_url') as string;
    const in_stock = formData.get('in_stock') === 'true';
    const featured = formData.get('featured') === 'true';
    
    if (!name || !price || !category) {
      setError('Vyplňte prosím všetky povinné polia.');
      setIsSubmitting(false);
      return;
    }
    
    const updatedProduct: Product = {
      name,
      description,
      price,
      category,
      image_url: image_url || undefined,
      in_stock,
      featured
    };
    
    try {
      const result = await handleUpdateProduct(id, updatedProduct);
      
      if (result.error) {
        setError(result.error);
        setIsSubmitting(false);
        return;
      }
      
      router.push('/admin/products');
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Nastala neočakávaná chyba pri aktualizácii produktu.');
      setIsSubmitting(false);
    }
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  if (error && !product) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Chyba! </strong>
        <span className="block sm:inline">{error}</span>
        <div className="mt-4">
          <Link href="/admin/products" className="text-indigo-600 hover:text-indigo-900">
            &larr; Späť na zoznam produktov
          </Link>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Upozornenie! </strong>
        <span className="block sm:inline">Produkt sa nenašiel.</span>
        <div className="mt-4">
          <Link href="/admin/products" className="text-indigo-600 hover:text-indigo-900">
            &larr; Späť na zoznam produktov
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Upraviť produkt</h1>
        <Link 
          href="/admin/products" 
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Späť na zoznam
        </Link>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Názov produktu *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    defaultValue={product.name}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Popis
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    defaultValue={product.description || ''}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Cena (€) *
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    min="0"
                    step="0.01"
                    required
                    defaultValue={product.price}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Kategória *
                </label>
                <div className="mt-1">
                  <select
                    id="category"
                    name="category"
                    required
                    defaultValue={product.category || ''}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Vyberte kategóriu</option>
                    <option value="face">Tvár</option>
                    <option value="body">Telo</option>
                    <option value="hair">Vlasy</option>
                    <option value="makeup">Make-up</option>
                    <option value="gift">Darčekové poukazy</option>
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                  Obrázok produktu
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="image_url"
                    id="image_url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  
                  {imageUrl && (
                    <div className="mt-2 relative h-32 w-32 rounded overflow-hidden border border-gray-200">
                      <Image
                        src={imageUrl}
                        alt="Náhľad obrázka produktu"
                        fill
                        className="object-cover"
                        onError={() => setImageUrl('')}
                      />
                    </div>
                  )}
                  
                  <div className="mt-2">
                    <Link 
                      href={`/admin/products/upload?edit=${id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Nahrať nový obrázok
                    </Link>
                  </div>
                </div>
              </div>
              
              <div>
                <fieldset>
                  <legend className="text-sm font-medium text-gray-700">Dostupnosť</legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="in_stock_true"
                        name="in_stock"
                        type="radio"
                        value="true"
                        defaultChecked={product.in_stock}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="in_stock_true" className="ml-3 block text-sm font-medium text-gray-700">
                        Na sklade
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="in_stock_false"
                        name="in_stock"
                        type="radio"
                        value="false"
                        defaultChecked={!product.in_stock}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="in_stock_false" className="ml-3 block text-sm font-medium text-gray-700">
                        Vypredané
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              
              <div>
                <fieldset>
                  <legend className="text-sm font-medium text-gray-700">Odporúčaný produkt</legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="featured_true"
                        name="featured"
                        type="radio"
                        value="true"
                        defaultChecked={product.featured}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="featured_true" className="ml-3 block text-sm font-medium text-gray-700">
                        Áno
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="featured_false"
                        name="featured"
                        type="radio"
                        value="false"
                        defaultChecked={!product.featured}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="featured_false" className="ml-3 block text-sm font-medium text-gray-700">
                        Nie
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Link
                href="/admin/products"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                Zrušiť
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                  isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {isSubmitting ? 'Ukladá sa...' : 'Uložiť zmeny'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
