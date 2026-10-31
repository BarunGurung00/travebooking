import Link from "next/link";
import { Check, MapPin, FileText, Clock, AlertCircle } from "lucide-react";
import type { Permit } from "@prisma/client";

export default function PermitDetail({
  permit,
  relatedPermits,
}: {
  permit: Permit;
  relatedPermits: Array<{ name: string; slug: string; categorySlug: string; subcategorySlug: string }>;
}) {
  const costDetails = (permit.costDetails as any[]) ?? [];
  const whereToGet = (permit.whereToGet as string[]) ?? [];
  const documents = (permit.documents as string[]) ?? [];

  return (
    <div className="space-y-6">
      {/* About */}
      <div>
        <h2 className="text-xl font-black text-slate-900 mb-4">
          About this permit
        </h2>
        {permit.longDescription ? (
          <div className="text-base text-slate-700 leading-relaxed space-y-4">
            {permit.longDescription.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
            <p className="text-sm text-slate-500">
              Full description — content coming soon
            </p>
          </div>
        )}
      </div>

      {/* Cost */}
      {costDetails.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <h2 className="text-xl font-black text-slate-900 mb-4">Cost</h2>
          <ul className="space-y-2">
            {costDetails.map((c: any, i: number) => (
              <li
                key={i}
                className="flex items-center justify-between text-sm border-b border-slate-100 pb-2 last:border-b-0 last:pb-0"
              >
                <span className="text-slate-700">{c.label}</span>
                <span className="font-bold text-slate-900">{c.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Where to Get */}
      {whereToGet.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-sky-600" /> Where to get it
          </h2>
          <ul className="space-y-2">
            {whereToGet.map((loc: string, i: number) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-700"
              >
                <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>{loc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Documents */}
      {documents.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-600" /> Documents needed
          </h2>
          <ul className="space-y-2">
            {documents.map((doc: string, i: number) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-700"
              >
                <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Validity */}
      {permit.validity && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <h2 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-600" /> Validity
          </h2>
          <p className="text-sm text-slate-700">{permit.validity}</p>
        </div>
      )}

      {/* Notes */}
      {permit.notes && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6">
          <h2 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            Good to know
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {permit.notes}
          </p>
        </div>
      )}

      {/* Related Permits */}
      {relatedPermits.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <h2 className="text-xl font-black text-slate-900 mb-4">
            You might also need
          </h2>
          <ul className="space-y-2">
            {relatedPermits.map((rp) => (
              <li key={rp.slug}>
                <Link
                  href={`/Nepal-Permits/${rp.categorySlug}/${rp.subcategorySlug}/${rp.slug}`}
                  className="text-sm font-bold text-sky-600 hover:text-sky-800 hover:underline"
                >
                  → {rp.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}