import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();

  try {
    const event = await prisma.event.create({
      data: {
        title: data.title,
        date: new Date(data.date),
        duration: data.duration,
        location: data.location,
        maxParticipants: parseInt(data.maxParticipants),
        preferredBackground: data.preferredBackground,
        // Tambahkan userId jika sudah pakai session user login
      },
    });

    return new Response(JSON.stringify(event), { status: 201 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan saat menyimpan event." }),
      { status: 500 }
    );
  }
}
