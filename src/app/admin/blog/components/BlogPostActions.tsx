'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type BlogPostActionsProps = {
  postId: string;
};

export default function BlogPostActions({ postId }: BlogPostActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  
  const handleDelete = async () => {
    if (confirm('Naozaj chcete odstrániť tento článok?')) {
      setIsDeleting(true);
      try {
        // Use a form to submit the delete action
        const form = document.createElement('form');
        form.method = 'post';
        form.action = `/admin/blog/delete?id=${postId}`;
        document.body.appendChild(form);
        form.submit();
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert('Nastala chyba pri odstraňovaní článku.');
        setIsDeleting(false);
      }
    }
  };
  
  return (
    <>
      <Link href={`/admin/blog/${postId}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-3">
        Upraviť
      </Link>
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-600 hover:text-red-900"
      >
        {isDeleting ? 'Odstraňuje sa...' : 'Zmazať'}
      </button>
    </>
  );
}
