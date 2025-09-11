import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/db";
import { getOrCreateUser } from "../../../../../../lib/session";

export async function POST(_req, { params }) {
  try {
    const user = await getOrCreateUser();
    const id = params.id;
    const event = await prisma.event.findUnique({
      where: { id },
      include: { participants: true },
    });
    if (!event)
      return NextResponse.json(
        { error: "Event tidak ditemukan" },
        { status: 404 }
      );

    const alreadyJoined = event.participants.some((p) => p.userId === user.id);
    if (alreadyJoined) {
      return NextResponse.json(
        { error: "Anda sudah bergabung" },
        { status: 400 }
      );
    }

    if (event.participants.length >= event.maxParticipants) {
      return NextResponse.json({ error: "Kuota penuh" }, { status: 400 });
    }

    await prisma.participation.create({
      data: { eventId: id, userId: user.id },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e?.code === "P2002") {
      return NextResponse.json(
        { error: "Anda sudah bergabung" },
        { status: 400 }
      );
    }
    console.error(e);
    return NextResponse.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}
