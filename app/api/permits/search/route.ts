import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const likeTerm = `%${q}%`;

  const rows = await prisma.$queryRaw<
    Array<{
      id: number;
      name: string;
      description: string | null;
      slug: string;
      subcategorySlug: string | null;
      subcategoryName: string | null;
      categorySlug: string | null;
      categoryName: string | null;
    }>
  >`
    SELECT
      p.id,
      p.name,
      p.description,
      p.slug,
      s.slug AS subcategorySlug,
      s.name AS subcategoryName,
      c.slug AS categorySlug,
      c.name AS categoryName
    FROM Permit p
    LEFT JOIN Permit s ON p.parentId = s.id
    LEFT JOIN Permit c ON s.parentId = c.id
    WHERE p.type = 'permit'
      AND (
        p.name LIKE ${likeTerm}
        OR JSON_EXTRACT(p.aliases, '$') LIKE ${likeTerm}
        OR p.description LIKE ${likeTerm}
      )
    ORDER BY p.name ASC
    LIMIT 10
  `;

  const results = rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    categoryName: row.categoryName ?? "",
    categorySlug: row.categorySlug ?? "",
    subcategoryName: row.subcategoryName ?? "",
    subcategorySlug: row.subcategorySlug ?? "",
    url:
      row.categorySlug && row.subcategorySlug
        ? `/Nepal-Permits/${row.categorySlug}/${row.subcategorySlug}/${row.slug}`
        : "#",
  }));

  return NextResponse.json({ results });
}