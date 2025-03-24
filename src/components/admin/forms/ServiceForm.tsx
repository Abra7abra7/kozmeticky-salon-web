'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Service } from '@/lib/admin-service';
import ImageUploader from '@/components/admin/ImageUploader';

interface ServiceFormProps {
  service?: Service;
  onSubmit: (data: Service) => void;
  onCancel: () => void;
}

export default function ServiceForm(props: ServiceFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Service>({
    defaultValues: props.service || {
      name: '',
      category: '',
      description: '',
      duration: 60,
      price: 0,
      popularity: 0
    }
  });

  const categories = [
    'Ošetrenia tváre',
    'Permanentný make-up',
    'Manikúra',
    'Masáže',
    'Depilácia',
    'Mihalnice',
    'Iné'
  ];

  const { service, onSubmit, onCancel } = props;

  const imageUrl = watch('image_url');

  const handleImageUpload = (url: string) => {
    setValue('image_url', url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Názov služby
        </label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Názov služby je povinný' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Kategória
        </label>
        <select
          id="category"
          {...register('category', { required: 'Kategória je povinná' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Vyberte kategóriu</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Popis
        </label>
        <textarea
          id="description"
          rows={3}
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Trvanie (minúty)
          </label>
          <input
            id="duration"
            type="number"
            min="1"
            {...register('duration', { 
              required: 'Trvanie je povinné',
              valueAsNumber: true,
              min: { value: 1, message: 'Trvanie musí byť aspoň 1 minúta' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Cena (€)
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            {...register('price', { 
              required: 'Cena je povinná',
              valueAsNumber: true,
              min: { value: 0, message: 'Cena nemôže byť záporná' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="discounted_price" className="block text-sm font-medium text-gray-700">
            Zľavnená cena (€)
          </label>
          <input
            id="discounted_price"
            type="number"
            step="0.01"
            min="0"
            {...register('discounted_price', { 
              valueAsNumber: true,
              min: { value: 0, message: 'Zľavnená cena nemôže byť záporná' }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.discounted_price && (
            <p className="mt-1 text-sm text-red-600">{errors.discounted_price.message}</p>
          )}
        </div>

        <div>
          <ImageUploader 
            onImageUploadAction={handleImageUpload}
            currentImageUrl={imageUrl}
            label="Obrázok služby"
          />
        </div>
      </div>

      <div>
        <label htmlFor="popularity" className="block text-sm font-medium text-gray-700">
          Popularita (0-100)
        </label>
        <input
          id="popularity"
          type="number"
          min="0"
          max="100"
          {...register('popularity', { 
            valueAsNumber: true,
            min: { value: 0, message: 'Popularita nemôže byť záporná' },
            max: { value: 100, message: 'Popularita nemôže byť vyššia ako 100' }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.popularity && (
          <p className="mt-1 text-sm text-red-600">{errors.popularity.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Zrušiť
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Uložiť
        </button>
      </div>
    </form>
  );
}
