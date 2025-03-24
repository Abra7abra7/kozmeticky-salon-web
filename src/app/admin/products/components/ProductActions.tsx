'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { handleDeleteProduct } from '../actions';

type ProductActionsProps = {
  productId: string;
};

export default function ProductActions({ productId }: ProductActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  
  const handleDelete = async () => {
    if (confirm('Naozaj chcete odstrániť tento produkt?')) {
      setIsDeleting(true);
      try {
        const result = await handleDeleteProduct(productId);
        if (result.error) {
          alert(result.error);
        } else {
          router.refresh();
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Nastala chyba pri odstraňovaní produktu.');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  return (
    <>
      <Link href={`/admin/products/${productId}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-3">
        Upraviť
      </Link>
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-600 hover:text-red-900"
      >
        {isDeleting ? 'Odstraňuje sa...' : 'Odstrániť'}
      </button>
    </>
  );
}
