"use client";
import { useState, useSearchParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword }),
    });

    const text = await res.text();
    setMsg(text);

    if (res.ok) {
      setTimeout(() => router.push("/login"), 1500);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Masukkan Password Baru</h2>
      <input
        type="password"
        placeholder="Password Baru"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit">Reset Password</button>
      <p>{msg}</p>
    </form>
  );
}
