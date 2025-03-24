import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email Marketing | Admin Panel',
  description: 'Správa emailových kampaní kozmetického salónu',
};

export default function EmailsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Email Marketing</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Nová kampaň
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Šablóny emailov</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Uvítací email</span>
              <button className="text-indigo-600 text-sm">Upraviť</button>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Potvrdenie rezervácie</span>
              <button className="text-indigo-600 text-sm">Upraviť</button>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Pripomenutie termínu</span>
              <button className="text-indigo-600 text-sm">Upraviť</button>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Mesačné novinky</span>
              <button className="text-indigo-600 text-sm">Upraviť</button>
            </li>
            <li className="py-3 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Špeciálne ponuky</span>
              <button className="text-indigo-600 text-sm">Upraviť</button>
            </li>
          </ul>
          <div className="mt-4">
            <button className="text-indigo-600 text-sm font-medium">+ Pridať šablónu</button>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Segmenty klientov</h2>
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between items-center">
              <div>
                <span className="text-sm font-medium text-gray-900 block">Všetci klienti</span>
                <span className="text-xs text-gray-500">521 kontaktov</span>
              </div>
              <button className="text-indigo-600 text-sm">Použiť</button>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div>
                <span className="text-sm font-medium text-gray-900 block">VIP klienti</span>
                <span className="text-xs text-gray-500">78 kontaktov</span>
              </div>
              <button className="text-indigo-600 text-sm">Použiť</button>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div>
                <span className="text-sm font-medium text-gray-900 block">Noví klienti</span>
                <span className="text-xs text-gray-500">124 kontaktov</span>
              </div>
              <button className="text-indigo-600 text-sm">Použiť</button>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div>
                <span className="text-sm font-medium text-gray-900 block">Neaktívni klienti</span>
                <span className="text-xs text-gray-500">95 kontaktov</span>
              </div>
              <button className="text-indigo-600 text-sm">Použiť</button>
            </li>
          </ul>
          <div className="mt-4">
            <button className="text-indigo-600 text-sm font-medium">+ Vytvoriť segment</button>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Štatistiky</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Miera otvorenia</span>
                <span className="text-sm font-medium text-gray-900">32.4%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '32.4%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Miera preklikov</span>
                <span className="text-sm font-medium text-gray-900">12.7%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '12.7%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Miera odhlásení</span>
                <span className="text-sm font-medium text-gray-900">0.8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '0.8%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Nedávne kampane</h2>
          <button className="text-indigo-600 text-sm font-medium">Zobraziť všetky</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Názov kampane
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Segment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Odoslané
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Otvorené
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prekliky
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Jarné špeciálne ponuky
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Všetci klienti
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15.3.2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  38.2%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  14.5%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Dokončené
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Nové služby - Permanentný make-up
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  VIP klienti
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1.3.2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  42.7%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  18.3%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Dokončené
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Veľkonočné zľavy
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Všetci klienti
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  -
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  -
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  -
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Naplánované (1.4.2025)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
