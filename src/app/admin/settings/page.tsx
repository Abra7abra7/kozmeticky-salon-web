import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nastavenia | Admin Panel',
  description: 'Nastavenia kozmetického salónu',
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Nastavenia</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Základné informácie</h2>
          <p className="mt-1 text-sm text-gray-500">
            Nastavte základné informácie o vašom kozmetickom salóne.
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="salon-name" className="block text-sm font-medium text-gray-700">
                Názov salónu
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="salon-name"
                  id="salon-name"
                  defaultValue="Kozmetický Salón"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Popis
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue="Váš kozmetický salón s profesionálnym prístupom a modernými procedúrami."
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Stručný popis vášho salónu, ktorý sa zobrazí na hlavnej stránke.
              </p>
            </div>
            
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Logo
              </label>
              <div className="mt-1 flex items-center">
                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button
                  type="button"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Zmeniť
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 text-right">
          <button
            type="button"
            className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Uložiť
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Kontaktné údaje</h2>
          <p className="mt-1 text-sm text-gray-500">
            Nastavte kontaktné údaje pre váš salón.
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue="kontakt@kozmetickysalon.sk"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telefón
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  defaultValue="+421 900 123 456"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Adresa
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  id="address"
                  defaultValue="Hlavná 123, 811 01 Bratislava"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor="google-maps" className="block text-sm font-medium text-gray-700">
                Google Maps URL
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="google-maps"
                  id="google-maps"
                  defaultValue="https://goo.gl/maps/example"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 text-right">
          <button
            type="button"
            className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Uložiť
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Otváracie hodiny</h2>
          <p className="mt-1 text-sm text-gray-500">
            Nastavte otváracie hodiny vášho salónu.
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {['Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota', 'Nedeľa'].map((day, index) => (
              <div key={day} className="flex items-center space-x-4">
                <div className="w-28">
                  <label className="block text-sm font-medium text-gray-700">{day}</label>
                </div>
                <div className="flex-1 flex space-x-2 items-center">
                  <select className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {`${i.toString().padStart(2, '0')}:00`}
                      </option>
                    ))}
                  </select>
                  <span className="text-gray-500">-</span>
                  <select className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {`${i.toString().padStart(2, '0')}:00`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    id={`closed-${index}`}
                    name={`closed-${index}`}
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`closed-${index}`} className="ml-2 block text-sm text-gray-700">
                    Zatvorené
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 text-right">
          <button
            type="button"
            className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Uložiť
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">SEO nastavenia</h2>
          <p className="mt-1 text-sm text-gray-500">
            Optimalizujte vašu stránku pre vyhľadávače.
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="meta-title" className="block text-sm font-medium text-gray-700">
                Meta title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="meta-title"
                  id="meta-title"
                  defaultValue="Kozmetický Salón | Profesionálna starostlivosť o pleť"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor="meta-description" className="block text-sm font-medium text-gray-700">
                Meta description
              </label>
              <div className="mt-1">
                <textarea
                  id="meta-description"
                  name="meta-description"
                  rows={3}
                  defaultValue="Kozmetický salón ponúkajúci profesionálne ošetrenia pleti, permanentný make-up a ďalšie kozmetické služby."
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
                Kľúčové slová
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="keywords"
                  id="keywords"
                  defaultValue="kozmetický salón, ošetrenie pleti, permanentný make-up, kozmetika"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Oddeľte kľúčové slová čiarkami.
              </p>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 text-right">
          <button
            type="button"
            className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Uložiť
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Používateľské účty</h2>
          <p className="mt-1 text-sm text-gray-500">
            Spravujte používateľské účty s prístupom do administrácie.
          </p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meno
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rola
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posledné prihlásenie
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcie
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Admin
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    admin@kozmetickysalon.sk
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                      Administrátor
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    24.3.2025 10:00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Upraviť</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Martina K.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    martina@kozmetickysalon.sk
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Zamestnanec
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    23.3.2025 15:30
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Upraviť</button>
                    <button className="text-red-600 hover:text-red-900">Odstrániť</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Pridať používateľa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
