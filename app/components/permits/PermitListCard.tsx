import Link from "next/link";
import { FileText, ChevronRight, MapPin, Clock } from "lucide-react";

export default function PermitListCard({
  categorySlug,
  subcategorySlug,
  permit,
}: {
  categorySlug: string;
  subcategorySlug: string;
  permit: {
    name: string;
    slug: string;
    description: string | null;
    costDetails: any;
    validity: string | null;
    quickSummary: any;
  };
}) {
  const firstCost =
    Array.isArray(permit.costDetails) && permit.costDetails[0]
      ? `${permit.costDetails[0].label}: ${permit.costDetails[0].value}`
      : null;

  const whoNeeds =
    Array.isArray(permit.quickSummary) && permit.quickSummary[0]?.value
      ? permit.quickSummary[0].value
      : null;

  return (
    <Link
      href={`/Nepal-Permits/${categorySlug}/${subcategorySlug}/${permit.slug}`}
      className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-sky-300 hover:shadow-md transition-all group flex flex-col"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 text-sky-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-extrabold text-slate-900 leading-tight">
            {permit.name}
          </h3>
          {whoNeeds && (
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {whoNeeds}
            </p>
          )}
        </div>
      </div>

      <p className="text-sm text-slate-600 line-clamp-2 flex-1">
        {permit.description ?? ""}
      </p>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="space-y-1">
          {firstCost && (
            <span className="text-xs font-black text-sky-700 bg-sky-50 px-2 py-1 rounded-md inline-block">
              {firstCost}
            </span>
          )}
          {permit.validity && (
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {permit.validity}
            </p>
          )}
        </div>
        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-sky-600 transition-colors shrink-0" />
      </div>
    </Link>
  );
}