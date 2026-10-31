"use client";

import { useState } from "react";
import { Camera, ZoomIn, ImageIcon } from "lucide-react";
import PermitLightbox from "./PermitLightbox";

export default function PermitPhoto({
  name,
  imageSrc,
  caption,
}: {
  name: string;
  imageSrc?: string | null;
  caption?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-8">
      <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
        <Camera className="w-5 h-5 text-sky-600" />
        What it looks like
      </h2>

      {imageSrc ? (
        <>
          <button
            onClick={() => setOpen(true)}
            className="relative group max-w-md w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            <img
              src={imageSrc}
              alt={name}
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-opacity">
                <ZoomIn className="w-5 h-5 text-sky-600" />
              </div>
            </div>
          </button>
          {caption && (
            <p className="text-xs text-slate-500 mt-3 max-w-md leading-relaxed">
              {caption}
            </p>
          )}
        </>
      ) : (
        <div className="max-w-md w-full aspect-[4/3] bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-center p-6">
          <ImageIcon className="w-10 h-10 text-slate-300 mb-2" />
          <p className="text-sm font-bold text-slate-500">
            Sample permit photo
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Image coming soon
          </p>
        </div>
      )}

      {open && imageSrc && (
        <PermitLightbox
          data={{
            name,
            subtitle: "",
            imageSrc,
            fee: "",
            issuer: "",
            format: "",
            where: "",
            number: "",
            color: "blue",
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}