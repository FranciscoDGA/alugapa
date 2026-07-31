import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-slate-400" />
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-600 transition-colors font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-bold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
