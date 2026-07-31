import { WifiOff } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-slate-800 p-8 rounded-full mb-6">
        <WifiOff className="w-16 h-16 text-blue-500" />
      </div>
      <h1 className="text-2xl font-black text-white mb-2">Você está Offline</h1>
      <p className="text-slate-400 mb-8 max-w-md">
        Parece que você perdeu a conexão com a internet. O AlugaPA (Field Operations Mode) aguarda o retorno do sinal.
      </p>
      
      <Link 
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-900/50 transition-all"
      >
        Tentar Novamente
      </Link>
    </div>
  );
}
