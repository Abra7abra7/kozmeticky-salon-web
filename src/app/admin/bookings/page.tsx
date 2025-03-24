import { Metadata } from 'next';
import { getBookings, getServices, getTeamMembers } from '@/lib/admin-service';
import BookingList from '@/components/admin/BookingList';
import { handleCreateBooking, handleUpdateBooking, handleDeleteBooking } from './actions';

export const metadata: Metadata = {
  title: 'Správa rezervácií | Admin Panel',
  description: 'Správa rezervácií kozmetického salónu',
};

export default async function BookingsPage() {
  const { data: bookings, error: bookingsError } = await getBookings();
  const { data: services, error: servicesError } = await getServices();
  const { data: teamMembers, error: teamMembersError } = await getTeamMembers();
  
  const error = bookingsError || servicesError || teamMembersError;
  
  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">Chyba pri načítaní dát: {error.message}</p>
        </div>
      )}
      
      <BookingList 
        bookings={bookings || []} 
        services={services || []}
        teamMembers={teamMembers || []}
        onCreateAction={handleCreateBooking}
        onUpdateAction={handleUpdateBooking} 
        onDeleteAction={handleDeleteBooking}
      />
    </div>
  );
}
