import { FileText, Stamp } from "lucide-react";

export type PermitPaperData = {
  name: string;
  subtitle: string;
  number: string;
  fee: string;
  issuer: string;
  color: "blue" | "green" | "orange" | "red" | "purple";
};

const COLOR_MAP = {
  blue: { bg: "bg-blue-50", border: "border-blue-300", accent: "text-blue-700", bgAccent: "bg-blue-100" },
  green: { bg: "bg-green-50", border: "border-green-300", accent: "text-green-700", bgAccent: "bg-green-100" },
  orange: { bg: "bg-orange-50", border: "border-orange-300", accent: "text-orange-700", bgAccent: "bg-orange-100" },
  red: { bg: "bg-red-50", border: "border-red-300", accent: "text-red-700", bgAccent: "bg-red-100" },
  purple: { bg: "bg-purple-50", border: "border-purple-300", accent: "text-purple-700", bgAccent: "bg-purple-100" },
};

export default function PermitPaper({ data }: { data: PermitPaperData }) {
  const c = COLOR_MAP[data.color];

  return (
    <div
      className={`relative ${c.bg} ${c.border} border-2 border-dashed rounded-2xl p-5 overflow-hidden`}
    >
      {/* Watermark */}
      <div className="absolute -right-8 -bottom-8 opacity-5">
        <FileText className="w-40 h-40" />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Permit Document · Demo
          </div>
          <div className={`text-lg font-black ${c.accent} mt-1`}>
            {data.name}
          </div>
          <div className="text-xs text-slate-600">{data.subtitle}</div>
        </div>
        {/* Fake passport photo placeholder */}
        <div className="w-14 h-16 bg-slate-200 border-2 border-slate-300 rounded flex items-center justify-center shrink-0">
          <span className="text-[8px] text-slate-400 font-bold text-center leading-tight">
            PASSPORT<br />PHOTO
          </span>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3 relative">
        <div>
          <div className="text-[9px] uppercase font-black text-slate-400 tracking-wider">
            Permit No.
          </div>
          <div className={`text-xs font-mono font-bold ${c.accent}`}>
            {data.number}
          </div>
        </div>
        <div>
          <div className="text-[9px] uppercase font-black text-slate-400 tracking-wider">
            Fee
          </div>
          <div className="text-xs font-bold text-slate-800">{data.fee}</div>
        </div>
        <div className="col-span-2">
          <div className="text-[9px] uppercase font-black text-slate-400 tracking-wider">
            Issued By
          </div>
          <div className="text-xs font-bold text-slate-800">{data.issuer}</div>
        </div>
      </div>

      {/* Fake stamp */}
      <div className="mt-4 flex items-center justify-between border-t border-dashed border-slate-300 pt-3">
        <div className={`${c.bgAccent} ${c.accent} px-2 py-0.5 rounded text-[9px] font-black uppercase`}>
          Valid
        </div>
        <div className={`border-2 ${c.border} ${c.accent} rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-wider rotate-[-8deg] flex items-center gap-1`}>
          <Stamp className="w-3 h-3" />
          Authorized
        </div>
      </div>
    </div>
  );
}