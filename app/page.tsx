import Link from "next/link";

export default function HomePage() {
  const coreValues = [
    {
      emoji: "🌱",
      title: "자유의 맛",
      description: "선택하고 책임지는 연습",
      badge: "핵심 가치 01",
    },
    {
      emoji: "💛",
      title: "사랑의 멋",
      description: "하나님, 나와 이웃, 자연 사랑",
      badge: "핵심 가치 02",
    },
    {
      emoji: "🧭",
      title: "대안의 삶",
      description: "앎과 삶의 일치",
      badge: "핵심 가치 03",
    },
  ];

  const yearFlow = [
    {
      term: "1학기",
      keyword: "기초",
      emoji: "🌿",
      note: "[1학기 기초 세부 안내]",
    },
    {
      term: "2학기",
      keyword: "방향",
      emoji: "☀️",
      note: "[2학기 방향 세부 안내]",
    },
    {
      term: "3학기",
      keyword: "대안",
      emoji: "🌳",
      note: "[3학기 대안 세부 안내]",
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 가운데 정렬된 환영 배너 */}
      <section className="relative overflow-hidden rounded-3xl bg-white border-2 border-[#2E5A44]/15 shadow-sm px-6 py-10 sm:px-12 sm:py-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF6DB] border border-[#F4B942] text-[#1F2E25] text-sm font-bold mb-6">
          <span>👋</span>
          <span>신입생·입학 환영 안내서 · 이왕이면 샬자~ (샬롬!)</span>
        </div>

        <div className="flex justify-center mb-6">
          <img
            src="/logo.jpg"
            alt="샬롬자유학교 로고"
            className="h-24 sm:h-28 w-auto object-contain rounded-2xl border border-[#2E5A44]/15 p-2 bg-white shadow-xs"
          />
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2E5A44] tracking-tight mb-4">
          샬롬자유학교
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-2xl font-bold text-[#1F2E25] leading-relaxed bg-[#E8F2EC]/70 rounded-2xl px-5 py-4 border border-[#2E5A44]/15">
          &ldquo;하나님의 형상을 회복하고 삶의 힘을 기르는 교육&rdquo;
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/life"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#2E5A44] text-white font-bold text-base hover:bg-[#214231] transition-colors shadow-xs"
          >
            <span>🌱 학교생활 둘러보기</span>
            <span>→</span>
          </Link>
          <Link
            href="/guestbook"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FFF6DB] text-[#1F2E25] border-2 border-[#F4B942] font-bold text-base hover:bg-[#F4B942]/30 transition-colors"
          >
            <span>💌 방명록에 응원 남기기</span>
          </Link>
        </div>
      </section>

      {/* 핵심 가치 3열 카드 */}
      <section aria-labelledby="values-heading" className="space-y-6">
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-[#E8F2EC] text-[#2E5A44] text-xs font-extrabold tracking-wider">
            CORE VALUES
          </span>
          <h2
            id="values-heading"
            className="text-2xl sm:text-3xl font-extrabold text-[#2E5A44]"
          >
            우리 학교의 3가지 핵심 가치
          </h2>
          <p className="text-sm sm:text-base text-[#1F2E25]/75">
            샬롬자유학교가 처음인 분들을 위해 소개하는 세 가지 마음가짐이에요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {coreValues.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white border-2 border-[#2E5A44]/15 p-6 sm:p-7 shadow-xs hover:border-[#2E5A44]/40 transition-all flex flex-col items-center text-center"
            >
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#FFF6DB] text-[#1F2E25] border border-[#F4B942]/60 mb-4">
                {item.badge}
              </span>
              <div className="text-4xl sm:text-5xl mb-4" aria-hidden="true">
                {item.emoji}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#2E5A44] mb-2">
                {item.title}
              </h3>
              <p className="text-base sm:text-lg font-semibold text-[#1F2E25] bg-[#FDFBF7] w-full py-3 px-4 rounded-2xl border border-[#2E5A44]/10">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 1→2→3학기 화살표 타임라인 */}
      <section
        aria-labelledby="timeline-heading"
        className="rounded-3xl bg-[#E8F2EC]/60 border-2 border-[#2E5A44]/15 p-6 sm:p-10 space-y-8"
      >
        <div className="text-center space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-white text-[#2E5A44] text-xs font-extrabold tracking-wider border border-[#2E5A44]/15">
            1 YEAR FLOW
          </span>
          <h2
            id="timeline-heading"
            className="text-2xl sm:text-3xl font-extrabold text-[#2E5A44]"
          >
            한눈에 보는 1년 흐름
          </h2>
          <p className="text-sm sm:text-base text-[#1F2E25]/80 font-medium">
            1학기 기초 → 2학기 방향 → 3학기 대안으로 이어지는 배움의 여정
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          {yearFlow.map((step, index) => (
            <div key={step.term} className="relative flex flex-col">
              <div className="flex-1 rounded-2xl bg-white border-2 border-[#2E5A44]/20 p-6 text-center shadow-xs flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF6DB] border border-[#F4B942] flex items-center justify-center text-2xl mb-3">
                  {step.emoji}
                </div>
                <span className="text-xs font-extrabold text-[#2E5A44] uppercase tracking-wider">
                  {step.term}
                </span>
                <h3 className="text-2xl font-extrabold text-[#1F2E25] mt-1">
                  {step.term} {step.keyword}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#1F2E25]/60 font-medium">
                  {step.note}
                </p>
              </div>

              {index < yearFlow.length - 1 && (
                <>
                  {/* 데스크톱 화살표 */}
                  <div
                    aria-hidden="true"
                    className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#F4B942] text-[#1F2E25] font-extrabold items-center justify-center shadow-xs"
                  >
                    →
                  </div>
                  {/* 모바일 화살표 */}
                  <div
                    aria-hidden="true"
                    className="flex md:hidden justify-center my-2 text-[#2E5A44] font-extrabold text-xl"
                  >
                    ↓
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
