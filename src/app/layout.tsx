import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PwaRegistry } from "@/components/pwa-registry";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "AlugaPA - Infraestrutura Digital",
  description: "Descubra e alugue equipamentos e serviços especializados com facilidade.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AlugaPA",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Previne zoom em inputs no iOS
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 sm:pb-0 antialiased`}>
        <QueryProvider>
          <PwaRegistry />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
