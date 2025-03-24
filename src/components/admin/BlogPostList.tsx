'use client';

import { useState } from 'react';
import { BlogPost } from '@/lib/admin-service';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import BlogPostForm from './forms/BlogPostForm';
import Image from 'next/image';

interface BlogPostListProps {
  blogPosts: BlogPost[];
  onCreateAction: (blogPost: BlogPost) => Promise<{ success: boolean; error?: string }>;
  onUpdateAction: (id: string, blogPost: BlogPost) => Promise<{ success: boolean; error?: string }>;
  onDeleteAction: (id: string) => Promise<{ success: boolean; error?: string }>;
}

export default function BlogPostList({
  blogPosts,
  onCreateAction,
  onUpdateAction,
  onDeleteAction
}: BlogPostListProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentBlogPost, setCurrentBlogPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [publishedFilter, setPublishedFilter] = useState('');

  // Get unique categories from blog posts
  const allCategories = Array.from(
    new Set(blogPosts.flatMap(post => post.categories || []))
  );

  // Handle create blog post
  const handleCreateBlogPost = async (blogPost: BlogPost) => {
    try {
      await onCreateAction(blogPost);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  // Handle update blog post
  const handleUpdateBlogPost = async (blogPost: BlogPost) => {
    if (!currentBlogPost?.id) return;
    
    try {
      await onUpdateAction(currentBlogPost.id, blogPost);
      setIsEditModalOpen(false);
      setCurrentBlogPost(null);
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  // Handle delete blog post
  const handleDeleteBlogPost = async () => {
    if (!currentBlogPost?.id) return;
    
    try {
      await onDeleteAction(currentBlogPost.id);
      setIsDeleteModalOpen(false);
      setCurrentBlogPost(null);
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  // Filter blog posts based on search term, category, and published status
  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || 
      (post.categories && post.categories.includes(categoryFilter));
    
    const matchesPublished = publishedFilter === '' || 
      (publishedFilter === 'published' && post.published) ||
      (publishedFilter === 'draft' && !post.published);
    
    return matchesSearch && matchesCategory && matchesPublished;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Správa článkov</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Pridať článok
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Vyhľadať článok..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Všetky kategórie</option>
                {allCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={publishedFilter}
                onChange={(e) => setPublishedFilter(e.target.value)}
              >
                <option value="">Všetky stavy</option>
                <option value="published">Publikované</option>
                <option value="draft">Koncepty</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Názov
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategórie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dátum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stav
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcie
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBlogPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    Neboli nájdené žiadne články
                  </td>
                </tr>
              ) : (
                filteredBlogPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {post.image_url && (
                          <div className="flex-shrink-0 h-10 w-10 mr-4">
                            <div className="relative h-10 w-10">
                              <Image
                                src={post.image_url}
                                alt={post.title}
                                fill
                                className="object-cover rounded"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/placeholder-image.jpg';
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          <div className="text-sm text-gray-500">{post.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {post.categories?.map((category, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.published_at && format(new Date(post.published_at), 'PPP', { locale: sk })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.published ? 'Publikované' : 'Koncept'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setCurrentBlogPost(post);
                            setIsDetailsModalOpen(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Zobraziť detail"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentBlogPost(post);
                            setIsEditModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Upraviť"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentBlogPost(post);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-red-600 hover:text-red-900"
                          title="Vymazať"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Blog Post Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Pridať nový článok</h2>
              
              <BlogPostForm
                onSubmitAction={handleCreateBlogPost}
                onCancelAction={() => setIsAddModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Blog Post Modal */}
      {isEditModalOpen && currentBlogPost && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Upraviť článok</h2>
              
              <BlogPostForm
                blogPost={currentBlogPost}
                onSubmitAction={handleUpdateBlogPost}
                onCancelAction={() => {
                  setIsEditModalOpen(false);
                  setCurrentBlogPost(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentBlogPost && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Potvrdiť vymazanie</h2>
              <p className="mb-4">
                Naozaj chcete vymazať článok <strong>{currentBlogPost.title}</strong>? Táto akcia sa nedá vrátiť späť.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Zrušiť
                </button>
                <button
                  onClick={handleDeleteBlogPost}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Vymazať
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {isDetailsModalOpen && currentBlogPost && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{currentBlogPost.title}</h2>
              
              <div className="space-y-4">
                {currentBlogPost.image_url && (
                  <div className="relative w-full h-64">
                    <Image
                      src={currentBlogPost.image_url}
                      alt={currentBlogPost.title}
                      fill
                      className="object-cover rounded-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentBlogPost.categories?.map((category, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                
                <div className="text-sm text-gray-500">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      currentBlogPost.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {currentBlogPost.published ? 'Publikované' : 'Koncept'}
                  </span>
                  {currentBlogPost.published_at && (
                    <span className="ml-2">
                      {format(new Date(currentBlogPost.published_at), 'PPP', { locale: sk })}
                    </span>
                  )}
                </div>
                
                {currentBlogPost.excerpt && (
                  <div className="italic text-gray-600 border-l-4 border-gray-200 pl-4 py-2">
                    {currentBlogPost.excerpt}
                  </div>
                )}
                
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: currentBlogPost.content || '' }} />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Zavrieť
                </button>
                <button
                  onClick={() => {
                    setIsDetailsModalOpen(false);
                    setIsEditModalOpen(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Upraviť
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
