import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  // ✅ Izinkan akses ke API auth, login, register, favicon, public files
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // ✅ Jika halaman terproteksi dan belum login, redirect ke /login
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// ✅ Tentukan matcher agar middleware hanya aktif di path tertentu
export const config = {
  matcher: ["/dashboard/:path*", "/create/:path*", "/api/event/join"], // atau sesuaikan
};
