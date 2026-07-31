import { getCompanySchedules } from "@/app/actions/agenda";
import { getCompanyListings } from "@/app/actions/company";
import AgendaManagement from "@/components/dashboard/AgendaManagement";
import { Calendar } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AgendaPage() {
  const [schedulesRes, listingsRes] = await Promise.all([
    getCompanySchedules(),
    getCompanyListings()
  ]);

  if (schedulesRes.error || listingsRes.error) {
    // Handling error silently for now
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Calendar className="text-blue-500 h-8 w-8" />
          Agenda Operacional
        </h1>
        <p className="text-slate-400 mt-2">
          Controle a disponibilidade, manutenções e bloqueios da sua frota.
        </p>
      </div>

      <AgendaManagement 
        initialSchedules={schedulesRes.data || []} 
        listings={listingsRes.data || []}
      />
    </div>
  );
}
