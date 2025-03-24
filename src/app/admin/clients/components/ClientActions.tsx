'use client';

import { useState } from 'react';
import Link from 'next/link';
import { handleDeleteClient } from '../actions';

type ClientActionsProps = {
  clientId: string;
};

export default function ClientActions({ clientId }: ClientActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleDelete = async () => {
    if (confirm('Naozaj chcete vymazať tohto klienta?')) {
      setIsDeleting(true);
      try {
        const result = await handleDeleteClient(clientId);
        if (result.error) {
          alert(result.error);
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Nastala chyba pri mazaní klienta.');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  return (
    <>
      <Link href={`/admin/clients/${clientId}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
        Detail
      </Link>
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-600 hover:text-red-900"
      >
        {isDeleting ? 'Mazanie...' : 'Vymazať'}
      </button>
    </>
  );
}
