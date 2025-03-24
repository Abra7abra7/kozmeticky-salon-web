import { NextRequest, NextResponse } from 'next/server';
import { createBlogPost, BlogPost } from '@/lib/admin-service';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const image_url = formData.get('image_url') as string;
    const published = formData.get('published') === 'true';
    
    // Extract categories from formData
    const categories: string[] = [];
    // Use Array.from to avoid TypeScript iterator issues
    const entries = Array.from(formData.entries());
    for (const [key, value] of entries) {
      if (key.startsWith('categories[')) {
        categories.push(value as string);
      }
    }
    
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Vyplňte prosím všetky povinné polia.' },
        { status: 400 }
      );
    }
    
    const blogPost: BlogPost = {
      title,
      slug,
      excerpt: excerpt || undefined,
      content,
      image_url: image_url || undefined,
      categories,
      published,
      published_at: published ? new Date().toISOString() : undefined
    };
    
    const { error } = await createBlogPost(blogPost);
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    revalidatePath('/admin/blog');
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error creating blog post:', err);
    return NextResponse.json(
      { error: 'Nastala neočakávaná chyba pri vytváraní článku.' },
      { status: 500 }
    );
  }
}
