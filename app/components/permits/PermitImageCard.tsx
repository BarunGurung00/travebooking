"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import PermitPaper from "./PermitPaper";
import PermitLightbox, { LightboxData } from "./PermitLightbox";

export type PermitImageData = LightboxData;

export default function PermitImageCard({ data }: { data: PermitImageData }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-white border border-slate-200 rounded-3xl overflow-hidden text-left hover:shadow-lg hover:border-sky-300 transition-all cursor-pointer group w-full"
      >
        {/* Image or fallback */}
        <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden">
          {data.imageSrc ? (
            <img
              src={data.imageSrc}
              alt={data.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full p-4 flex items-center justify-center">
              <PermitPaper
                data={{
                  name: data.name,
                  subtitle: data.subtitle,
                  number: data.number,
                  fee: data.fee,
                  issuer: data.issuer,
                  color: data.color,
                }}
              />
            </div>
          )}

          {/* Hover overlay with zoom icon */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              <ZoomIn className="w-5 h-5 text-sky-600" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">
                {data.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{data.subtitle}</p>
            </div>
            <span className="text-xs font-black text-sky-700 bg-sky-100 px-2.5 py-1 rounded-md shrink-0">
              {data.fee}
            </span>
          </div>

          <dl className="space-y-2 border-t border-slate-100 pt-3 text-sm">
            <div className="flex gap-2">
              <dt className="text-slate-400 font-bold w-16 shrink-0 text-xs uppercase tracking-wider pt-0.5">
                Issuer
              </dt>
              <dd className="text-slate-700">{data.issuer}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-slate-400 font-bold w-16 shrink-0 text-xs uppercase tracking-wider pt-0.5">
                Format
              </dt>
              <dd className="text-slate-700">{data.format}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-slate-400 font-bold w-16 shrink-0 text-xs uppercase tracking-wider pt-0.5">
                Where
              </dt>
              <dd className="text-slate-700">{data.where}</dd>
            </div>
          </dl>
        </div>
      </button>

      {/* Lightbox */}
      {open && <PermitLightbox data={data} onClose={() => setOpen(false)} />}
    </>
  );
}