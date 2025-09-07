import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;

  const [tags, items] = await Promise.all([
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
    tag
      ? prisma.item.findMany({
          where: { tags: { some: { tag: { slug: tag } } } },
          include: { tags: { include: { tag: true } }, user: true },
          orderBy: { createdAt: "desc" },
        })
      : prisma.item.findMany({
          include: { tags: { include: { tag: true } }, user: true },
          orderBy: { createdAt: "desc" },
          take: 12,
        }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Link
          href="/explore"
          className={`px-3 py-1.5 rounded-full border text-sm ${!tag ? "bg-black text-white dark:bg-white dark:text-black" : ""}`}
        >
          전체
        </Link>
        {tags.map((t) => (
          <Link
            key={t.id}
            href={`/explore?tag=${t.slug}`}
            className={`px-3 py-1.5 rounded-full border text-sm ${tag === t.slug ? "bg-black text-white dark:bg-white dark:text-black" : ""}`}
          >
            {t.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/item/${item.id}`}
            className="group rounded-lg overflow-hidden border hover:shadow-sm transition"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="aspect-square object-cover w-full"
            />
            <div className="p-3">
              <div className="text-sm font-medium truncate">{item.title}</div>
              <div className="text-xs text-black/70 dark:text-white/70">
                by {item.user.displayName}
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map((it) => (
                  <span key={it.tagId} className="text-[10px] px-2 py-0.5 rounded-full border">
                    {it.tag.name}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

