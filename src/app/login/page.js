"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      ...form,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>

      <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        Login with Google
      </button>
    </>
  );
}
