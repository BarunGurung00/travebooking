export type TrekPermitRow = {
  trek: string;
  permits: string;
  costForeign: string;
  guideRequired: string;
  searchTerms: string;
};

export const TREK_PERMIT_ROWS: TrekPermitRow[] = [
  {
    trek: "Everest Base Camp",
    permits: "Sagarmatha NP + Khumbu Municipality",
    costForeign: "~NPR 6,000",
    guideRequired: "No (recommended)",
    searchTerms: "ebc everest khumbu sagarmatha",
  },
  {
    trek: "Annapurna Base Camp",
    permits: "ACAP",
    costForeign: "~NPR 3,000",
    guideRequired: "No (recommended)",
    searchTerms: "abc annapurna acap",
  },
  {
    trek: "Annapurna Circuit",
    permits: "ACAP + TIMS",
    costForeign: "~NPR 5,000",
    guideRequired: "No (recommended)",
    searchTerms: "circuit annapurna acap tims",
  },
  {
    trek: "Langtang Valley",
    permits: "Langtang NP + TIMS",
    costForeign: "~NPR 5,000",
    guideRequired: "No (recommended)",
    searchTerms: "langtang tims national park",
  },
  {
    trek: "Manaslu Circuit",
    permits: "RAP + MCAP + ACAP + TIMS",
    costForeign: "~$250–300",
    guideRequired: "Yes (mandatory)",
    searchTerms: "manaslu rap mcap restricted",
  },
  {
    trek: "Upper Mustang",
    permits: "RAP ($50/day) + ACAP + TIMS",
    costForeign: "~$430+",
    guideRequired: "Yes (mandatory)",
    searchTerms: "mustang upper rap restricted",
  },
  {
    trek: "Kanchenjunga",
    permits: "RAP + KCAP",
    costForeign: "~$100+",
    guideRequired: "Yes (mandatory)",
    searchTerms: "kanchenjunga rap kcap restricted",
  },
];

export default function PermitMatrix({ rows }: { rows: TrekPermitRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-slate-500">
        No treks match your search.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="text-left px-4 py-3 font-black text-xs uppercase tracking-wider text-slate-600">
              Trek
            </th>
            <th className="text-left px-4 py-3 font-black text-xs uppercase tracking-wider text-slate-600">
              Permits Required
            </th>
            <th className="text-left px-4 py-3 font-black text-xs uppercase tracking-wider text-slate-600">
              Cost (Foreign)
            </th>
            <th className="text-left px-4 py-3 font-black text-xs uppercase tracking-wider text-slate-600">
              Guide
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.trek} className="hover:bg-sky-50 transition-colors">
              <td className="px-4 py-3 font-bold text-slate-900">{row.trek}</td>
              <td className="px-4 py-3 text-slate-600">{row.permits}</td>
              <td className="px-4 py-3 font-bold text-slate-900">{row.costForeign}</td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    row.guideRequired.startsWith("Yes")
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {row.guideRequired}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}