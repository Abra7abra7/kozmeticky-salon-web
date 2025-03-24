'use server';

import { createProduct, updateProduct, deleteProduct, Product } from '@/lib/admin-service';
import { revalidatePath } from 'next/cache';

export async function handleCreateProduct(product: Product) {
  try {
    const { error } = await createProduct(product);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/products');
    return { success: true };
  } catch (err) {
    console.error('Error creating product:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri vytváraní produktu.' };
  }
}

export async function handleUpdateProduct(id: string, product: Product) {
  try {
    const { error } = await updateProduct(id, product);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/products');
    return { success: true };
  } catch (err) {
    console.error('Error updating product:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri aktualizácii produktu.' };
  }
}

export async function handleDeleteProduct(id: string) {
  try {
    const { error } = await deleteProduct(id);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    revalidatePath('/admin/products');
    return { success: true };
  } catch (err) {
    console.error('Error deleting product:', err);
    return { success: false, error: 'Nastala neočakávaná chyba pri mazaní produktu.' };
  }
}
