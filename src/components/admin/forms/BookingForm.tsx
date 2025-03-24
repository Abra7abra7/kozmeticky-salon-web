'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Booking, Service, TeamMember } from '@/lib/admin-service';
import { format, parse } from 'date-fns';

interface BookingFormProps {
  booking?: Booking;
  services: Service[];
  teamMembers: TeamMember[];
  onSubmitAction: (data: Booking) => void;
  onCancelAction: () => void;
}

export default function BookingForm({
  booking,
  services,
  teamMembers,
  onSubmitAction,
  onCancelAction
}: BookingFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Booking>({
    defaultValues: booking || {
      service_id: '',
      team_member_id: '',
      client_name: '',
      client_email: '',
      client_phone: '',
      date_time: '',
      date: '',
      time: '',
      duration: 60,
      notes: '',
      status: 'pending'
    }
  });

  const [filteredTeamMembers, setFilteredTeamMembers] = useState<TeamMember[]>(teamMembers);
  const selectedServiceId = watch('service_id');

  useEffect(() => {
    // If editing an existing booking, split date_time into date and time
    if (booking?.date_time) {
      try {
        const dateTime = new Date(booking.date_time);
        setValue('date', format(dateTime, 'yyyy-MM-dd'));
        setValue('time', format(dateTime, 'HH:mm'));
      } catch (error) {
        console.error('Error parsing date_time:', error);
      }
    }
  }, [booking, setValue]);

  useEffect(() => {
    // Filter team members based on selected service
    if (selectedServiceId) {
      // In a real app, you might filter team members based on their specializations
      // For now, we'll just show all team members
      setFilteredTeamMembers(teamMembers);
    } else {
      setFilteredTeamMembers(teamMembers);
    }
  }, [selectedServiceId, teamMembers]);

  const handleFormSubmit = (data: Booking) => {
    // Combine date and time into date_time
    if (data.date && data.time) {
      try {
        const dateTimeStr = `${data.date}T${data.time}:00`;
        data.date_time = dateTimeStr;
      } catch (error) {
        console.error('Error creating date_time:', error);
      }
    }

    // Add service_name and team_member_name
    const selectedService = services.find(s => s.id === data.service_id);
    const selectedTeamMember = teamMembers.find(tm => tm.id === data.team_member_id);
    
    data.service_name = selectedService?.name;
    data.team_member_name = selectedTeamMember?.name;
    
    // Set duration from the selected service
    if (selectedService) {
      data.duration = selectedService.duration;
    }

    onSubmitAction(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 mb-1">
            Meno klienta *
          </label>
          <input
            id="client_name"
            type="text"
            className={`w-full rounded-md border ${errors.client_name ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
            {...register('client_name', { required: 'Meno klienta je povinné' })}
          />
          {errors.client_name && (
            <p className="mt-1 text-sm text-red-600">{errors.client_name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="client_email" className="block text-sm font-medium text-gray-700 mb-1">
            Email klienta *
          </label>
          <input
            id="client_email"
            type="email"
            className={`w-full rounded-md border ${errors.client_email ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
            {...register('client_email', { 
              required: 'Email klienta je povinný',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Neplatný email'
              }
            })}
          />
          {errors.client_email && (
            <p className="mt-1 text-sm text-red-600">{errors.client_email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="client_phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefón klienta
          </label>
          <input
            id="client_phone"
            type="tel"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            {...register('client_phone')}
          />
        </div>

        <div>
          <label htmlFor="service_id" className="block text-sm font-medium text-gray-700 mb-1">
            Služba *
          </label>
          <select
            id="service_id"
            className={`w-full rounded-md border ${errors.service_id ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
            {...register('service_id', { required: 'Služba je povinná' })}
          >
            <option value="">Vyberte službu</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} ({service.duration} min, {service.price} €)
              </option>
            ))}
          </select>
          {errors.service_id && (
            <p className="mt-1 text-sm text-red-600">{errors.service_id.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="team_member_id" className="block text-sm font-medium text-gray-700 mb-1">
            Zamestnanec *
          </label>
          <select
            id="team_member_id"
            className={`w-full rounded-md border ${errors.team_member_id ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
            {...register('team_member_id', { required: 'Zamestnanec je povinný' })}
          >
            <option value="">Vyberte zamestnanca</option>
            {filteredTeamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} - {member.position}
              </option>
            ))}
          </select>
          {errors.team_member_id && (
            <p className="mt-1 text-sm text-red-600">{errors.team_member_id.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Dátum *
          </label>
          <input
            id="date"
            type="date"
            className={`w-full rounded-md border ${errors.date ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
            {...register('date', { required: 'Dátum je povinný' })}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            Čas *
          </label>
          <input
            id="time"
            type="time"
            className={`w-full rounded-md border ${errors.time ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
            {...register('time', { required: 'Čas je povinný' })}
          />
          {errors.time && (
            <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Stav *
          </label>
          <select
            id="status"
            className={`w-full rounded-md border ${errors.status ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
            {...register('status', { required: 'Stav je povinný' })}
          >
            <option value="pending">Čakajúca</option>
            <option value="confirmed">Potvrdená</option>
            <option value="completed">Dokončená</option>
            <option value="cancelled">Zrušená</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Poznámky
        </label>
        <textarea
          id="notes"
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          {...register('notes')}
        ></textarea>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancelAction}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Zrušiť
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {booking ? 'Aktualizovať rezerváciu' : 'Vytvoriť rezerváciu'}
        </button>
      </div>
    </form>
  );
}
