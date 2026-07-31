import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/bottom-nav";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
