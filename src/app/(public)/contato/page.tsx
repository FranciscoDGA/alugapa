import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contato - AlugaPA',
  description: 'Informações sobre Contato no AlugaPA.',
};

export default function Page() {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Breadcrumbs items={[{ label: 'Contato' }]} />
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Contato</h1>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">Esta página está sendo atualizada pela equipe do AlugaPA.</p>
          <div className="h-64 bg-slate-100 rounded-xl animate-pulse mt-8"></div>
        </div>
      </div>
    </div>
  );
}
