import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export default function PlaceholderPage({
  icon: Icon,
  title,
  description,
  ctaText = "Back to profile",
  ctaHref = "/profile",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="w-20 h-20 mx-auto rounded-full bg-sky-100 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-sky-600" />
      </div>

      <h1 className="text-2xl font-black text-slate-900">{title}</h1>
      <p className="text-sm text-slate-500 mt-3 max-w-md mx-auto">
        {description}
      </p>

      <p className="inline-block mt-6 text-xs font-extrabold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
        Coming soon
      </p>

      <div className="mt-8">
        <Link
          href={ctaHref}
          className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm px-6 py-2.5 rounded-xl transition-colors"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}