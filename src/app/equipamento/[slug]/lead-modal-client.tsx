"use client";

import { useState } from "react";
import { LeadModal } from "@/components/lead/lead-modal";

interface LeadModalClientProps {
  listingName: string;
  companyName: string;
  companyId: string;
  listingId: string;
}

export function LeadModalClient({ listingName, companyName, companyId, listingId }: LeadModalClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-accent hover:bg-accent-hover text-accent-foreground font-bold text-lg py-4 px-6 rounded-xl shadow-lg shadow-accent/20 transition-all transform hover:-translate-y-1"
      >
        Solicitar Orçamento
      </button>

      <LeadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        listingName={listingName}
        companyName={companyName}
      />
    </>
  );
}
