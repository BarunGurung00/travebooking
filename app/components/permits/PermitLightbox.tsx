"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export type LightboxData = {
  name: string;
  subtitle: string;
  imageSrc?: string;
  fee: string;
  issuer: string;
  format: string;
  where: string;
  number: string;
  color: "blue" | "green" | "orange" | "red" | "purple";
};

const COLOR_MAP = {
  blue: "from-blue-50 to-blue-100",
  green: "from-green-50 to-green-100",
  orange: "from-orange-50 to-orange-100",
  red: "from-red-50 to-red-100",
  purple: "from-purple-50 to-purple-100",
};

export default function PermitLightbox({
  data,
  onClose,
}: {
  data: LightboxData;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEscape);

    // Prevent body scroll while lightbox is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Modal content — stop propagation so clicks inside don't close */}
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-slate-700" />
        </button>

        {/* Image or fallback */}
        <div
          className={`aspect-[4/3] bg-gradient-to-br ${COLOR_MAP[data.color]} flex items-center justify-center overflow-hidden`}
        >
          {data.imageSrc ? (
            <img
              src={data.imageSrc}
              alt={data.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center p-8">
              <div className="text-6xl mb-4">📄</div>
              <div className="text-sm font-bold text-slate-700">
                Permit image coming soon
              </div>
              <div className="text-xs text-slate-500 mt-2">
                {data.name}
              </div>
            </div>
          )}
        </div>

        {/* Info below image */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                {data.name}
              </h2>
              <p className="text-sm text-slate-500 mt-1">{data.subtitle}</p>
            </div>
            <span className="text-sm font-black text-sky-700 bg-sky-100 px-3 py-1.5 rounded-lg shrink-0">
              {data.fee}
            </span>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 border-t border-slate-200 pt-4 text-sm">
            <div>
              <dt className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                Issuer
              </dt>
              <dd className="text-slate-800 font-medium">{data.issuer}</dd>
            </div>
            <div>
              <dt className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                Format
              </dt>
              <dd className="text-slate-800 font-medium">{data.format}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                Where to Get
              </dt>
              <dd className="text-slate-800 font-medium">{data.where}</dd>
            </div>
          </dl>

          <p className="text-xs text-slate-400 mt-6 text-center">
            Click outside or press Escape to close
          </p>
        </div>
      </div>
    </div>
  );
}