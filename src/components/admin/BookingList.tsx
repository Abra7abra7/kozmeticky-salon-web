'use client';

import { useState } from 'react';
import { Booking, Service, TeamMember } from '@/lib/admin-service';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale';
import BookingForm from './forms/BookingForm';

interface BookingListProps {
  bookings: Booking[];
  services: Service[];
  teamMembers: TeamMember[];
  onCreateAction: (booking: Booking) => Promise<{ success: boolean; error?: string }>;
  onUpdateAction: (id: string, booking: Booking) => Promise<{ success: boolean; error?: string }>;
  onDeleteAction: (id: string) => Promise<{ success: boolean; error?: string }>;
}

export default function BookingList(props: BookingListProps) {
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { bookings, services, teamMembers, onCreateAction, onUpdateAction, onDeleteAction } = props;

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === '' || booking.status === statusFilter;
    const matchesDate = dateFilter === '' || 
      (booking.date && booking.date.startsWith(dateFilter));
    const matchesSearch = searchTerm === '' || 
      (booking.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       booking.client_email?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesDate && matchesSearch;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const booking = bookings.find(b => b.id === id);
      if (!booking) {
        setError('Rezervácia nebola nájdená');
        return;
      }
      
      const result = await onUpdateAction(id, { ...booking, status: newStatus as 'pending' | 'confirmed' | 'cancelled' | 'completed' });
      
      if (!result.success) {
        setError(result.error || 'Nastala chyba pri aktualizácii stavu rezervácie.');
      }
    } catch (err) {
      setError('Nastala neočakávaná chyba.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentBooking?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await onDeleteAction(currentBooking.id);
      
      if (result.success) {
        setIsDeleteModalOpen(false);
        setCurrentBooking(null);
      } else {
        setError(result.error || 'Nastala chyba pri mazaní rezervácie.');
      }
    } catch (err) {
      setError('Nastala neočakávaná chyba.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBooking = async (booking: Booking) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await onCreateAction(booking);
      
      if (result.success) {
        setIsAddModalOpen(false);
      } else {
        setError(result.error || 'Nastala chyba pri vytváraní rezervácie.');
      }
    } catch (err) {
      setError('Nastala neočakávaná chyba.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBooking = async (booking: Booking) => {
    if (!booking.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await onUpdateAction(booking.id, booking);
      
      if (result.success) {
        setIsEditModalOpen(false);
        setCurrentBooking(null);
      } else {
        setError(result.error || 'Nastala chyba pri aktualizácii rezervácie.');
      }
    } catch (err) {
      setError('Nastala neočakávaná chyba.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP', { locale: sk });
    } catch (error) {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':');
      return `${hours}:${minutes}`;
    } catch (error) {
      return timeString;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Čakajúca';
      case 'confirmed':
        return 'Potvrdená';
      case 'completed':
        return 'Dokončená';
      case 'cancelled':
        return 'Zrušená';
      default:
        return status;
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Správa rezervácií</h1>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Nová rezervácia
          </button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Stav rezervácie</label>
              <select 
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Všetky stavy</option>
                <option value="pending">Čakajúce</option>
                <option value="confirmed">Potvrdené</option>
                <option value="completed">Dokončené</option>
                <option value="cancelled">Zrušené</option>
              </select>
            </div>
            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Dátum</label>
              <input
                type="date"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vyhľadávanie</label>
              <input
                type="text"
                placeholder="Meno alebo email klienta..."
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {error && (
            <div className="mb-4 bg-red-50 p-4 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
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
                    Stav
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcie
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Nenašli sa žiadne rezervácie
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.client_name}</div>
                        <div className="text-sm text-gray-500">{booking.client_email}</div>
                        <div className="text-sm text-gray-500">{booking.client_phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.service_name}</div>
                        <div className="text-sm text-gray-500">{booking.team_member_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.date && formatDate(booking.date)}</div>
                        <div className="text-sm text-gray-500">{booking.time && formatTime(booking.time)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => {
                              setCurrentBooking(booking);
                              setIsDetailsModalOpen(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Detail
                          </button>
                          <button 
                            onClick={() => {
                              setCurrentBooking(booking);
                              setIsEditModalOpen(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Upraviť
                          </button>
                          <button 
                            onClick={() => {
                              setCurrentBooking(booking);
                              setIsDeleteModalOpen(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Zmazať
                          </button>
                        </div>
                        <div className="mt-2">
                          <select 
                            className="text-sm border border-gray-300 rounded px-2 py-1 w-full"
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                            disabled={loading}
                          >
                            <option value="pending">Čakajúca</option>
                            <option value="confirmed">Potvrdená</option>
                            <option value="completed">Dokončená</option>
                            <option value="cancelled">Zrušená</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Booking Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Nová rezervácia</h2>
              
              <BookingForm
                services={services}
                teamMembers={teamMembers}
                onSubmitAction={handleCreateBooking}
                onCancelAction={() => setIsAddModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Booking Modal */}
      {isEditModalOpen && currentBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Upraviť rezerváciu</h2>
            
            <BookingForm
              booking={currentBooking}
              services={services}
              teamMembers={teamMembers}
              onSubmitAction={handleUpdateBooking}
              onCancelAction={() => {
                setIsEditModalOpen(false);
                setCurrentBooking(null);
              }}
            />
          </div>
        </div>
      </div>
      )}

      {/* Details Modal */}
      {isDetailsModalOpen && currentBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Detail rezervácie</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Klient</h3>
                  <p className="mt-1">{currentBooking.client_name}</p>
                  <p className="text-gray-600">{currentBooking.client_email}</p>
                  <p className="text-gray-600">{currentBooking.client_phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Služba</h3>
                  <p className="mt-1">{currentBooking.service_name}</p>
                  <p className="text-gray-600">Poskytovateľ: {currentBooking.team_member_name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Dátum a čas</h3>
                  <p className="mt-1">{currentBooking.date && formatDate(currentBooking.date)}</p>
                  <p className="text-gray-600">{currentBooking.time && formatTime(currentBooking.time)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Stav</h3>
                  <p className="mt-1">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(currentBooking.status)}`}>
                      {getStatusText(currentBooking.status)}
                    </span>
                  </p>
                </div>
              </div>
              
              {currentBooking.notes && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Poznámky</h3>
                  <p className="mt-1 text-gray-800">{currentBooking.notes}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setIsDetailsModalOpen(false);
                    setCurrentBooking(null);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Zavrieť
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Potvrdiť zmazanie</h2>
              <p className="mb-4">
                Naozaj chcete zmazať rezerváciu pre klienta <strong>{currentBooking.client_name}</strong> na deň <strong>{currentBooking.date && formatDate(currentBooking.date)}</strong>? Táto akcia je nenávratná.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setCurrentBooking(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={loading}
                >
                  Zrušiť
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  disabled={loading}
                >
                  {loading ? 'Mazanie...' : 'Zmazať'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
