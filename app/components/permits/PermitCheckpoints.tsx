import { MapPin } from "lucide-react";

export default function PermitCheckpoints({
  checkpoints = [],
}: {
  checkpoints?: string[];
}) {
  return (
    <div className="my-8 bg-white border border-slate-200 rounded-3xl p-6">
      <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-sky-600" />
        Where it&apos;s checked on the trail
      </h2>

      {checkpoints.length > 0 ? (
        <ul className="space-y-2">
          {checkpoints.map((cp, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-slate-700 border-b border-slate-100 pb-2 last:border-b-0 last:pb-0"
            >
              <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <span>{cp}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">
          <p className="text-sm text-slate-500">
            Checkpoint locations — content coming soon
          </p>
        </div>
      )}
    </div>
  );
}