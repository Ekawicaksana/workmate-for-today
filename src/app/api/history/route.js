import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";
import { getOrCreateUser } from "../../../lib/session";

export async function GET() {
  const user = await getOrCreateUser();
  const created = await prisma.event.findMany({
    where: { createdById: user.id },
    orderBy: { date: "desc" },
    include: { participants: true },
  });
  const joined = await prisma.participation.findMany({
    where: { userId: user.id },
    include: { event: { include: { participants: true } } },
    orderBy: { joinedAt: "desc" },
  });
  return NextResponse.json({ user, created, joined });
}
