import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-3 py-12">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          G’ift: 감성 빈티지 플랫폼
        </h1>
        <p className="text-black/70 dark:text-white/70">
          누군가의 옷장이, 오늘은 모두의 옷장입니다.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/explore"
            className="inline-flex items-center px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black text-sm"
          >
            태그로 탐색하기
          </Link>
          <Link
            href="/community"
            className="inline-flex items-center px-4 py-2 rounded-md border text-sm"
          >
            커뮤니티 보기
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border p-6">
          <h2 className="font-semibold mb-2">취향 큐레이션</h2>
          <p className="text-sm text-black/70 dark:text-white/70">
            태그 기반 탐색 → 추천 → 커뮤니티 → 거래로 이어지는 감성 흐름.
          </p>
        </div>
        <div className="rounded-xl border p-6">
          <h2 className="font-semibold mb-2">콘텐츠 중심의 빈티지</h2>
          <p className="text-sm text-black/70 dark:text-white/70">
            중고거래가 아닌, 감성에 집중한 패션 콘텐츠 & 커뮤니티.
          </p>
        </div>
      </div>
    </section>
  );
}
