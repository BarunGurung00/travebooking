"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ReviewForm({ poiId }: { poiId: number }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Not logged in
    if (status === "loading") {
        return (
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <div className="h-20 bg-slate-100 animate-pulse rounded-xl" />
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 text-center">
                <p className="text-sm text-slate-600">
                    <a
                        href="/login"
                        className="font-bold text-sky-600 hover:underline"
                    >
                        Log in
                    </a>{" "}
                    to write a review.
                </p>
            </div>
        );
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (rating < 1) {
            setError("Please select a rating");
            return;
        }
        if (text.trim().length < 10) {
            setError("Review must be at least 10 characters");
            return;
        }

        setLoading(true);

        const res = await fetch("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ poiId, rating, text }),
        });

        setLoading(false);

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Failed to submit review");
            return;
        }

        setRating(0);
        setText("");
        router.refresh();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-slate-200 p-6"
        >
            <h2 className="text-lg font-black text-slate-900 mb-4">
                Write a review
            </h2>

            {/* Star rating */}
            <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                    Your rating
                </label>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <button
                            key={n}
                            type="button"
                            onClick={() => setRating(n)}
                            onMouseEnter={() => setHover(n)}
                            onMouseLeave={() => setHover(0)}
                            className="transition-transform hover:scale-110"
                        >
                            <Star
                                className={`w-7 h-7 ${n <= (hover || rating)
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-slate-300"
                                    }`}
                            />
                        </button>
                    ))}
                    {rating > 0 && (
                        <span className="ml-2 text-sm font-bold text-slate-700">
                            {rating} / 5
                        </span>
                    )}
                </div>
            </div>

            {/* Text */}
            <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                    Your experience
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    maxLength={2000}
                    placeholder="Share what you liked, what to expect, tips for others..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm resize-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                    {text.length} / 2000
                </p>
            </div>

            {error && (
                <div className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="bg-sky-600 hover:bg-sky-700 disabled:opacity-60 text-white font-extrabold text-sm px-6 py-2.5 rounded-xl transition-all"
            >
                {loading ? "Submitting..." : "Submit review"}
            </button>
        </form>
    );
}