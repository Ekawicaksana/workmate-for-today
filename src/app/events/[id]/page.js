"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetch(`/api/events`)
      .then((r) => r.json())
      .then((all) => setEvent(all.find((x) => x.id === id)))
      .finally(() => setLoading(false));
  }, [id]);

  const join = async () => {
    setJoining(true);
    const res = await fetch(`/api/events/${id}/join`, { method: "POST" });
    setJoining(false);
    if (res.ok) {
      alert("Berhasil bergabung");
      router.refresh();
      // Reload event data
      const all = await (await fetch(`/api/events`)).json();
      setEvent(all.find((x) => x.id === id));
    } else {
      const out = await res.json();
      alert(out.error || "Gagal bergabung");
    }
  };

  if (loading) return <div>Memuat...</div>;
  if (!event) return <div>Event tidak ditemukan</div>;

  const d = new Date(event.date).toLocaleString();
  const count = (event.participants || []).length;

  return (
    <div className="grid">
      <div className="col-12">
        <h2>{event.title}</h2>
      </div>
      <div className="col-12">
        <div className="card">
          <div className="small">
            {d} • {event.durationMinutes} menit
          </div>
          <div style={{ marginTop: 8 }}>
            Lokasi: <b>{event.locationName}</b>
            {event.locationAddress ? `, ${event.locationAddress}` : ""}
          </div>
          <div className="small" style={{ marginTop: 4 }}>
            Kuota: {count}/{event.maxParticipants}
          </div>
          {event.desiredBackground && (
            <div className="small" style={{ marginTop: 4 }}>
              Background diinginkan: {event.desiredBackground}
            </div>
          )}
          <div style={{ marginTop: 16 }}>
            <button className="btn" onClick={join} disabled={joining}>
              {" "}
              {joining ? "Memproses..." : "Gabung Event"}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
