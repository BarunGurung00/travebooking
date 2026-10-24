import { Star } from "lucide-react";

export type ReviewWithUser = {
  reviewId: number;
  rating: number;
  text: string;
  createdAt: string | Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-3.5 h-3.5 ${
            n <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"
          }`}
        />
      ))}
    </div>
  );
}

function formatDate(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ReviewList({ reviews }: { reviews: ReviewWithUser[] }) {
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-8 text-center">
        <div className="text-3xl mb-2">💬</div>
        <h2 className="text-base font-extrabold text-slate-900">
          No reviews yet
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Be the first to share your experience.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-lg font-black text-slate-900">
          Reviews ({reviews.length})
        </h2>
      </div>

      <ul className="divide-y divide-slate-100">
        {reviews.map((review) => (
          <li key={review.reviewId} className="p-6">
            <div className="flex items-start gap-3">
              {review.user.image ? (
                <img
                  src={review.user.image}
                  alt={review.user.name || "User"}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-sky-600 text-white font-black flex items-center justify-center text-sm shrink-0">
                  {(review.user.name?.[0] || "U").toUpperCase()}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">
                    {review.user.name || "Anonymous"}
                  </span>
                  <StarRow rating={review.rating} />
                  <span className="text-xs text-slate-400">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-2 whitespace-pre-line">
                  {review.text}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}