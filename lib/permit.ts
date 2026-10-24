import { prisma } from "@/lib/prisma";

export type PermitNode = {
  id: number;
  parentId: number | null;
  type: string;
  name: string;
  slug: string;
  description: string | null;
  displayOrder: number;
};

/**
 * Walk up the parent chain to build a breadcrumb.
 * Returns [root, ..., current]
 */
export async function buildPermitBreadcrumb(
  permit: PermitNode
): Promise<PermitNode[]> {
  const chain: PermitNode[] = [permit];
  let current = permit;

  while (current.parentId) {
    const parent = await prisma.permit.findUnique({
      where: { id: current.parentId },
      select: {
        id: true,
        parentId: true,
        type: true,
        name: true,
        slug: true,
        description: true,
        displayOrder: true,
      },
    });
    if (!parent) break;
    chain.unshift(parent);
    current = parent;
  }

  return chain;
}

/**
 * Build a permit URL from a breadcrumb chain.
 * Example: [category, subcategory, permit] → "/nepal-permits/trekking/protected-area/sagarmatha-national-park"
 */
export function getPermitUrl(chain: PermitNode[]): string {
  // Skip root-level category from URL? No — we include all levels.
  // If chain starts with category "trekking", the URL is /nepal-permits/trekking/...
  const segments = chain.map((node) => node.slug).join("/");
  return `/nepal-permits/${segments}`;
}

/**
 * Get the URL for a category only (Level 2)
 */
export function getCategoryUrl(category: PermitNode): string {
  return `/nepal-permits/${category.slug}`;
}

/**
 * Get the URL for a subcategory (Level 3)
 */
export function getSubcategoryUrl(
  category: PermitNode,
  subcategory: PermitNode
): string {
  return `/nepal-permits/${category.slug}/${subcategory.slug}`;
}

/**
 * Get the URL for a permit (Level 4)
 */
export function getPermitDetailUrl(
  category: PermitNode,
  subcategory: PermitNode,
  permit: PermitNode
): string {
  return `/nepal-permits/${category.slug}/${subcategory.slug}/${permit.slug}`;
}