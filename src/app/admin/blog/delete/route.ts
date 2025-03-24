import { NextRequest, NextResponse } from 'next/server';
import { deleteBlogPost } from '@/lib/admin-service';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.redirect(new URL('/admin/blog?error=missing-id', request.url));
  }
  
  try {
    const { error } = await deleteBlogPost(id);
    
    if (error) {
      return NextResponse.redirect(new URL(`/admin/blog?error=${error.message}`, request.url));
    }
    
    revalidatePath('/admin/blog');
    return NextResponse.redirect(new URL('/admin/blog?success=deleted', request.url));
  } catch (err) {
    console.error('Error deleting blog post:', err);
    return NextResponse.redirect(new URL('/admin/blog?error=unexpected', request.url));
  }
}
