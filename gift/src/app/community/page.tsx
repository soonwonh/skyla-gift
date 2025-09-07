import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const posts = await prisma.post.findMany({
    include: { author: true, tags: { include: { tag: true } }, likes: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">커뮤니티</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="rounded-lg overflow-hidden border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className="w-full aspect-video object-cover" />
            )}
            <div className="p-4 space-y-2">
              <div className="text-sm text-black/70 dark:text-white/70">
                by <Link href={`/closet/${post.author.username}`} className="underline">{post.author.displayName}</Link>
              </div>
              <h2 className="font-medium">{post.title}</h2>
              <p className="text-sm text-black/80 dark:text-white/80 line-clamp-2">{post.content}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {post.tags.map((t) => (
                  <Link key={t.tagId} href={`/explore?tag=${t.tag.slug}`} className="text-[11px] px-2 py-0.5 rounded-full border">
                    #{t.tag.name}
                  </Link>
                ))}
              </div>
              <div className="text-xs text-black/60 dark:text-white/60">좋아요 {post.likes.length}개</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

