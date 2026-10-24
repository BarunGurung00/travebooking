import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileForm from "@/app/components/profile/ProfileForm";

export default async function ProfilePage() {
  // 1. Must be logged in
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/profile");
  }

  // 2. Fetch the user
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      image: true,
      createdAt: true,
      role: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const initial = (user.name?.[0] || user.email[0] || "U").toUpperCase();
  const memberSince = user.createdAt.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <h1 className="text-3xl font-black text-slate-900 mb-6">Profile</h1>

      {/* User info card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-sky-600 text-white font-black flex items-center justify-center text-2xl">
              {initial}
            </div>
          )}
          <div className="min-w-0">
            <div className="font-extrabold text-xl text-slate-900 truncate">
              {user.name || "User"}
            </div>
            <div className="text-sm text-slate-500 truncate">
              {user.email}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Member since {memberSince}
            </div>
          </div>
        </div>
      </div>

      {/* Edit form */}
      <ProfileForm
        initialName={user.name || ""}
        initialEmail={user.email}
      />
    </div>
  );
}