import { NextResponse } from "next/server";

export async function POST(req) {
  // Stub sederhana: menerima preferensi, mengembalikan list contoh.
  // Nanti bisa diganti dengan OpenAI + Google Places.
  const { city = "Jakarta", preferences = [] } = await req.json();
  const sample = [
    {
      name: "Kopi Asik Sudirman",
      address: "Sudirman, Jakarta",
      wifi: true,
      outlets: true,
      vibe: "ramai",
    },
    {
      name: "CoWork Kemang",
      address: "Kemang, Jakarta",
      wifi: true,
      outlets: true,
      vibe: "tenang",
    },
    {
      name: "Cafe Fokus BSD",
      address: "BSD, Tangerang",
      wifi: true,
      outlets: false,
      vibe: "tenang",
    },
  ];
  // Filter kasar by vibe
  const picks = preferences.includes("tenang")
    ? sample.filter((s) => s.vibe === "tenang")
    : sample;
  return NextResponse.json({ city, recommendations: picks });
}
