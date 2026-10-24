import { MapPin } from "lucide-react";

export default function PermitLocationCard({
  city,
  office,
  address,
  note,
}: {
  city: string;
  office: string;
  address: string;
  note?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-4 h-4 text-sky-600" />
        <span className="text-xs font-black uppercase tracking-wider text-slate-500">
          {city}
        </span>
      </div>
      <h3 className="font-extrabold text-slate-900">{office}</h3>
      <p className="text-xs text-slate-500 mt-1">{address}</p>
      {note && (
        <p className="text-xs text-sky-700 bg-sky-50 px-2 py-1 rounded-md mt-3">
          {note}
        </p>
      )}
    </div>
  );
}