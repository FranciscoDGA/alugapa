import { getMyCompany } from "@/app/actions/company";
import CompanyProfileForm from "@/components/dashboard/CompanyProfileForm";
import { Building2 } from "lucide-react";
import { redirect } from "next/navigation";

export default async function EmpresaPage() {
  const { data: company, error } = await getMyCompany();

  if (error || !company) {
    redirect("/login");
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Building2 className="text-blue-500 h-8 w-8" />
          Perfil da Empresa
        </h1>
        <p className="text-slate-400 mt-2">
          Gerencie as informações públicas da sua locadora, contatos e endereços.
        </p>
      </div>

      <CompanyProfileForm company={company} />
    </div>
  );
}
