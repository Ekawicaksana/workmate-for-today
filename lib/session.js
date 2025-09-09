import { headers } from "next/headers";

export async function getOrCreateUser() {
  const host = headers().get("host");
  const isProd = process.env.NODE_ENV === "production";
  const base = (isProd ? "https://" : "http://") + host;

  const res = await fetch(`${base}/api/session`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to init session");
  const { user } = await res.json();
  return user;
}
