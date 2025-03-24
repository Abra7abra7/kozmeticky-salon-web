'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  CalendarIcon, 
  UsersIcon, 
  ScissorsIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  EnvelopeIcon, 
  Cog6ToothIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Rezervácie', href: '/admin/bookings', icon: CalendarIcon },
  { name: 'Klienti', href: '/admin/clients', icon: UsersIcon },
  { name: 'Služby', href: '/admin/services', icon: ScissorsIcon },
  { name: 'Tím', href: '/admin/team', icon: UserGroupIcon },
  { name: 'Produkty', href: '/admin/products', icon: ShoppingBagIcon },
  { name: 'Blog', href: '/admin/blog', icon: DocumentTextIcon },
  { name: 'Emaily', href: '/admin/emails', icon: EnvelopeIcon },
  { name: 'Nastavenia', href: '/admin/settings', icon: Cog6ToothIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-white">Kozmetický Salón</h1>
        </div>
        <div className="mt-5 flex-1 flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${isActive
                      ? 'bg-indigo-800 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600'}
                  `}
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
