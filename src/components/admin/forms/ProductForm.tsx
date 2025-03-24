'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Product } from '@/lib/admin-service';
import ImageUploader from '@/components/admin/ImageUploader';

interface ProductFormProps {
  product?: Product;
  onSubmitAction: (data: Product) => void;
  onCancelAction: () => void;
}

export default function ProductForm({
  product,
  onSubmitAction,
  onCancelAction
}: ProductFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Product>({
    defaultValues: product || {
      name: '',
      description: '',
      price: 0,
      image_url: '',
      category: '',
      in_stock: true,
      featured: false
    }
  });

  const imageUrl = watch('image_url');

  const handleImageUpload = (url: string) => {
    setValue('image_url', url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitAction)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Názov produktu *
            </label>
            <input
              id="name"
              type="text"
              className={`w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
              {...register('name', { required: 'Názov produktu je povinný' })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Cena (€) *
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              className={`w-full rounded-md border ${errors.price ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
              {...register('price', { 
                required: 'Cena je povinná',
                min: {
                  value: 0,
                  message: 'Cena nemôže byť záporná'
                },
                valueAsNumber: true
              })}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Kategória
            </label>
            <input
              id="category"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              {...register('category')}
            />
          </div>

          <div>
            <ImageUploader 
              onImageUploadAction={handleImageUpload}
              currentImageUrl={imageUrl}
              label="Obrázok produktu"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                id="in_stock"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                {...register('in_stock')}
              />
              <label htmlFor="in_stock" className="ml-2 text-sm text-gray-700">
                Na sklade
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="featured"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                {...register('featured')}
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                Odporúčaný produkt
              </label>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Popis produktu
          </label>
          <textarea
            id="description"
            rows={10}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            {...register('description')}
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6">
        <button
          type="button"
          onClick={onCancelAction}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Zrušiť
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {product ? 'Aktualizovať produkt' : 'Vytvoriť produkt'}
        </button>
      </div>
    </form>
  );
}
