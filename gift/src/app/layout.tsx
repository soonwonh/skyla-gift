import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "G’ift: 감성 빈티지 플랫폼",
  description:
    "태그 기반 취향 큐레이션으로 감성 빈티지를 탐색하고 소통하는 공간",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-black/10 dark:bg-black/50 dark:border-white/10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight text-lg">
              G’ift
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/explore" className="hover:underline">
                탐색
              </Link>
              <Link href="/community" className="hover:underline">
                커뮤니티
              </Link>
              <Link href="/closet/sky" className="hover:underline">
                옷장
              </Link>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
        <footer className="border-t border-black/10 dark:border-white/10 py-6 text-center text-sm text-black/60 dark:text-white/60">
          © {new Date().getFullYear()} G’ift
        </footer>
      </body>
    </html>
  );
}
