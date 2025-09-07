G’ift: 감성 빈티지 플랫폼
================================

의미: ‘Gift(선물)’ + 감탄사 ‘G’ → 선물처럼 소중한 감성 빈티지를 전하겠다는 의미.

주요 플로우: 태그 기반 탐색 → 추천 → 커뮤니티 → 거래로 이어지는 감성 흐름.

기능 요약
---------
- 랜딩: 브랜드 메시지, 주요 네비게이션
- 탐색(`/explore`): 태그 필터로 아이템 탐색
- 아이템(`/item/[id]`): 상세, 판매자, 태그, 연관 추천
- 커뮤니티(`/community`): 포스트 피드, 포스트 상세(`/community/[id]`)
- 옷장(`/closet/[username]`): 유저 옷장/아이템 모아보기

빠른 시작
---------
1) 설치 및 DB 마이그레이션/시드

```bash
cd /workspace/gift
npm install
npx prisma migrate dev --name init
npm run seed
```

2) 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 방문

기술 스택
---------
- Next.js 15 (App Router, TypeScript, Tailwind v4)
- Prisma + SQLite (개발용)

개발 메모
---------
- Prisma Client 경로: `src/generated/prisma`
- Prisma Helper: `src/lib/prisma.ts`
- 시드: `prisma/seed.ts`
