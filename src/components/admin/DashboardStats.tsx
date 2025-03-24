export default function DashboardStats() {
  // In a real implementation, you would fetch this data from your API
  const stats = [
    { name: 'Rezervácie dnes', value: '12' },
    { name: 'Celkové rezervácie', value: '2,543' },
    { name: 'Príjem tento mesiac', value: '€3,250' },
    { name: 'Aktívni klienti', value: '521' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              {stat.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stat.value}
            </dd>
          </div>
        </div>
      ))}
    </div>
  );
}
