'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BlogPost } from '@/lib/admin-service';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import the editor to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface BlogPostFormProps {
  blogPost?: BlogPost;
  onSubmitAction: (data: BlogPost) => void;
  onCancelAction: () => void;
}

export default function BlogPostForm({
  blogPost,
  onSubmitAction,
  onCancelAction
}: BlogPostFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<BlogPost>({
    defaultValues: blogPost || {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image_url: '',
      categories: [],
      published: false,
      published_at: new Date().toISOString()
    }
  });

  const [editorContent, setEditorContent] = useState<string>(blogPost?.content || '');
  const [imagePreview, setImagePreview] = useState<string | null>(blogPost?.image_url || null);
  const [categories, setCategories] = useState<string[]>(blogPost?.categories || []);
  const [newCategory, setNewCategory] = useState<string>('');

  const title = watch('title');

  // Generate slug from title
  useEffect(() => {
    if (title && !blogPost) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      setValue('slug', slug);
    }
  }, [title, setValue, blogPost]);

  // Update form when editor content changes
  useEffect(() => {
    setValue('content', editorContent);
  }, [editorContent, setValue]);

  // Add a new category
  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setValue('categories', updatedCategories);
      setNewCategory('');
    }
  };

  // Remove a category
  const handleRemoveCategory = (categoryToRemove: string) => {
    const updatedCategories = categories.filter(cat => cat !== categoryToRemove);
    setCategories(updatedCategories);
    setValue('categories', updatedCategories);
  };

  // Handle image URL change
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setValue('image_url', url);
    setImagePreview(url);
  };

  const editorModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <form onSubmit={handleSubmit(onSubmitAction)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Názov článku *
            </label>
            <input
              id="title"
              type="text"
              className={`w-full rounded-md border ${errors.title ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
              {...register('title', { required: 'Názov článku je povinný' })}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
              URL slug *
            </label>
            <input
              id="slug"
              type="text"
              className={`w-full rounded-md border ${errors.slug ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
              {...register('slug', { required: 'URL slug je povinný' })}
            />
            {errors.slug && (
              <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Toto bude použité v URL adrese: /blog/{watch('slug')}
            </p>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              Krátky popis
            </label>
            <textarea
              id="excerpt"
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              {...register('excerpt')}
            ></textarea>
          </div>

          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
              URL obrázku
            </label>
            <input
              id="image_url"
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              onChange={handleImageUrlChange}
              value={watch('image_url') || ''}
            />
            {imagePreview && (
              <div className="mt-2 relative w-full h-48">
                <Image 
                  src={imagePreview} 
                  alt="Náhľad obrázku" 
                  fill
                  className="object-cover rounded-md"
                  onError={() => setImagePreview(null)}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategórie
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                placeholder="Nová kategória"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Pridať
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(category)}
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                {...register('published')}
              />
              <span className="ml-2 text-sm text-gray-700">Publikovať článok</span>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Obsah článku *
          </label>
          <div className={`border ${errors.content ? 'border-red-500' : 'border-gray-300'} rounded-md`}>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={setEditorContent}
              modules={editorModules}
              className="h-64"
            />
          </div>
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
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
          {blogPost ? 'Aktualizovať článok' : 'Vytvoriť článok'}
        </button>
      </div>
    </form>
  );
}
