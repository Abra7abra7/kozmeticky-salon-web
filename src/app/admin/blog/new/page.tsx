'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/admin-service';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');

  // Načítanie URL obrázka z localStorage pri načítaní stránky
  useEffect(() => {
    const savedImageUrl = localStorage.getItem('blogImageUrl');
    if (savedImageUrl) {
      setImageUrl(savedImageUrl);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string || title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const image_url = imageUrl || (formData.get('image_url') as string);
    const published = formData.get('published') === 'true';

    if (!title || !content) {
      setError('Vyplňte prosím všetky povinné polia.');
      setIsSubmitting(false);
      return;
    }

    // Add categories to formData
    categories.forEach((category, index) => {
      formData.append(`categories[${index}]`, category);
    });

    // Add slug to formData if not already present
    if (!formData.get('slug')) {
      formData.append('slug', slug);
    }

    // Pridanie URL obrázka do formData
    formData.set('image_url', image_url);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Nastala neočakávaná chyba pri vytváraní článku.');
        setIsSubmitting(false);
        return;
      }

      // Vyčistenie URL obrázka z localStorage po úspešnom vytvorení článku
      localStorage.removeItem('blogImageUrl');

      router.push('/admin/blog');
    } catch (err) {
      console.error('Error creating blog post:', err);
      setError('Nastala neočakávaná chyba pri vytváraní článku.');
      setIsSubmitting(false);
    }
  }

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Pridať nový článok</h1>
        <Link 
          href="/admin/blog" 
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
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Názov článku *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  URL slug
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    placeholder="automaticky-generovany-slug"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Ak necháte prázdne, slug bude automaticky vygenerovaný z názvu.
                </p>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                  Krátky popis
                </label>
                <div className="mt-1">
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    rows={2}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Obsah článku *
                </label>
                <div className="mt-1">
                  <textarea
                    id="content"
                    name="content"
                    rows={10}
                    required
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                  URL obrázka
                </label>
                {imageUrl ? (
                  <div className="mt-2 space-y-2">
                    <div className="relative h-48 w-full overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={imageUrl}
                        alt="Náhľad obrázka článku"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        name="image_url"
                        id="image_url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <Link
                        href="/admin/blog/upload"
                        className="ml-2 px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
                      >
                        Zmeniť obrázok
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="mt-1">
                    <div className="flex">
                      <input
                        type="text"
                        name="image_url"
                        id="image_url"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="https://example.com/image.jpg"
                      />
                      <Link
                        href="/admin/blog/upload"
                        className="ml-2 px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 whitespace-nowrap flex items-center"
                      >
                        Nahrať obrázok
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategórie
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {categories.map((category, index) => (
                    <div key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {category}
                      <button
                        type="button"
                        onClick={() => removeCategory(category)}
                        className="ml-1.5 inline-flex text-indigo-500 hover:text-indigo-600"
                      >
                        <span className="sr-only">Odstrániť</span>
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
                  />
                  <button
                    type="button"
                    onClick={addCategory}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100"
                  >
                    Pridať
                  </button>
                </div>
              </div>

              <div>
                <fieldset>
                  <legend className="text-sm font-medium text-gray-700">Status publikácie</legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="published_true"
                        name="published"
                        type="radio"
                        value="true"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="published_true" className="ml-3 block text-sm font-medium text-gray-700">
                        Publikovať ihneď
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="published_false"
                        name="published"
                        type="radio"
                        value="false"
                        defaultChecked
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="published_false" className="ml-3 block text-sm font-medium text-gray-700">
                        Uložiť ako koncept
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/admin/blog"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-3"
              >
                Zrušiť
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? 'Ukladá sa...' : 'Uložiť článok'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
