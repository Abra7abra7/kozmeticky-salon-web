'use server';

import { createBlogPost, updateBlogPost, deleteBlogPost, BlogPost } from '@/lib/admin-service';
import { revalidatePath } from 'next/cache';

export async function handleCreateBlogPost(blogPost: BlogPost) {
  try {
    const { error } = await createBlogPost(blogPost);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/blog');
    return { success: true };
  } catch (err) {
    console.error('Error creating blog post:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri vytváraní článku.' };
  }
}

export async function handleUpdateBlogPost(id: string, blogPost: BlogPost) {
  try {
    const { error } = await updateBlogPost(id, blogPost);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/blog');
    return { success: true };
  } catch (err) {
    console.error('Error updating blog post:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri aktualizácii článku.' };
  }
}

export async function handleDeleteBlogPost(id: string) {
  try {
    const { error } = await deleteBlogPost(id);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/blog');
    return { success: true };
  } catch (err) {
    console.error('Error deleting blog post:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri mazaní článku.' };
  }
}
