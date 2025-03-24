'use server';

import { createServerClient } from './supabase/server';
import { revalidatePath } from 'next/cache';

// Types
export type Service = {
  id?: string;
  name: string;
  category: string;
  description?: string;
  duration: number;
  price: number;
  discounted_price?: number;
  image_url?: string;
  details?: any;
  popularity?: number;
};

export type TeamMember = {
  id?: string;
  name: string;
  position: string;
  specializations?: string[];
  bio?: string;
  image_url?: string;
  certifications?: string[];
  availability?: any;
};

export type Booking = {
  id: string;
  service_id: string;
  service_name?: string;
  team_member_id: string;
  team_member_name?: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  date_time: string;
  date?: string;
  time?: string;
  duration: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
};

export type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image_url?: string;
  categories?: string[];
  published: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
};

export type Product = {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category?: string;
  in_stock: boolean;
  featured: boolean;
};

export type GiftVoucher = {
  id?: string;
  code: string;
  value: number;
  valid_from: string;
  valid_until: string;
  status: 'unused' | 'used';
  recipient_name: string;
  recipient_email?: string;
  purchaser_name?: string;
  purchaser_email?: string;
  used_at?: string;
};

export type Client = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  registration_date?: string;
  visit_count?: number;
  total_spent?: number;
  status: 'active' | 'inactive' | 'new' | 'vip';
  notes?: string;
};

// Services CRUD
export async function getServices() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('services').select('*');
  return { data, error };
}

export async function getServiceById(id: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('services').select('*').eq('id', id).single();
  return { data, error };
}

export async function createService(service: Service) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('services').insert(service).select();
  
  if (!error) {
    revalidatePath('/admin/services');
  }
  
  return { data, error };
}

export async function updateService(id: string, service: Partial<Service>) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('services').update(service).eq('id', id).select();
  
  if (!error) {
    revalidatePath('/admin/services');
  }
  
  return { data, error };
}

export async function deleteService(id: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from('services').delete().eq('id', id);
  
  if (!error) {
    revalidatePath('/admin/services');
  }
  
  return { error };
}

// Team Members CRUD
export async function getTeamMembers() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('team_members').select('*');
  return { data, error };
}

export async function getTeamMemberById(id: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('team_members').select('*').eq('id', id).single();
  return { data, error };
}

export async function createTeamMember(teamMember: TeamMember) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('team_members').insert(teamMember).select();
  
  if (!error) {
    revalidatePath('/admin/team');
  }
  
  return { data, error };
}

export async function updateTeamMember(id: string, teamMember: Partial<TeamMember>) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('team_members').update(teamMember).eq('id', id).select();
  
  if (!error) {
    revalidatePath('/admin/team');
  }
  
  return { data, error };
}

export async function deleteTeamMember(id: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from('team_members').delete().eq('id', id);
  
  if (!error) {
    revalidatePath('/admin/team');
  }
  
  return { error };
}

// Bookings CRUD
export async function getBookings() {
  const supabase = createServerClient();
  
  // First get all bookings
  const { data: bookings, error: bookingsError } = await supabase
    .from('bookings')
    .select('*');
  
  if (bookingsError) {
    return { data: null, error: bookingsError };
  }
  
  // Get all services for service names
  const { data: services, error: servicesError } = await supabase
    .from('services')
    .select('id, name');
  
  if (servicesError) {
    return { data: bookings, error: null }; // Continue without service names
  }
  
  // Get all team members for team member names
  const { data: teamMembers, error: teamMembersError } = await supabase
    .from('team_members')
    .select('id, name');
  
  if (teamMembersError) {
    return { data: bookings, error: null }; // Continue without team member names
  }
  
  // Map service and team member names to bookings
  const enhancedBookings = bookings.map(booking => {
    // Find matching service
    const service = services.find(s => s.id === booking.service_id);
    // Find matching team member
    const teamMember = teamMembers.find(tm => tm.id === booking.team_member_id);
    
    // Extract date and time from date_time
    let date = '';
    let time = '';
    
    if (booking.date_time) {
      const dateTime = new Date(booking.date_time);
      date = dateTime.toISOString().split('T')[0];
      time = dateTime.toTimeString().substring(0, 5);
    }
    
    return {
      ...booking,
      service_name: service ? service.name : 'Neznáma služba',
      team_member_name: teamMember ? teamMember.name : 'Neznámy zamestnanec',
      date,
      time
    };
  });
  
  return { data: enhancedBookings, error: null };
}

export async function createBooking(booking: Booking) {
  const supabase = createServerClient();
  
  // Remove fields that are not in the database schema
  const { service_name, team_member_name, date, time, ...bookingData } = booking;
  
  const { data, error } = await supabase
    .from('bookings')
    .insert(bookingData)
    .select()
    .single();
  
  if (!error) {
    revalidatePath('/admin/bookings');
  }
  
  return { data, error };
}

export async function updateBooking(id: string, booking: Booking) {
  const supabase = createServerClient();
  
  // Remove fields that are not in the database schema
  const { service_name, team_member_name, date, time, ...bookingData } = booking;
  
  const { data, error } = await supabase
    .from('bookings')
    .update(bookingData)
    .eq('id', id)
    .select()
    .single();
  
  if (!error) {
    revalidatePath('/admin/bookings');
  }
  
  return { data, error };
}

