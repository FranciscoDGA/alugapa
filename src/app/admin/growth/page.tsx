"use client";

import { useEffect, useState } from "react";
import { getPlatformArticles, getPlatformFaqs } from "@/app/actions/admin";
import { LayoutTemplate, Loader2, FileText, HelpCircle, Plus, Eye, Edit } from "lucide-react";
import Link from "next/link";

export default function AdminGrowthPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'BLOG' | 'FAQ'>('BLOG');

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    setLoading(true);
    const [articlesRes, faqsRes] = await Promise.all([
      getPlatformArticles(),
      getPlatformFaqs()
    ]);
    if (articlesRes.data) setArticles(articlesRes.data);
    if (faqsRes.data) setFaqs(faqsRes.data);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Conteúdo & SEO</h1>
          <p className="text-slate-400">Gestão do Blog, FAQs e conteúdo de crescimento (Growth OS).</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-lg shadow-blue-900/20">
          <Plus className="w-4 h-4 mr-2" />
          Novo Conteúdo
        </button>
      </div>

      <div className="flex gap-4 border-b border-slate-800">
        <button 
          onClick={() => setActiveTab('BLOG')}
          className={`pb-4 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'BLOG' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
        >
          Artigos do Blog
        </button>
        <button 
          onClick={() => setActiveTab('FAQ')}
          className={`pb-4 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'FAQ' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
        >
          Perguntas Frequentes (FAQ)
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          {activeTab === 'BLOG' && (
            articles.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center text-slate-400">
                <FileText className="h-12 w-12 text-slate-700 mb-4" />
                <p className="text-lg font-medium text-slate-300">Nenhum artigo publicado.</p>
                <p className="text-sm">Comece a gerar conteúdo para SEO.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-slate-800">
                <thead className="bg-slate-950/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Artigo</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Autor</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {articles.map(article => (
                    <tr key={article.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-slate-500 shrink-0" />
                          <div>
                            <div className="text-sm font-bold text-white">{article.title}</div>
                            <div className="text-xs text-slate-500">/{article.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {article.author || 'AlugaPA Growth'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${article.status === 'PUBLISHED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                          {article.status === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3 items-center">
                          <button className="text-slate-400 hover:text-white" title="Editar">
                            <Edit size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {activeTab === 'FAQ' && (
            faqs.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center text-slate-400">
                <HelpCircle className="h-12 w-12 text-slate-700 mb-4" />
                <p className="text-lg font-medium text-slate-300">Nenhum FAQ cadastrado.</p>
                <p className="text-sm">Ajude os usuários respondendo dúvidas comuns.</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-slate-800">
                <thead className="bg-slate-950/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Pergunta</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Categoria</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {faqs.map(faq => (
                    <tr key={faq.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-white">{faq.question}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                        {faq.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3 items-center">
                          <button className="text-slate-400 hover:text-white" title="Editar">
                            <Edit size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>
      )}
    </div>
  );
}
