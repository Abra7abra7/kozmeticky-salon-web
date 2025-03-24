'use client';

import { useRouter } from 'next/navigation';

export default function AddProductButton() {
  const router = useRouter();
  
  return (
    <button 
      onClick={() => router.push('/admin/products/upload')}
      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
    >
      Pridať produkt
    </button>
  );
}
