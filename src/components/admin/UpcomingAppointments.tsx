export default function UpcomingAppointments() {
  // In a real implementation, you would fetch this data from your API
  const appointments = [
    { id: '5', client: 'Lucia Tichá', service: 'Anti-aging ošetrenie', date: '25.3.2025', time: '11:30', staff: 'Martina K.' },
    { id: '6', client: 'Zuzana Malá', service: 'Klasické ošetrenie pleti', date: '25.3.2025', time: '14:00', staff: 'Katarína B.' },
    { id: '7', client: 'Ivana Veľká', service: 'Permanentný make-up pier', date: '26.3.2025', time: '10:00', staff: 'Simona P.' },
    { id: '8', client: 'Daniela Rýchla', service: 'Hydratačné ošetrenie', date: '26.3.2025', time: '13:00', staff: 'Martina K.' },
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Nadchádzajúce termíny
        </h3>
      </div>
      <div className="overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {appointment.client}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="text-sm text-gray-500">
                    {appointment.staff}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {appointment.service}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>
                    {appointment.date} • {appointment.time}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
        <a href="/admin/bookings" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Zobraziť všetky termíny
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  );
}
