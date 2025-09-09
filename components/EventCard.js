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
        <Link href={`/events/${event.id}`}>
          <span className="btn">Detail</span>
        </Link>
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