export async function deleteBooking(id: string) {
  const supabase = createServerClient();
  
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id);
  
  if (!error) {
    revalidatePath('/admin/bookings');
  }
  
  return { error };
}

// Blog Posts
export async function getBlogPosts() {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  return { data, error };
}

export async function createBlogPost(blogPost: BlogPost) {
  const supabase = createServerClient();
  
  // Ensure published_at is set if the post is published
  if (blogPost.published && !blogPost.published_at) {
    blogPost.published_at = new Date().toISOString();
  }
  
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(blogPost)
    .select()
    .single();
  
  if (!error) {
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
  }
  
  return { data, error };
}

export async function updateBlogPost(id: string, blogPost: BlogPost) {
  const supabase = createServerClient();
  
  // Ensure published_at is set if the post is published and wasn't before
  if (blogPost.published && !blogPost.published_at) {
    blogPost.published_at = new Date().toISOString();
  }
  
  const { data, error } = await supabase
    .from('blog_posts')
    .update(blogPost)
    .eq('id', id)
    .select()
    .single();
  
  if (!error) {
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
    revalidatePath(`/blog/${blogPost.slug}`);
  }
  
  return { data, error };
}

export async function deleteBlogPost(id: string) {
  const supabase = createServerClient();
  
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
  
  if (!error) {
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
  }
  
  return { error };
}

// Products CRUD
export async function getProducts() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('products').select('*');
  return { data, error };
}

export async function getProductById(id: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  return { data, error };
}

export async function createProduct(product: Product) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('products').insert(product).select();
  
  if (!error) {
    revalidatePath('/admin/products');
  }
  
  return { data, error };
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('products').update(product).eq('id', id).select();
  
  if (!error) {
    revalidatePath('/admin/products');
  }
  
  return { data, error };
}

export async function deleteProduct(id: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from('products').delete().eq('id', id);
  
  if (!error) {
    revalidatePath('/admin/products');
  }
  
  return { error };
}

// Gift Vouchers CRUD
export async function getGiftVouchers() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('gift_vouchers').select('*');
  return { data, error };
}

export async function getGiftVoucherById(id: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('gift_vouchers').select('*').eq('id', id).single();
  return { data, error };
}

export async function createGiftVoucher(giftVoucher: GiftVoucher) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('gift_vouchers').insert(giftVoucher).select();
  
  if (!error) {
    revalidatePath('/admin/vouchers');
  }
  
  return { data, error };
}

export async function updateGiftVoucher(id: string, giftVoucher: Partial<GiftVoucher>) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('gift_vouchers').update(giftVoucher).eq('id', id).select();
  
  if (!error) {
    revalidatePath('/admin/vouchers');
  }
  
  return { data, error };
}

export async function deleteGiftVoucher(id: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from('gift_vouchers').delete().eq('id', id);
  
  if (!error) {
    revalidatePath('/admin/vouchers');
  }
  
  return { error };
}

// Clients CRUD
export async function getClients() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('clients').select('*');
  return { data, error };
}

export async function getClientById(id: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('clients').select('*').eq('id', id).single();
  return { data, error };
}

export async function createClient(client: Client) {
  const supabase = createServerClient();
  
  // Set default values for new clients
  const newClient = {
    ...client,
    registration_date: client.registration_date || new Date().toISOString(),
    visit_count: client.visit_count || 0,
    total_spent: client.total_spent || 0,
    status: client.status || 'new'
  };
  
  const { data, error } = await supabase.from('clients').insert(newClient).select();
  
  if (!error) {
    revalidatePath('/admin/clients');
  }
  
  return { data, error };
}

export async function updateClient(id: string, client: Partial<Client>) {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('clients').update(client).eq('id', id).select();
  
  if (!error) {
    revalidatePath('/admin/clients');
  }
  
  return { data, error };
}

export async function deleteClient(id: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from('clients').delete().eq('id', id);
  
  if (!error) {
    revalidatePath('/admin/clients');
  }
  
  return { error };
}

// Dashboard Statistics
export async function getDashboardStats() {
  const supabase = createServerClient();
  
  // Get total bookings
  const { count: totalBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true });
  
  // Get today's bookings
  const today = new Date().toISOString().split('T')[0];
  const { count: todayBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .gte('date_time', `${today}T00:00:00`)
    .lt('date_time', `${today}T23:59:59`);
  
  // Get total revenue (simplified calculation)
  const { data: bookings } = await supabase
    .from('bookings')
    .select('services:service_id (price)')
    .eq('status', 'completed');
  
  const totalRevenue = bookings?.reduce((sum, booking) => {
    return sum + (booking.services?.[0]?.price || 0);
  }, 0) || 0;
  
  // Get total clients (unique emails)
  const { data: clients } = await supabase
    .from('bookings')
    .select('client_email')
    .is('client_email', 'not.null');
  
  const uniqueEmails = new Set(clients?.map(client => client.client_email));
  const totalClients = uniqueEmails.size;
  
  return {
    totalBookings,
    todayBookings,
    totalRevenue,
    totalClients
  };
}
