import Link from "next/link";
import { ChevronRight, MapPin, Shield, Mountain, Users, FileText } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  tims: FileText,
  "protected-area": Mountain,
  "restricted-area": Shield,
  "local-municipality": MapPin,
  "trekking-peaks": Mountain,
  "expedition-peaks": Mountain,
  drone: Shield,
  filming: FileText,
  heritage: MapPin,
  adventure: Users,
};

export default function PermitSubCategoryCard({
  categorySlug,
  subcategory,
  permitCount,
}: {
  categorySlug: string;
  subcategory: { name: string; slug: string; description: string | null };
  permitCount: number;
}) {
  const Icon = ICON_MAP[subcategory.slug] ?? FileText;

  return (
    <Link
      href={`/Nepal-Permits/${categorySlug}/${subcategory.slug}`}
      className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-sky-300 hover:shadow-md transition-all group flex items-start gap-4"
    >
      <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6 text-sky-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-extrabold text-slate-900">{subcategory.name}</h3>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-sky-600 transition-colors shrink-0" />
        </div>
        <p className="text-sm text-slate-500 mt-1">
          {subcategory.description ?? ""}
        </p>
        <p className="text-xs font-bold text-sky-600 mt-3">
          {permitCount} {permitCount === 1 ? "permit" : "permits"}
        </p>
      </div>
    </Link>
  );
}