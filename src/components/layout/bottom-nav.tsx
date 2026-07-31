"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, MessageSquare, User } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  // Esconder em algumas rotas que não precisam (ex: admin, login)
  if (pathname.startsWith('/admin')) return null;

  const navItems = [
    { icon: Home, label: 'Início', href: '/' },
    { icon: Search, label: 'Buscar', href: '/buscar' },
    { icon: Heart, label: 'Favoritos', href: '/favoritos' },
    { icon: MessageSquare, label: 'Mensagens', href: '/dashboard/inbox' },
    { icon: User, label: 'Perfil', href: '/dashboard' },
  ];

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
