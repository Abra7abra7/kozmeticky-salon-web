import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Správa služieb | Admin Panel',
  description: 'Správa služieb kozmetického salónu',
};

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Správa služieb</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Pridať službu
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategória</label>
            <select className="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="">Všetky kategórie</option>
              <option value="Ošetrenia tváre">Ošetrenia tváre</option>
              <option value="Permanentný make-up">Permanentný make-up</option>
              <option value="Masáže">Masáže</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Vyhľadávanie</label>
            <input
              type="text"
              placeholder="Hľadať službu..."
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
                  Kategória
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trvanie
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cena
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Popularita
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcie
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Placeholder for service data */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Klasické ošetrenie pleti
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Ošetrenia tváre
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  60 min
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  45 €
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Upraviť</button>
                  <button className="text-red-600 hover:text-red-900">Zmazať</button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
