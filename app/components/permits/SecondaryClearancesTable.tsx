import { Plane, Video, Landmark, Zap } from "lucide-react";
import type { SecondaryClearance } from "@/app/Nepal-Permits/content";

const ICON_MAP = {
  drone: Plane,
  video: Video,
  landmark: Landmark,
  activity: Zap,
};

export default function SecondaryClearancesTable({
  clearances,
}: {
  clearances: SecondaryClearance[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="text-left px-4 py-3 font-black text-xs uppercase tracking-wider text-slate-600 w-1/3">
              Clearance
            </th>
            <th className="text-left px-4 py-3 font-black text-xs uppercase tracking-wider text-slate-600">
              When Required
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {clearances.map((c) => {
            const Icon = ICON_MAP[c.icon];
            return (
              <tr key={c.id} className="hover:bg-sky-50 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="font-bold text-slate-900">{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-600">{c.whenRequired}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}