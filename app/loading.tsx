export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 w-full">
      <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse" />
      <div className="h-4 w-96 bg-slate-100 rounded-lg animate-pulse mt-3" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-48 bg-white border border-slate-200 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
