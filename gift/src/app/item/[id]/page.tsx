import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Recommended } from "./Recommended";

export default async function ItemDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      user: true,
      tags: { include: { tag: true } },
      likedBy: true,
    },
  });
  if (!item) return notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.imageUrl} alt={item.title} className="w-full rounded-lg object-cover" />
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">{item.title}</h1>
        <div className="text-black/70 dark:text-white/70 text-sm">
          판매자: <Link className="underline" href={`/closet/${item.user.username}`}>{item.user.displayName}</Link>
        </div>
        <div className="text-lg font-medium">
          {(item.priceCents / 100).toLocaleString("ko-KR", { style: "currency", currency: item.currency })}
        </div>
        <p className="text-sm text-black/80 dark:text-white/80 whitespace-pre-line">{item.description}</p>
        <div className="flex flex-wrap gap-1 pt-1">
          {item.tags.map((t) => (
            <Link key={t.tagId} href={`/explore?tag=${t.tag.slug}`} className="text-[11px] px-2 py-0.5 rounded-full border">
              #{t.tag.name}
            </Link>
          ))}
        </div>
        <div className="text-sm text-black/60 dark:text-white/60">좋아요 {item.likedBy.length}개</div>

        <div className="pt-2">
          <button className="px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black text-sm">관심</button>
        </div>
      </div>
      <div className="md:col-span-2">
        <Recommended itemId={item.id} />
      </div>
    </div>
  );
}

