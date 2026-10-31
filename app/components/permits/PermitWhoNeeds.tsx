import { Check, X } from "lucide-react";

export default function PermitWhoNeeds({
  whoNeeds = [],
  whoDoesnt = [],
}: {
  whoNeeds?: string[];
  whoDoesnt?: string[];
}) {
  return (
    <div className="my-8">
      <h2 className="text-xl font-black text-slate-900 mb-4">Who needs it</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Needs */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <h3 className="text-sm font-black uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-2">
            <Check className="w-4 h-4" />
            Needs this permit
          </h3>
          {whoNeeds.length > 0 ? (
            <ul className="space-y-2">
              {whoNeeds.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-700"
                >
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-white/60 border border-dashed border-emerald-300 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500">
                Who needs this — content coming soon
              </p>
            </div>
          )}
        </div>

        {/* Doesn't */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <h3 className="text-sm font-black uppercase tracking-wider text-red-800 mb-3 flex items-center gap-2">
            <X className="w-4 h-4" />
            Doesn&apos;t need this
          </h3>
          {whoDoesnt.length > 0 ? (
            <ul className="space-y-2">
              {whoDoesnt.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-700"
                >
                  <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-white/60 border border-dashed border-red-300 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-500">
                Who doesn&apos;t need this — content coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}