"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Globe2, 
  Building2, 
  ShoppingCart, 
  Layers, 
  PieChart, 
  BrainCircuit, 
  Settings, 
  ShieldAlert,
  Menu, 
  X,
  LogOut,
  Users,
  LifeBuoy,
  LayoutTemplate
} from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: "Command Center", href: "/admin", icon: Globe2 },
    { name: "Empresas", href: "/admin/empresas", icon: Building2 },
    { name: "Marketplace", href: "/admin/marketplace", icon: ShoppingCart },
    { name: "Usuários", href: "/admin/tenants", icon: Users },
    { name: "Suporte", href: "/admin/suporte", icon: LifeBuoy },
    { name: "Categorias", href: "/admin/categorias", icon: Layers },
    { name: "Conteúdo", href: "/admin/growth", icon: LayoutTemplate },
    { name: "Auditoria", href: "/admin/auditoria", icon: ShieldAlert },
    { name: "Configurações", href: "/admin/configuracoes", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 xl:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Tema Dark Premium "God Mode" */}
      <aside className={`
        fixed xl:static inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 text-slate-300 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}
        flex flex-col shadow-2xl shadow-black
      `}>
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 bg-slate-950/50 border-b border-slate-800">
          <Link href="/admin" className="text-xl font-black text-white flex items-center gap-2 tracking-tight">
            <span className="text-blue-500">Aluga</span>PA <span className="text-xs px-2 py-1 bg-red-500/20 text-red-500 rounded-md font-bold uppercase tracking-widest ml-1">Admin</span>
          </Link>
          <button className="xl:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold shadow-inner">
              FG
            </div>
            <div>
              <p className="text-sm font-bold text-white">Francisco Gomes</p>
              <p className="text-xs text-blue-400 font-medium mt-0.5">Super Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Sistema Operacional</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            // Gambiarra rápida para Home não deixar todas ativas
            const isReallyActive = item.href === '/admin' ? pathname === '/admin' : isActive;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isReallyActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }
                `}
              >
                <item.icon size={20} className={isReallyActive ? "text-white" : "text-slate-500"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/50 bg-slate-900/50">
          <Link href="/" className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            Sair do Admin OS
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-950">
        {/* Top Header Mobile */}
        <header className="xl:hidden h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-white">
              Admin OS
            </h2>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 text-slate-300">
          {children}
        </div>
      </main>
    </div>
  );
}
