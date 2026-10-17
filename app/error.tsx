"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="max-w-xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-black text-slate-900">Something went wrong</h1>
      <p className="text-sm text-slate-500 mt-3">
        {error.message || "Please try again."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm px-5 py-2.5 rounded-xl"
      >
        Try again
      </button>
    </main>
  );
}
