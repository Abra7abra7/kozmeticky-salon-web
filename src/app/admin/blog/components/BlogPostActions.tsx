'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { handleDeleteBlogPost } from '../actions';

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
        const result = await handleDeleteBlogPost(postId);
        if (result.error) {
          alert(result.error);
        } else {
          router.refresh();
        }
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert('Nastala chyba pri odstraňovaní článku.');
      } finally {
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
