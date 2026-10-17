import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  // 1. Auth check
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  // 2. Parse body
  const body = await req.json();
  const { name, email } = body;

  // 3. Validate
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim().length < 1) {
      return NextResponse.json(
        { error: "Name must be at least 1 character" },
        { status: 400 }
      );
    }
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: "Name must be under 100 characters" },
        { status: 400 }
      );
    }
  }

  if (email !== undefined) {
    if (typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if email is already taken by another user
    const normalizedEmail = email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existing && existing.id !== session.user.id) {
      return NextResponse.json(
        { error: "Email is already in use" },
        { status: 409 }
      );
    }
  }

  // 4. Build update data
  const data: { name?: string; email?: string } = {};
  if (name !== undefined) data.name = name.trim();
  if (email !== undefined) data.email = email.toLowerCase().trim();

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  // 5. Update
  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return NextResponse.json({ user: updated });
}