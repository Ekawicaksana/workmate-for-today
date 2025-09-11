"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((r) => r.json())
      .then((all) => setEvent(data))
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
            {event.participants?.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold">Peserta yang Bergabung:</h4>
                <ul className="list-disc list-inside text-sm">
                  {event.participants.map((user) => (
                    <li key={user.id}>{user.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {event.desiredBackground && (
            <div className="small" style={{ marginTop: 4 }}>
              Background diinginkan: {event.desiredBackground}
            </div>
          )}
          <div style={{ marginTop: 16 }}>
            {session?.user ? (
              <button className="btn" onClick={join} disabled={joining}>
                {joining ? "Memproses..." : "Gabung Event"}
              </button>
            ) : (
              <p className="text-sm text-red-500 mt-2">
                Silakan login terlebih dahulu untuk bergabung
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
