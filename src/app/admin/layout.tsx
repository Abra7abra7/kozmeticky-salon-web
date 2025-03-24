import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export const metadata = {
  title: 'Admin Dashboard | Kozmetický Salón',
  description: 'Administrátorský panel pre správu kozmetického salónu',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Kontrola, či sme v development prostredí
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (!isDevelopment) {
    const supabase = createServerComponentClient({ cookies });
    
    // Check if user is authenticated and has admin role
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      redirect('/admin/login');
    }
    
    // You'll need to implement role checking based on your user structure
    // This is a simplified example
    const { data: userRole } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
      
    if (!userRole || userRole.role !== 'admin') {
      redirect('/');
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
