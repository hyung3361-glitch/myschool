import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "샬롬자유학교 소개 | 신입생·입학 환영 안내서",
  description: "하나님의 형상을 회복하고 삶의 힘을 기르는 교육 - 샬롬자유학교",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FDFBF7] text-[#1F2E25]">
        {/* 모든 페이지 위쪽에 같은 메뉴 */}
        <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur border-b border-[#2E5A44]/15 shadow-xs">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <img
                src="/logo.jpg"
                alt="샬롬자유학교 로고"
                className="h-10 w-auto rounded-lg object-contain bg-white p-0.5 border border-[#2E5A44]/15"
              />
              <div>
                <span className="block text-lg sm:text-xl font-extrabold tracking-tight text-[#2E5A44] group-hover:text-[#214231] transition-colors">
                  샬롬자유학교
                </span>
                <span className="block text-xs text-[#2E5A44]/75 font-medium">
                  이왕이면 샬자~ · 샬롬!
                </span>
              </div>
            </Link>

            <nav
              aria-label="주요 메뉴"
              className="flex items-center gap-1.5 sm:gap-2"
            >
              <Link
                href="/"
                className="px-3.5 py-2 rounded-full text-sm sm:text-base font-bold text-[#1F2E25] hover:bg-[#E8F2EC] hover:text-[#2E5A44] transition-colors"
              >
                🏠 홈
              </Link>
              <Link
                href="/life"
                className="px-3.5 py-2 rounded-full text-sm sm:text-base font-bold text-[#1F2E25] hover:bg-[#E8F2EC] hover:text-[#2E5A44] transition-colors"
              >
                🌱 학교생활
              </Link>
              <Link
                href="/guestbook"
                className="px-3.5 py-2 rounded-full text-sm sm:text-base font-bold bg-[#2E5A44] text-white hover:bg-[#214231] transition-colors shadow-xs"
              >
                💌 방명록
              </Link>
            </nav>
          </div>
        </header>

        {/* 본문 영역 */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {children}
        </main>

        {/* 맨 아래 고정 안내 문구 */}
        <footer className="mt-auto border-t border-[#2E5A44]/15 bg-[#F5F1E8] py-6 px-4 text-center">
          <div className="max-w-5xl mx-auto text-xs sm:text-sm text-[#1F2E25]/80 font-medium leading-relaxed">
            학생 실습으로 만든 사이트예요 (공식 홈페이지 아님) · 공식 홈페이지:{" "}
            <a
              href="https://www.shalomfree.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold text-[#2E5A44] hover:text-[#214231]"
            >
              shalomfree.kr
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
