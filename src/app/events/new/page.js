"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function newEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setform] = useState({
    title: "Ngantor di Kafe",
    date: "",
    durationMinutes: 120,
    locationName: "",
    locationAddress: "",
    maxParticipants: 4,
    desiredBackground: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const out = await res.json();
    setLoading(false);
    if (res.ok) router.push(`/events/${out.id}`);
    else alert(out.error || "Gagal menyimpan");
  };

  const set = (k) => (e) => setform({ ...form, [k]: e.target.value });

  return (
    <div className="grid">
      <div className="col-12">
        <h2>Buat WFC/WFA</h2>
      </div>
      <div className="col-12">
        <form className="card stack" onSubmit={submit}>
          <div className="stack">
            <label className="label">Judul</label>
            <input
              className="input"
              value={form.title}
              onChange={set("title")}
              required
            />
          </div>
          <div className="grid">
            <div className="col-6 stack">
              <label className="label">Tanggal & waktu</label>
              <input
                className="input"
                type="datetime-local"
                value={form.date}
                onChange={set("date")}
                required
              />
            </div>
            <div className="col-6 stack">
              <label className="label">Durasi (menit)</label>
              <input
                className="input"
                type="number"
                min="30"
                step="15"
                value={form.durationMinutes}
                onChange={set("durationMinutes")}
                required
              />
            </div>
          </div>
          <div className="grid">
            <div className="col-6 stack">
              <label className="label">Nama Lokasi</label>
              <input
                className="input"
                value={form.locationName}
                onChange={set("locationName")}
                required
              />
            </div>
            <div className="col-6 stack">
              <label className="label">Alamat (opsional)</label>
              <input
                className="input"
                value={form.locationAddress}
                onChange={set("locationAddress")}
              />
            </div>
          </div>
          <div className="grid">
            <div className="col-6 stack">
              <label className="label">Maks. Partisipan</label>
              <input
                className="input"
                type="number"
                min="2"
                max="50"
                value={form.maxParticipants}
                onChange={set("maxParticipants")}
                required
              />
            </div>
            <div className="col-6 stack">
              <label className="label">Background diinginkan (opsional)</label>
              <input
                className="input"
                placeholder="Developer, Designer, dsb."
                value={form.desiredBackground}
                onChange={set("desiredBackground")}
              />
            </div>
          </div>
          <div>
            <button disabled={loading} className="btn" type="submit">
              {loading ? "Menyimpan..." : "Publish Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
