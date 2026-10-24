import type { PRIMARY_PERMITS } from "@/app/Nepal-Permits/content";

export default function DecisionGuide({
  guide,
}: {
  guide: { tripType: string; permits: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full text-sm">
        <thead className="bg-sky-50 border-b border-slate-200">
          <tr>
            <th className="text-left px-4 py-3 font-black text-xs uppercase tracking-wider text-slate-600 w-1/2">
              If you're doing...
            </th>
            <th className="text-left px-4 py-3 font-black text-xs uppercase tracking-wider text-slate-600">
              You need
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {guide.map((row) => (
            <tr key={row.tripType} className="hover:bg-sky-50 transition-colors">
              <td className="px-4 py-3 font-bold text-slate-900">
                {row.tripType}
              </td>
              <td className="px-4 py-3 text-slate-700">{row.permits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}