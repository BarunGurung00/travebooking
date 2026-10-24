import Link from "next/link";
import { ChevronRight, Mountain, Lock, Globe, Plane } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  entry: Globe,
  trekking: Mountain,
  climbing: Mountain,
  special: Lock,
};

export default function PermitCategoryCard({
  category,
  childCount,
}: {
  category: { name: string; slug: string; description: string | null };
  childCount: number;
}) {
  const Icon = ICON_MAP[category.slug] ?? Mountain;

  return (
    <Link
      href={`/Nepal-Permits/${category.slug}`}
      className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-sky-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
          <Icon className="w-6 h-6 text-sky-600" />
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-sky-600 transition-colors" />
      </div>
      <h3 className="font-extrabold text-lg text-slate-900">{category.name}</h3>
      <p className="text-sm text-slate-500 mt-1">
        {category.description ?? ""}
      </p>
      <p className="text-xs font-bold text-sky-600 mt-3">
        {childCount} {childCount === 1 ? "category" : "subcategories"}
      </p>
    </Link>
  );
}