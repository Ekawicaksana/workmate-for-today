"use client";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    setMsg(await res.text());
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Lupa Password?</h2>
      <input
        placeholder="Masukkan email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Kirim Link Reset</button>
      <p>{msg}</p>
    </form>
  );
}
