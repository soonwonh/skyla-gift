import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ClosetPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      items: { include: { tags: { include: { tag: true } } } },
      closets: { include: { items: { include: { item: true } } } },
    },
  });
  if (!user) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={user.avatarUrl || "https://i.pravatar.cc/100"} alt={user.displayName} className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h1 className="text-xl font-semibold">{user.displayName}</h1>
          <p className="text-sm text-black/70 dark:text-white/70">@{user.username}</p>
          <p className="text-sm text-black/80 dark:text-white/80">{user.bio}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-medium">아이템</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {user.items.map((item) => (
            <Link key={item.id} href={`/item/${item.id}`} className="group rounded-lg overflow-hidden border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt={item.title} className="aspect-square object-cover w-full" />
              <div className="p-3">
                <div className="text-sm font-medium truncate">{item.title}</div>
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

      {user.closets.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-medium">옷장</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.closets.map((c) => (
              <div key={c.id} className="rounded-lg border p-4">
                <div className="font-medium mb-2">{c.name}</div>
                <div className="flex gap-2 overflow-x-auto">
                  {c.items.slice(0, 6).map((ci) => (
                    <Link key={ci.itemId} href={`/item/${ci.itemId}`} className="block w-20 h-20 rounded overflow-hidden border shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ci.item.imageUrl} alt={ci.item.title} className="w-full h-full object-cover" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

