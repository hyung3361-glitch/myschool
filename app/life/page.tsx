import Link from "next/link";

export default function SchoolLifePage() {
  const selectedActivities = [
    {
      emoji: "🥾",
      name: "걷기 여행",
      valueTag: "삶의 힘을 기르는 교육",
      summary: "삶의 힘을 기르는 걷기 여행 · [걷기 여행 한 줄 설명]",
    },
    {
      emoji: "🎒",
      name: "테마여행",
      valueTag: "자유의 맛 (선택하고 책임지는 연습)",
      summary: "선택하고 책임지는 연습을 하는 테마여행 · [테마여행 한 줄 설명]",
    },
    {
      emoji: "🏠",
      name: "기숙사 생활",
      valueTag: "사랑의 멋 (나와 이웃 사랑)",
      summary: "나와 이웃을 사랑하며 함께하는 기숙사 생활 · [기숙사 생활 한 줄 설명]",
    },
    {
      emoji: "💬",
      name: "비폭력대화",
      valueTag: "사랑의 멋 (나와 이웃 사랑)",
      summary: "사랑의 멋을 배우고 실천하는 비폭력대화 · [비폭력대화 한 줄 설명]",
    },
    {
      emoji: "🤝",
      name: "마을과 함께",
      valueTag: "대안의 삶 (앎과 삶의 일치)",
      summary: "앎과 삶의 일치를 이루는 마을과 함께 활동 · [마을과 함께 한 줄 설명]",
    },
  ];

  const allActivities = [
    "걷기 여행",
    "몰입주간",
    "인턴십",
    "테마여행",
    "학교화폐·기본소득·콩앗이",
    "아침묵상",
    "마을 청소",
    "기숙사 생활",
    "비폭력대화",
    "마을과 함께",
  ];

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* 상단 제목 영역 */}
      <section className="rounded-3xl bg-white border-2 border-[#2E5A44]/15 p-6 sm:p-10 text-center space-y-3 shadow-xs">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF6DB] border border-[#F4B942] text-xs sm:text-sm font-bold text-[#1F2E25]">
          <span>🌱</span>
          <span>신입생·입학 안내서 · 학교생활</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2E5A44]">
          샬롬자유학교의 학교생활 5가지
        </h1>
        <p className="text-sm sm:text-base text-[#1F2E25]/80 max-w-2xl mx-auto">
          자유의 맛 · 사랑의 멋 · 대안의 삶을 경험하는 대표 활동 카드 5개예요.
        </p>
      </section>

      {/* 활동 카드 5개 (이름 · 한 줄 설명 · 이모지) */}
      <section aria-label="학교생활 활동 카드 5개" className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {selectedActivities.map((activity, idx) => (
          <article
            key={activity.name}
            className={`rounded-3xl bg-white border-2 border-[#2E5A44]/15 p-6 sm:p-7 shadow-xs hover:border-[#2E5A44]/40 transition-all flex flex-col justify-between gap-4 ${
              idx === 4 ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                aria-hidden="true"
                className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#E8F2EC] border border-[#2E5A44]/15 flex items-center justify-center text-3xl sm:text-4xl"
              >
                {activity.emoji}
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#FFF6DB] border border-[#F4B942]/70 text-[#1F2E25]">
                    활동 0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-[#2E5A44]">
                    {activity.valueTag}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F2E25]">
                  {activity.name}
                </h2>
                <p className="text-sm sm:text-base text-[#1F2E25]/85 font-medium leading-relaxed bg-[#FDFBF7] p-3.5 rounded-2xl border border-[#2E5A44]/10">
                  {activity.summary}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* 우리 학교 재료에 있는 전체 학교생활 10개 한눈에 보기 */}
      <section className="rounded-3xl bg-[#E8F2EC]/60 border-2 border-[#2E5A44]/15 p-6 sm:p-8 space-y-4 text-center">
        <h2 className="text-lg sm:text-xl font-extrabold text-[#2E5A44]">
          📚 샬롬자유학교의 다양한 학교생활 (전체 10가지)
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {allActivities.map((item) => {
            const isSelected = selectedActivities.some((a) => a.name === item);
            return (
              <span
                key={item}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border ${
                  isSelected
                    ? "bg-[#2E5A44] text-white border-[#2E5A44]"
                    : "bg-white text-[#1F2E25] border-[#2E5A44]/20"
                }`}
              >
                {item}
              </span>
            );
          })}
        </div>
        <div className="pt-2">
          <Link
            href="/guestbook"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#FFF6DB] border-2 border-[#F4B942] text-[#1F2E25] font-bold text-sm hover:bg-[#F4B942]/30 transition-colors"
          >
            <span>💌 방명록에 응원 글 남기러 가기</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
