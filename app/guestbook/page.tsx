"use client";

import { useEffect, useState, FormEvent } from "react";

interface GuestbookEntry {
  id: number;
  nickname: string;
  message: string;
  createdAt: string;
}

export default function GuestbookPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function fetchEntries() {
    try {
      setLoading(true);
      const res = await fetch("/api/guestbook", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries ?? []);
      }
    } catch {
      setErrorMsg("방명록 목록을 불러오지 못했어요.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!nickname.trim() || !message.trim()) {
      setErrorMsg("닉네임과 응원 글을 모두 입력해 주세요!");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "등록 중 문제가 발생했어요.");
        return;
      }

      setEntries(data.entries ?? []);
      setNickname("");
      setMessage("");
    } catch {
      setErrorMsg("서버와 통신하는 중 문제가 발생했어요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-10">
      {/* 상단 안내 배너 */}
      <section className="rounded-3xl bg-white border-2 border-[#2E5A44]/15 p-6 sm:p-10 text-center space-y-3 shadow-xs">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF6DB] border border-[#F4B942] text-xs sm:text-sm font-bold text-[#1F2E25]">
          <span>💌</span>
          <span>모두 함께 보는 Supabase DB 방명록</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2E5A44]">
          샬롬자유학교 응원 방명록
        </h1>
        <p className="text-sm sm:text-base text-[#1F2E25]/80 max-w-xl mx-auto">
          &ldquo;이왕이면 샬자~&rdquo; 닉네임과 따뜻한 응원 글을 남기면 데이터베이스(DB)에 영구 저장되어 모두가 함께 볼 수 있어요!
        </p>
      </section>

      {/* 방명록 작성 폼 */}
      <section className="rounded-3xl bg-[#E8F2EC]/70 border-2 border-[#2E5A44]/20 p-6 sm:p-8 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label
                htmlFor="nickname"
                className="block text-sm font-extrabold text-[#2E5A44] mb-1.5"
              >
                👤 닉네임 (실명 대신 별명)
              </label>
              <input
                id="nickname"
                type="text"
                maxLength={20}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="예: 새싹신입생"
                className="w-full rounded-2xl bg-white border-2 border-[#2E5A44]/20 px-4 py-3 text-sm sm:text-base font-medium text-[#1F2E25] focus:outline-none focus:border-[#2E5A44]"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-extrabold text-[#2E5A44] mb-1.5"
              >
                💬 응원 글 한마디
              </label>
              <input
                id="message"
                type="text"
                maxLength={300}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="이왕이면 샬자~ 샬롬자유학교를 응원합니다!"
                className="w-full rounded-2xl bg-white border-2 border-[#2E5A44]/20 px-4 py-3 text-sm sm:text-base font-medium text-[#1F2E25] focus:outline-none focus:border-[#2E5A44]"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-sm font-bold text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
              ⚠️ {errorMsg}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <span className="text-xs text-[#1F2E25]/70 font-medium">
              * 개인정보 보호를 위해 실제 이름이나 전화번호는 적지 마세요.
            </span>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-2xl bg-[#2E5A44] text-white font-bold text-sm sm:text-base hover:bg-[#214231] disabled:opacity-50 transition-colors cursor-pointer shadow-xs"
            >
              {submitting ? "남기는 중..." : "✨ 응원 글 등록하기"}
            </button>
          </div>
        </form>
      </section>

      {/* 방명록 목록 */}
      <section aria-label="응원 글 목록" className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#2E5A44]">
            🌱 남겨진 응원 글 ({entries.length}개)
          </h2>
          <button
            type="button"
            onClick={fetchEntries}
            className="text-xs sm:text-sm font-bold text-[#2E5A44] hover:underline cursor-pointer"
          >
            🔄 새로고침
          </button>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white border-2 border-[#2E5A44]/15 p-8 text-center text-[#1F2E25]/70 font-semibold">
            방명록을 불러오는 중이에요...
          </div>
        ) : entries.length === 0 ? (
          <div className="rounded-3xl bg-white border-2 border-[#2E5A44]/15 p-8 text-center text-[#1F2E25]/70 font-semibold">
            아직 남겨진 응원 글이 없어요. 첫 번째 응원 글을 남겨보세요!
          </div>
        ) : (
          <div className="space-y-3.5">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-2xl bg-white border-2 border-[#2E5A44]/15 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#FFF6DB] border border-[#F4B942] text-xs font-extrabold text-[#1F2E25]">
                      <span>🌟</span>
                      <span>{entry.nickname}</span>
                    </span>
                    <span className="text-xs text-[#1F2E25]/55 font-medium">
                      {entry.createdAt}
                    </span>
                  </div>
                  <p className="text-base font-semibold text-[#1F2E25] leading-relaxed pl-1">
                    {entry.message}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
