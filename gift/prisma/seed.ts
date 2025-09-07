import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.like.deleteMany();
  await prisma.postTag.deleteMany();
  await prisma.itemTag.deleteMany();
  await prisma.post.deleteMany();
  await prisma.item.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.closetItem.deleteMany();
  await prisma.closet.deleteMany();
  await prisma.user.deleteMany();

  const users = await prisma.$transaction([
    prisma.user.create({
      data: {
        username: "sky",
        displayName: "Sky",
        bio: "감성 빈티지 큐레이터",
        avatarUrl: "https://i.pravatar.cc/150?img=12",
      },
    }),
    prisma.user.create({
      data: {
        username: "muse",
        displayName: "Muse",
        bio: "오늘의 옷장",
        avatarUrl: "https://i.pravatar.cc/150?img=32",
      },
    }),
  ]);

  const [sky, muse] = users;

  const tags = await prisma.$transaction([
    prisma.tag.create({ data: { slug: "minimal", name: "미니멀" } }),
    prisma.tag.create({ data: { slug: "romantic", name: "로맨틱" } }),
    prisma.tag.create({ data: { slug: "grunge", name: "그런지" } }),
    prisma.tag.create({ data: { slug: "y2k", name: "Y2K" } }),
    prisma.tag.create({ data: { slug: "retro", name: "레트로" } }),
    prisma.tag.create({ data: { slug: "workwear", name: "워크웨어" } }),
  ]);

  const [minimal, romantic, grunge, y2k, retro, workwear] = tags;

  const items = await prisma.$transaction([
    prisma.item.create({
      data: {
        title: "빈티지 데님 재킷",
        description: "페이드 워싱과 오버핏이 매력적인 90s 데님",
        priceCents: 59000,
        imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
        condition: "vintage",
        userId: sky.id,
        tags: { create: [{ tagId: retro.id }, { tagId: workwear.id }] },
      },
    }),
    prisma.item.create({
      data: {
        title: "로맨틱 레이스 블라우스",
        description: "살랑이는 실루엣과 섬세한 레이스 디테일",
        priceCents: 42000,
        imageUrl: "https://images.unsplash.com/photo-1520975922322-a19334a11f3b?q=80&w=1200&auto=format&fit=crop",
        condition: "excellent",
        userId: muse.id,
        tags: { create: [{ tagId: romantic.id }, { tagId: minimal.id }] },
      },
    }),
    prisma.item.create({
      data: {
        title: "Y2K 샤이니 스커트",
        description: "반짝이는 메탈릭 소재가 포인트",
        priceCents: 38000,
        imageUrl: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=1200&auto=format&fit=crop",
        condition: "good",
        userId: sky.id,
        tags: { create: [{ tagId: y2k.id }] },
      },
    }),
  ]);

  const [denim, blouse, skirt] = items;

  await prisma.$transaction([
    prisma.post.create({
      data: {
        authorId: sky.id,
        title: "오늘의 셀렉션: 레트로 워크웨어",
        content: "편안함과 실용성이 만나는 순간.",
        imageUrl: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1200&auto=format&fit=crop",
        tags: { create: [{ tagId: retro.id }, { tagId: workwear.id }] },
      },
    }),
    prisma.post.create({
      data: {
        authorId: muse.id,
        title: "로맨틱 무드의 하루",
        content: "레이스로 완성하는 부드러운 실루엣.",
        imageUrl: "https://images.unsplash.com/photo-1520975922322-a19334a11f3b?q=80&w=1200&auto=format&fit=crop",
        tags: { create: [{ tagId: romantic.id }] },
      },
    }),
  ]);

  await prisma.like.createMany({
    data: [
      { userId: muse.id, itemId: denim.id },
      { userId: sky.id, itemId: blouse.id },
    ],
  });

  const closet = await prisma.closet.create({
    data: { name: "Sky의 옷장", ownerId: sky.id },
  });
  await prisma.closetItem.createMany({
    data: [
      { closetId: closet.id, itemId: denim.id },
      { closetId: closet.id, itemId: skirt.id },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed complete");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

