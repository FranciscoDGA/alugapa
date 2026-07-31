import { getCompanyMembers } from "@/app/actions/team";
import TeamManagement from "@/components/dashboard/TeamManagement";
import { Users } from "lucide-react";
import { redirect } from "next/navigation";

export default async function EquipePage() {
  const { data: members, error } = await getCompanyMembers();

  if (error || !members) {
    redirect("/dashboard");
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Users className="text-blue-500 h-8 w-8" />
          Equipe
        </h1>
        <p className="text-slate-400 mt-2">
          Gerencie os acessos e permissões dos membros da sua locadora.
        </p>
      </div>

      <TeamManagement initialMembers={members} />
    </div>
  );
}
