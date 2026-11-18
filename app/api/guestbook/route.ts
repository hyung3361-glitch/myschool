import { NextResponse, connection } from "next/server";

export interface GuestbookEntry {
  id: number;
  nickname: string;
  message: string;
  createdAt: string;
}

interface SupabaseGuestbookRow {
  id: number;
  nickname: string;
  message: string;
  created_at: string;
}

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://eznzxnemfbsmesdcavhk.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6bnp4bmVtZmJzbWVzZGNhdmhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5NzM3NTYsImV4cCI6MjExMDU0OTc1Nn0.yk4WyMbcyGa3unVkMmIi-zJkeUjFl_8QwbA4jZgZ-9E";

function formatKST(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return isoDate;
    const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    const yyyy = kst.getUTCFullYear();
    const mm = String(kst.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(kst.getUTCDate()).padStart(2, "0");
    const hh = String(kst.getUTCHours()).padStart(2, "0");
    const min = String(kst.getUTCMinutes()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
  } catch {
    return isoDate;
  }
}

async function fetchGuestbookFromSupabase(): Promise<GuestbookEntry[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/guestbook?select=id,nickname,message,created_at&order=created_at.desc`,
    {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Supabase 조회 실패 (${res.status}): ${errText}`);
  }

  const rows: SupabaseGuestbookRow[] = await res.json();
  return rows.map((row) => ({
    id: row.id,
    nickname: row.nickname,
    message: row.message,
    createdAt: formatKST(row.created_at),
  }));
}

export async function GET() {
  await connection();
  try {
    const entries = await fetchGuestbookFromSupabase();
    return NextResponse.json({ entries });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "방명록을 불러오는 중 오류가 발생했어요.", entries: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nickname =
      typeof body?.nickname === "string" ? body.nickname.trim() : "";
    const message =
      typeof body?.message === "string" ? body.message.trim() : "";

    if (!nickname || !message) {
      return NextResponse.json(
        { error: "닉네임과 응원 글을 모두 입력해 주세요." },
        { status: 400 }
      );
    }

    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/guestbook`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        nickname: nickname.slice(0, 20),
        message: message.slice(0, 300),
      }),
    });

    if (!insertRes.ok) {
      const errText = await insertRes.text();
      console.error("Supabase INSERT 오류:", errText);
      return NextResponse.json(
        { error: "방명록을 DB에 저장하지 못했어요." },
        { status: 500 }
      );
    }

    const entries = await fetchGuestbookFromSupabase();
    return NextResponse.json({ entries }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "방명록을 저장하는 중 오류가 발생했어요." },
      { status: 500 }
    );
  }
}
