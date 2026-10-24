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

export default function PermitOverviewCard({ permit }: { permit: PrimaryPermit }) {
  const Icon = ICON_MAP[permit.icon];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-sky-300 hover:shadow-md transition-all flex flex-col">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-sky-600" />
        </div>
        <div className="min-w-0">
          <h3 className="font-extrabold text-slate-900 leading-tight">
            {permit.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{permit.whoNeeds}</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed flex-1">
        {permit.shortDesc}
      </p>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-black text-sky-700 bg-sky-50 px-2 py-1 rounded-md">
          {permit.cost}
        </span>
        <a
          href={`#permit-${permit.id}`}
          className="text-xs font-bold text-sky-600 hover:text-sky-800 hover:underline"
        >
          Details →
        </a>
      </div>
    </div>
  );
}