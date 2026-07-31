import React from "react";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  colorClass?: string;
}

export function KPICard({ 
  title, 
  value, 
  trend, 
  trendUp = true, 
  icon: Icon,
  colorClass = "text-blue-500 bg-blue-500/10" 
}: KPICardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg shadow-black/20 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl font-black text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colorClass}`}>
          <Icon size={24} />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center text-sm font-medium">
          <span className={trendUp ? "text-emerald-400" : "text-red-400"}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
          <span className="text-slate-500 ml-2">vs último mês</span>
        </div>
      )}
    </div>
  );
}
