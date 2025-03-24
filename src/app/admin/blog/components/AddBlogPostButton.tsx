'use client';

import { useRouter } from 'next/navigation';

export default function AddBlogPostButton() {
  const router = useRouter();
  
  return (
    <button 
      onClick={() => router.push('/admin/blog/new')}
      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
    >
      Nový článok
    </button>
  );
}
