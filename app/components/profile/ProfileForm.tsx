"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileForm({
  initialName,
  initialEmail,
}: {
  initialName: string;
  initialEmail: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // No changes?
    if (name === initialName && email === initialEmail) {
      setError("No changes to save");
      return;
    }

    setSaving(true);

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    setSaving(false);

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to save");
      return;
    }

    setSuccess(true);
    router.refresh();

    // Hide success after 3s
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-slate-200 p-6"
    >
      <h2 className="text-lg font-black text-slate-900 mb-4">
        Edit profile
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none text-sm"
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
          Profile updated successfully
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mt-4 bg-sky-600 hover:bg-sky-700 disabled:opacity-60 text-white font-extrabold text-sm px-6 py-2.5 rounded-xl transition-all"
      >
        {saving ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}