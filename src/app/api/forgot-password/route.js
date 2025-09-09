import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return new Response("User tidak ditemukan", { status: 404 });
  }

  const token = randomBytes(32).toString("hex");
  const resetExpires = new Date(Date.now() + 1000 * 60 * 30); // 30 menit

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: token,
      resetExpires,
    },
  });

  // TODO: Kirim email asli menggunakan nodemailer
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
  console.log("Reset password link:", resetLink);

  return new Response("Link reset password dikirim");
}
