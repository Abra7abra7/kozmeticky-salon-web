export default function RecentBookings() {
  // In a real implementation, you would fetch this data from your API
  const bookings = [
    { id: '1', client: 'Anna Nováková', service: 'Klasické ošetrenie pleti', date: '24.3.2025', time: '10:00', status: 'confirmed' },
    { id: '2', client: 'Mária Kováčová', service: 'Permanentný make-up obočia', date: '24.3.2025', time: '13:30', status: 'confirmed' },
    { id: '3', client: 'Jana Veselá', service: 'Masáž tváre a dekoltu', date: '24.3.2025', time: '15:00', status: 'confirmed' },
    { id: '4', client: 'Petra Horváthová', service: 'Hydratačné ošetrenie', date: '25.3.2025', time: '9:00', status: 'confirmed' },
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Nedávne rezervácie
        </h3>
      </div>
      <div className="overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <li key={booking.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {booking.client}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status === 'confirmed' ? 'Potvrdená' : 
                     booking.status === 'cancelled' ? 'Zrušená' : 'Čaká sa'}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {booking.service}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    {booking.date} • {booking.time}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
        <a href="/admin/bookings" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Zobraziť všetky rezervácie
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  );
}
