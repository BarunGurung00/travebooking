import {
  IdCard,
  ClipboardList,
  Mountain,
  Lock,
  Building2,
  MountainSnow,
} from "lucide-react";
import type { PrimaryPermit } from "@/app/Nepal-Permits/content";

const ICON_MAP = {
  passport: IdCard,
  clipboard: ClipboardList,
  mountain: Mountain,
  lock: Lock,
  building: Building2,
  peak: MountainSnow,
};

export default function PermitDetailBlock({ permit }: { permit: PrimaryPermit }) {
  const Icon = ICON_MAP[permit.icon];

  return (
    <div
      id={`permit-${permit.id}`}
      className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 scroll-mt-24"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-5">
        <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-sky-600" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900">{permit.name}</h3>
          <p className="text-sm text-slate-500 mt-0.5">{permit.whoNeeds}</p>
        </div>
      </div>

      {/* Cost table */}
      <div className="mb-5">
        <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
          Cost
        </div>
        <ul className="space-y-1">
          {permit.detail.cost.map((c) => (
            <li key={c.label} className="flex items-center justify-between text-sm border-b border-slate-100 py-1.5 last:border-b-0">
              <span className="text-slate-700">{c.label}</span>
              <span className="font-bold text-slate-900">{c.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3-column info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
            Where Required
          </div>
          <ul className="space-y-1 text-sm text-slate-600">
            {permit.detail.whereRequired.map((w) => (
              <li key={w} className="flex items-start gap-1.5">
                <span className="text-sky-600 mt-0.5">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
            Where to Get
          </div>
          <ul className="space-y-1 text-sm text-slate-600">
            {permit.detail.whereToGet.map((w) => (
              <li key={w} className="flex items-start gap-1.5">
                <span className="text-sky-600 mt-0.5">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
            Documents Needed
          </div>
          <ul className="space-y-1 text-sm text-slate-600">
            {permit.detail.documents.map((w) => (
              <li key={w} className="flex items-start gap-1.5">
                <span className="text-sky-600 mt-0.5">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Note */}
      {permit.detail.note && (
        <div className="mt-5 pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-600 leading-relaxed">
            <span className="font-bold text-sky-700">Good to know: </span>
            {permit.detail.note}
          </p>
        </div>
      )}
    </div>
  );
}