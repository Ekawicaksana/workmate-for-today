import Link from "next/link";
import { prisma } from "../../lib/db";
import EventCard from "../../components/EventCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    include: { participants: true },
  });
  return (
    <>
      <section className="hero">
        <h1>Kerja bareng hari ini?</h1>
        <p>
          Umumkan WFC/WFA, ajak teman, dan bangun ritme kerja bareng komunitas.
        </p>
        <Link className="btn" href="/login">
          + Buat WFC/WFA
        </Link>
      </section>
      <div className="grid">
        <div className="col-12">
          <h2>Event Terbuka</h2>
          <div className="stack">
            {events.length === 0 && (
              <div className="card">Belum ada event. Yuk buat pertama!</div>
            )}
            {events.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
