import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { getOrCreateUser } from "../../../../lib/session";

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    include: { participants: true },
  });
  return NextResponse.json(events);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const user = await getOrCreateUser();

    // Validasi minimal
    const required = [
      "title",
      "date",
      "durationMinutes",
      "locationName",
      "maxParticipants",
    ];
    for (const k of required)
      if (!body[k])
        return NextResponse.json(
          { error: `${k} wajib diisi` },
          { status: 400 }
        );

    const created = await prisma.event.create({
      data: {
        title: String(body.title).slice(0, 120),
        date: new Date(body.date),
        durationMinutes: Number(body.durationMinutes),
        locationName: String(body.locationName).slice(0, 120),
        locationAddress: body.locationAddress
          ? String(body.locationAddress).slice(0, 240)
          : null,
        maxParticipants: Math.max(2, Number(body.maxParticipants)),
        desiredBackground: body.desiredBackground
          ? String(body.desiredBackground).slice(0, 160)
          : null,
        createdById: user.id,
      },
    });

    return NextResponse.json({ id: created.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
