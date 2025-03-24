import { Metadata } from 'next';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentBookings from '@/components/admin/RecentBookings';
import UpcomingAppointments from '@/components/admin/UpcomingAppointments';
import RevenueChart from '@/components/admin/RevenueChart';

export const metadata: Metadata = {
  title: 'Dashboard | Admin Panel',
  description: 'Prehľad aktivít a štatistík kozmetického salónu',
};

export default async function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentBookings />
        <UpcomingAppointments />
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Príjmy</h2>
        <RevenueChart />
      </div>
    </div>
  );
}
