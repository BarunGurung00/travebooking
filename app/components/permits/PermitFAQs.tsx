"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQ = { q: string; a: string };

export default function PermitFAQs({ faqs = [] }: { faqs?: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="my-8">
      <h2 className="text-xl font-black text-slate-900 mb-4">
        Frequently asked questions
      </h2>

      {faqs.length > 0 ? (
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-sm text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center">
          <p className="text-sm text-slate-500">
            FAQs — content coming soon
          </p>
        </div>
      )}
    </div>
  );
}