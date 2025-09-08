import { cookies } from "next/headers";
import { prisma } from "./db";
import { randomUUID } from "crypto";

const COOKIE_KEY = "wft_user";

export async function getOrCreateUser() {
  const store = cookies();
  const raw = store.get(COOKIE_KEY)?.value;
  if (raw) {
    try {
      const obj = JSON.parse(raw);
      if (obj?.id) {
        // Pastikan user ada
        const user = await prisma.user.findUnique({ where: { id: obj.id } });
        if (user) return user;
      }
    } catch {}
  }
  // Buat user baru dengan nama default (bisa diubah di navbar)
  const id = randomUUID();
  const name = `Guest-${id.substring(0, 6)}`;
  const user = await prisma.user.create({ data: { id, name } });
  store.set(COOKIE_KEY, JSON.stringify({ id: user.id, name: user.name }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return user;
}

export async function updateUserName(newName) {
  const store = cookies();
  const raw = store.get(COOKIE_KEY)?.value;
  if (!raw) return null;
  const obj = JSON.parse(raw);
  const updated = await prisma.user.update({
    where: { id: obj.id },
    data: { name: newName },
  });
  store.set(
    COOKIE_KEY,
    JSON.stringify({ id: updated.id, name: updated.name }),
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    }
  );
  return updated;
}
