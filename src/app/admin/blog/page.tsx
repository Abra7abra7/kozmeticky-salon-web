import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/admin-service';
import { handleCreateBlogPost, handleUpdateBlogPost, handleDeleteBlogPost } from './actions';
import { seedBlogPosts } from './seed';
import { checkBlogPostsSchema } from './check-schema';

export const metadata: Metadata = {
  title: 'Správa blogu | Admin Panel',
  description: 'Správa blogových článkov kozmetického salónu',
};

export default async function BlogPage() {
  const { data: blogPosts, error } = await getBlogPosts();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Správa blogu</h1>
        <div className="flex gap-2">
          <form action={checkBlogPostsSchema}>
            <button 
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Skontrolovať schému
            </button>
          </form>
          <form action={seedBlogPosts}>
            <button 
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Pridať testovacie články
            </button>
          </form>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Nový článok
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">Chyba pri načítaní blogových článkov: {error.message}</p>
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategória</label>
            <select className="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="">Všetky kategórie</option>
              <option value="Starostlivosť o pleť">Starostlivosť o pleť</option>
              <option value="Make-up">Make-up</option>
              <option value="Trendy">Trendy</option>
              <option value="Tipy a triky">Tipy a triky</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Vyhľadávanie</label>
            <input
              type="text"
              placeholder="Hľadať článok..."
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Názov
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategórie
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dátum publikácie
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcie
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogPosts && blogPosts.length > 0 ? (
                blogPosts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.categories && post.categories.map((category: string, index: number) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-1">
                          {category}
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString('sk-SK') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.published ? 'Publikované' : 'Koncept'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">Upraviť</button>
                      <button className="text-red-600 hover:text-red-900">Zmazať</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    {error ? 'Chyba pri načítaní článkov' : 'Žiadne články neboli nájdené'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
