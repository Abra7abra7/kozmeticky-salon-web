import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Správa rezervácií | Admin Panel',
  description: 'Správa rezervácií kozmetického salónu',
};

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Správa rezervácií</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Nová rezervácia
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Dátum od</label>
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Dátum do</label>
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full rounded-md border border-gray-300 px-3 py-2">
              <option value="">Všetky</option>
              <option value="confirmed">Potvrdené</option>
              <option value="cancelled">Zrušené</option>
              <option value="completed">Dokončené</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Klient
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Služba
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dátum a čas
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zamestnanec
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
              {/* Placeholder for booking data */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Anna Nováková
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Klasické ošetrenie pleti
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  24.3.2025 10:00
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Martina K.
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Potvrdená
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Upraviť</button>
                  <button className="text-red-600 hover:text-red-900">Zrušiť</button>
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
