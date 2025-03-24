'use server';

import { createTeamMember, updateTeamMember, deleteTeamMember, TeamMember } from '@/lib/admin-service';
import { revalidatePath } from 'next/cache';

export async function handleCreateTeamMember(teamMember: TeamMember) {
  try {
    const { error } = await createTeamMember(teamMember);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/team');
    return { success: true };
  } catch (err) {
    console.error('Error creating team member:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri vytváraní člena tímu.' };
  }
}

export async function handleUpdateTeamMember(id: string, teamMember: TeamMember) {
  try {
    const { error } = await updateTeamMember(id, teamMember);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/team');
    return { success: true };
  } catch (err) {
    console.error('Error updating team member:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri aktualizácii člena tímu.' };
  }
}

export async function handleDeleteTeamMember(id: string) {
  try {
    const { error } = await deleteTeamMember(id);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/team');
    return { success: true };
  } catch (err) {
    console.error('Error deleting team member:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri mazaní člena tímu.' };
  }
}
