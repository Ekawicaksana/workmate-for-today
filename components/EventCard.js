import Link from "next/link";

export default function EventCard({ event }) {
  const d = new Date(event.date);
  const dateStr = d.toLocaleString();
  const current = event.participants?.length || 0;
  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>{event.title}</h3>
        <link className="btn" href={`/events/${event.id}`}>
          Detail
        </link>
      </div>
      <div className="small" style={{ marginTop: 4 }}>
        Kuota: {current}/{event.maxParticipants}{" "}
        {event.desiredBackground
          ? `• Background: ${event.desiredBackground}`
          : ""}
      </div>
    </div>
  );
}
