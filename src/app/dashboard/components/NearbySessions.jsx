"use client";

import { useEffect, useState } from "react";

export default function NearbySessions() {
  const [location, setLocation] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(coords);

        // Kirim request ke backend untuk fetch session terdekat
        const res = await fetch(`/api/events/nearby`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(coords),
        });

        const data = await res.json();
        setSessions(data);
        setLoading(false);
      });
    } else {
      alert("Geolocation tidak didukung browser kamu.");
      setLoading(false);
    }
  }, []);

  if (loading) return <p>🔍 Mencari sesi terdekat...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-3">Sesi WFC/WFA di Sekitarmu</h2>
      {sessions.length === 0 ? (
        <p>Tidak ada sesi ditemukan dekat lokasimu.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((event) => (
            <li
              key={event.id}
              className="border p-4 rounded-md shadow flex flex-col gap-2"
            >
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm">{event.location}</p>
              <p className="text-sm text-gray-600">{event.date}</p>
              <p className="text-sm text-gray-600">
                Jarak: {event.distance.toFixed(2)} km
              </p>
              {event.alreadyJoined ? (
                <span className="text-green-600 font-medium">
                  ✅ Kamu sudah join
                </span>
              ) : (
                <button
                  className="mt-2 border px-4 py-2 rounded hover:bg-gray-100 text-sm self-start"
                  onClick={async () => {
                    const res = await fetch(`/api/events/join`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ eventId: event.id }),
                    });

                    if (res.ok) {
                      alert("Berhasil bergabung ke sesi!");
                      window.location.reload(); // refresh untuk ambil status terbaru
                    } else {
                      const error = await res.json();
                      alert(`Gagal join: ${error.message}`);
                    }
                  }}
                >
                  Join Session
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
