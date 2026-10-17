import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// ─── GET /api/reviews?poiId=100001 ───
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const poiIdStr = searchParams.get("poiId");

  if (!poiIdStr) {
    return NextResponse.json(
      { error: "poiId is required" },
      { status: 400 }
    );
  }

  const poiId = Number(poiIdStr);
  if (!Number.isFinite(poiId)) {
    return NextResponse.json({ error: "Invalid poiId" }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: { poiId },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, name: true, image: true },
      },
    },
  });

  return NextResponse.json({ reviews });
}

// ─── POST /api/reviews ───
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const body = await req.json();
  const { poiId, rating, text } = body;

  if (!poiId || typeof poiId !== "number") {
    return NextResponse.json({ error: "poiId is required" }, { status: 400 });
  }

  if (
    typeof rating !== "number" ||
    rating < 1 ||
    rating > 5 ||
    !Number.isInteger(rating)
  ) {
    return NextResponse.json(
      { error: "Rating must be an integer between 1 and 5" },
      { status: 400 }
    );
  }

  if (typeof text !== "string" || text.trim().length < 10) {
    return NextResponse.json(
      { error: "Review text must be at least 10 characters" },
      { status: 400 }
    );
  }

  if (text.length > 2000) {
    return NextResponse.json(
      { error: "Review text must be under 2000 characters" },
      { status: 400 }
    );
  }

  const poi = await prisma.poi.findUnique({
    where: { poiId },
    select: { poiId: true },
  });
  if (!poi) {
    return NextResponse.json({ error: "POI not found" }, { status: 404 });
  }

  const existing = await prisma.review.findUnique({
    where: {
      userId_poiId: {
        userId: session.user.id,
        poiId,
      },
    },
  });
  if (existing) {
    return NextResponse.json(
      { error: "You have already reviewed this place" },
      { status: 409 }
    );
  }

  const review = await prisma.review.create({
    data: {
      userId: session.user.id,
      poiId,
      rating,
      text: text.trim(),
    },
    include: {
      user: {
        select: { id: true, name: true, image: true },
      },
    },
  });

  const agg = await prisma.review.aggregate({
    where: { poiId },
    _avg: { rating: true },
  });

  await prisma.poi.update({
    where: { poiId },
    data: { rating: agg._avg.rating ?? null },
  });

  return NextResponse.json({ review }, { status: 201 });
}