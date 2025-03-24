'use server';

import { updateBooking, deleteBooking, createBooking, Booking } from '@/lib/admin-service';
import { revalidatePath } from 'next/cache';

export async function handleCreateBooking(booking: Booking) {
  try {
    const { error } = await createBooking(booking);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/bookings');
    return { success: true };
  } catch (err) {
    console.error('Error creating booking:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri vytváraní rezervácie.' };
  }
}

export async function handleUpdateBooking(id: string, booking: Booking) {
  try {
    const { error } = await updateBooking(id, booking);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/bookings');
    return { success: true };
  } catch (err) {
    console.error('Error updating booking:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri aktualizácii rezervácie.' };
  }
}

export async function handleDeleteBooking(id: string) {
  try {
    const { error } = await deleteBooking(id);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/bookings');
    return { success: true };
  } catch (err) {
    console.error('Error deleting booking:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri mazaní rezervácie.' };
  }
}
