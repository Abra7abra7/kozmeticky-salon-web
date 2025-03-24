'use server';

import { createService, updateService, deleteService, Service } from '@/lib/admin-service';
import { revalidatePath } from 'next/cache';

export async function handleCreateService(service: Service) {
  try {
    const { error } = await createService(service);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/services');
    return { success: true };
  } catch (err) {
    console.error('Error creating service:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri vytváraní služby.' };
  }
}

export async function handleUpdateService(id: string, service: Service) {
  try {
    const { error } = await updateService(id, service);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/services');
    return { success: true };
  } catch (err) {
    console.error('Error updating service:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri aktualizácii služby.' };
  }
}

export async function handleDeleteService(id: string) {
  try {
    const { error } = await deleteService(id);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/services');
    return { success: true };
  } catch (err) {
    console.error('Error deleting service:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri mazaní služby.' };
  }
}
