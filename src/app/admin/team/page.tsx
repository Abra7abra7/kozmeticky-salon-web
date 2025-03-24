import { Metadata } from 'next';
import TeamMemberImage from '@/components/admin/TeamMemberImage';

export const metadata: Metadata = {
  title: 'Správa tímu | Admin Panel',
  description: 'Správa členov tímu kozmetického salónu',
};

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Správa tímu</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Pridať člena tímu
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Team member card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="h-40 bg-indigo-100 flex items-center justify-center">
            <TeamMemberImage 
              name="Martina Kováčová"
              imageSrc="/images/team/placeholder.jpg"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Martina Kováčová</h3>
            <p className="text-sm text-gray-500 mt-1">Kozmetička</p>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700">Špecializácie</h4>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Ošetrenia tváre
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Anti-aging
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Masáže
                </span>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button className="flex-1 text-center py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">
                Upraviť
              </button>
              <button className="flex-1 text-center py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Dostupnosť
              </button>
            </div>
          </div>
        </div>
        
        {/* Team member card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="h-40 bg-indigo-100 flex items-center justify-center">
            <TeamMemberImage 
              name="Katarína Biela"
              imageSrc="/images/team/placeholder.jpg"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Katarína Biela</h3>
            <p className="text-sm text-gray-500 mt-1">Kozmetička</p>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700">Špecializácie</h4>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Hydratačné ošetrenia
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Čistenie pleti
                </span>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button className="flex-1 text-center py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">
                Upraviť
              </button>
              <button className="flex-1 text-center py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Dostupnosť
              </button>
            </div>
          </div>
        </div>
        
        {/* Team member card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="h-40 bg-indigo-100 flex items-center justify-center">
            <TeamMemberImage 
              name="Simona Pekná"
              imageSrc="/images/team/placeholder.jpg"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Simona Pekná</h3>
            <p className="text-sm text-gray-500 mt-1">Permanentný make-up</p>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700">Špecializácie</h4>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Microblading
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Permanentný make-up pier
                </span>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button className="flex-1 text-center py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50">
                Upraviť
              </button>
              <button className="flex-1 text-center py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Dostupnosť
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Prehľad služieb podľa členov tímu</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meno
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pozícia
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Služby
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rezervácie tento mesiac
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcie
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                        MK
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Martina Kováčová
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Kozmetička
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  8 služieb
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  42
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900">Spravovať služby</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                        KB
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Katarína Biela
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Kozmetička
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  5 služieb
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  28
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900">Spravovať služby</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                        SP
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Simona Pekná
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Permanentný make-up
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  3 služby
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900">Spravovať služby</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
