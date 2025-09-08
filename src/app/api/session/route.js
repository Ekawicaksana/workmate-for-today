import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createGuestUser, findUserById } from "../../../../lib/user";

const COOKIE_KEY = "wft_user";

export async function GET() {
  const store = cookies();
  const raw = store.get(COOKIE_KEY)?.value;

  if (raw) {
    try {
      const obj = JSON.parse(raw);
      if (obj?.id) {
        const user = await findUserById(obj.id);
        if (user) {
          return NextResponse.json({ user });
        }
      }
    } catch {}
  }

  const user = await createGuestUser();

  const res = NextResponse.json({ user });
  res.cookies.set(
    COOKIE_KEY,
    JSON.stringify({ id: user.id, name: user.name }),
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV === "production",
    }
  );
  return res;
}
