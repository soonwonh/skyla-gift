import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true, tags: { include: { tag: true } }, likes: true },
  });
  if (!post) return notFound();

  return (
    <article className="space-y-3">
      <div className="text-sm text-black/70 dark:text-white/70">
        by <Link href={`/closet/${post.author.username}`} className="underline">{post.author.displayName}</Link>
      </div>
      <h1 className="text-2xl font-semibold">{post.title}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="w-full rounded-lg object-cover" />
      )}
      <div className="prose dark:prose-invert max-w-none text-sm leading-7">
        {post.content}
      </div>
      <div className="flex flex-wrap gap-1 pt-1">
        {post.tags.map((t) => (
          <Link key={t.tagId} href={`/explore?tag=${t.tag.slug}`} className="text-[11px] px-2 py-0.5 rounded-full border">
            #{t.tag.name}
          </Link>
        ))}
      </div>
      <div className="text-xs text-black/60 dark:text-white/60">좋아요 {post.likes.length}개</div>
    </article>
  );
}

