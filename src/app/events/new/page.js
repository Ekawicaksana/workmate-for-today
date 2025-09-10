// src/app/events/new/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const [form, setForm] = useState({
    title: "",
    date: "",
    duration: "",
    location: "",
    maxParticipants: "",
    preferredBackground: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard"); // redirect setelah submit
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-6">Buat Aktivitas WFC/WFA</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Judul"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Durasi (contoh: 3 jam)"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Lokasi (contoh: Kopi Kenangan SCBD)"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="maxParticipants"
          value={form.maxParticipants}
          onChange={handleChange}
          placeholder="Jumlah Maksimal Partisipan"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="preferredBackground"
          value={form.preferredBackground}
          onChange={handleChange}
          placeholder="Background Partisipan (opsional)"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buat Aktivitas
        </button>
      </form>
    </div>
  );
}
