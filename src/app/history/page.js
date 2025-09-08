import { prisma } from "../../../lib/db";
import { getOrCreateUser } from "../../../lib/session";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const user = await getOrCreateUser();

  const created = await prisma.event.findMany({
    where: { createdById: user.id },
    orderBy: { date: "desc" },
    include: { participants: true },
  });
  const joined = await prisma.participation.findMany({
    where: { userId: user.id },
    include: { event: { include: { participants: true } } },
    orderBy: { joinedAt: "desc" },
  });

  return (
    <div className="grid">
      <div className="col-12">
        <h2>History</h2>
        <div className="small">
          User: <b>{user.name}</b>
        </div>
      </div>

      <div className="col-12">
        <h3>Event yang Dibuat ({created.length})</h3>
        <div className="stack">
          {created.length === 0 && <div className="card">Belum ada.</div>}
          {created.map((e) => (
            <div className="card" key={e.id}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <b>{e.title}</b>
                  <div className="small">
                    {new Date(e.date).toLocaleString()} • {e.locationName}
                  </div>
                </div>
                <div className="small">
                  {(e.participants || []).length}/{e.maxParticipants}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12" style={{ marginTop: 24 }}>
        <h3>Event yang Diikuti ({joined.length})</h3>
        <div className="stack">
          {joined.length === 0 && <div className="card">Belum ada.</div>}
          {joined.map((j) => (
            <div className="card" key={j.id}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <b>{j.event.title}</b>
                  <div className="small">
                    {new Date(j.event.date).toLocaleString()} •{" "}
                    {j.event.locationName}
                  </div>
                </div>
                <div className="small">
                  {(j.event.participants || []).length}/
                  {j.event.maxParticipants}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
