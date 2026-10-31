import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";

export default function SubcategoryCard({
  number,
  name,
  description,
  href,
  permitCount,
}: {
  number: string;
  name: string;
  description: string | null;
  href: string;
  permitCount: number;
}) {
  return (
    <Link
      href={href}
      className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-sky-300 hover:shadow-md transition-all flex flex-col group"
    >
      <div className="flex items-start gap-3 mb-2">
        <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4 text-sky-600" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-600">
            {number}
          </span>
          <h3 className="font-extrabold text-slate-900 leading-tight">
            {name}
          </h3>
        </div>
      </div>
      <p className="text-sm text-slate-500 flex-1">
        {description ?? ""}
      </p>
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-sky-600">
          {permitCount} permit{permitCount === 1 ? "" : "s"}
        </span>
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 transition-colors" />
      </div>
    </Link>
  );
}