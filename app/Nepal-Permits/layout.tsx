import { prisma } from "@/lib/prisma";
import PermitSearch from "@/app/components/permits/PermitSearch";

const POPULAR_SLUGS = [
    "e-tims-registration",
    "sagarmatha-national-park",
    "khumbu-pasang-lhamu",
    "upper-mustang",
    "tourist-visa",
];

export default async function PermitsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const popularPermits = await prisma.permit.findMany({
        where: {
            type: "permit",
            slug: { in: POPULAR_SLUGS },
        },
        include: {
            parent: {
                include: {
                    parent: {
                        select: { slug: true, name: true },
                    },
                },
            },
        },
    });


    const popularPermitsRaw = await prisma.permit.findMany({
        where: {
            type: "permit",
            slug: { in: POPULAR_SLUGS },
            parentId: { not: null },
            parent: {
                parentId: { not: null },
            },
        },
        include: {
            parent: {
                include: {
                    parent: {
                        select: { slug: true, name: true },
                    },
                },
            },
        },
    });

    // Sort by POPULAR_SLUGS order
    const orderedPopular = POPULAR_SLUGS.map((slug) =>
        popularPermitsRaw.find((p) => p.slug === slug)
    )
        .filter((p) => p && p.parent && p.parent.parent)
        .map((p) => p! as unknown as {
            id: number;
            name: string;
            slug: string;
            parent: {
                slug: string;
                name: string;
                parent: { slug: string; name: string };
            };
        });

    return (
        <>
            {/* Sticky search bar below site header */}
            <div className="sticky top-16 z-40 bg-[#f8f9fa]">
                <div className="max-w-3xl mx-auto px-4 py-3">
                    <PermitSearch popularPermits={orderedPopular} />
                </div>
            </div>

            {children}
        </>
    );
}