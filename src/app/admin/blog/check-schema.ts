'use server';

import { createServerClient } from '@/lib/supabase/server';

export async function checkBlogPostsSchema(formData: FormData): Promise<void> {
  try {
    const supabase = createServerClient();
    
    // Získanie informácií o tabuľke blog_posts
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Chyba pri získavaní dát z tabuľky blog_posts:', error);
      return;
    }

    // Vypísanie štruktúry tabuľky
    if (data && data.length > 0) {
      console.log('Štruktúra tabuľky blog_posts:');
      console.log(Object.keys(data[0]));
    } else {
      console.log('Tabuľka blog_posts je prázdna, nemôžeme zistiť štruktúru.');
      
      // Alternatívne získanie informácií o stĺpcoch
      const { data: columnsData, error: columnsError } = await supabase
        .rpc('get_table_columns', { table_name: 'blog_posts' });
      
      if (columnsError) {
        console.error('Chyba pri získavaní informácií o stĺpcoch:', columnsError);
      } else {
        console.log('Stĺpce tabuľky blog_posts:', columnsData);
      }
    }
  } catch (err) {
    console.error('Neočakávaná chyba pri kontrole schémy:', err);
  }
}
