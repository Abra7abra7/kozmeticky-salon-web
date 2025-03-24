'use server';

import { createClient, updateClient, deleteClient, Client } from '@/lib/admin-service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function handleCreateClient(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const status = formData.get('status') as 'active' | 'inactive' | 'new' | 'vip';
  const notes = formData.get('notes') as string;

  const client: Client = {
    name,
    email,
    phone,
    status,
    notes
  };

  const { error } = await createClient(client);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/clients');
  redirect('/admin/clients');
}

export async function handleUpdateClient(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const status = formData.get('status') as 'active' | 'inactive' | 'new' | 'vip';
  const notes = formData.get('notes') as string;
  const visit_count = parseInt(formData.get('visit_count') as string) || 0;
  const total_spent = parseFloat(formData.get('total_spent') as string) || 0;

  const client: Partial<Client> = {
    name,
    email,
    phone,
    status,
    notes,
    visit_count,
    total_spent
  };

  const { error } = await updateClient(id, client);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/clients');
  redirect('/admin/clients');
}

export async function handleDeleteClient(id: string) {
  const { error } = await deleteClient(id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/clients');
  return { success: true };
}
