import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-xl mx-auto px-4 py-20 text-center">
      <p className="text-xs font-extrabold uppercase tracking-wider text-sky-600">
        404
      </p>
      <h1 className="text-3xl font-black text-slate-900 mt-2">
        That trail doesn&apos;t exist
      </h1>
      <p className="text-sm text-slate-500 mt-3">
        The page or listing you opened is missing. Try search or a directory.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/"
          className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm px-5 py-2.5 rounded-xl"
        >
          Home
        </Link>
        <Link
          href="/Destinations"
          className="border border-slate-200 bg-white font-extrabold text-sm px-5 py-2.5 rounded-xl text-slate-800"
        >
          Destinations
        </Link>
      </div>
    </main>
  );
}
