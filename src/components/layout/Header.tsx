"use client";

import Link from "next/link";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <div className="bg-blue-600 text-white p-2 rounded-xl">
            <Search size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900">
            Aluga<span className="text-blue-600">PA</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/empresas" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
            Encontrar Empresas
          </Link>
          <Link href="/buscar" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
            Encontrar Equipamentos
          </Link>
          <Link href="/categorias" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
            Categorias
          </Link>
          <Link href="/como-funciona" className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
            Como Funciona
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2"
          >
            Entrar
          </Link>
          <Link
            href="/orcamento"
            className="bg-gray-900 hover:bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg"
          >
            Solicitar Orçamento
          </Link>
          <Link
            href="/anunciar"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-blue-200"
          >
            Anunciar Empresa
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden z-50 p-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 bg-white z-40 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-6">
              <Link href="/empresas" className="text-xl font-bold text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
                Encontrar Empresas
              </Link>
              <Link href="/buscar" className="text-xl font-bold text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
                Encontrar Equipamentos
              </Link>
              <Link href="/categorias" className="text-xl font-bold text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
                Categorias
              </Link>
              <Link href="/como-funciona" className="text-xl font-bold text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
                Como Funciona
              </Link>
              <hr className="border-gray-100" />
              <Link href="/login" className="text-xl font-bold text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>
                Entrar
              </Link>
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  href="/orcamento"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-gray-900 text-white text-center font-semibold px-5 py-4 rounded-xl"
                >
                  Solicitar Orçamento
                </Link>
                <Link
                  href="/anunciar"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-blue-600 text-white text-center font-semibold px-5 py-4 rounded-xl"
                >
                  Anunciar Empresa
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
