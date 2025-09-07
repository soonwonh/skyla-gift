import { prisma } from "@/lib/prisma";
import Link from "next/link";

export async function Recommended({ itemId }: { itemId: string }) {
  const base = await prisma.item.findUnique({
    where: { id: itemId },
    include: { tags: true },
  });
  if (!base) return null;

  const tagIds = base.tags.map((t) => t.tagId);
  if (tagIds.length === 0) return null;

  const recs = await prisma.item.findMany({
    where: {
      id: { not: itemId },
      tags: { some: { tagId: { in: tagIds } } },
    },
    include: { user: true },
    take: 6,
  });
  if (recs.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-medium">연관 추천</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {recs.map((r) => (
          <Link key={r.id} href={`/item/${r.id}`} className="rounded-lg overflow-hidden border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.imageUrl} alt={r.title} className="aspect-square object-cover w-full" />
            <div className="p-2">
              <div className="text-xs font-medium truncate">{r.title}</div>
              <div className="text-[11px] text-black/70 dark:text-white/70">by {r.user.displayName}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

