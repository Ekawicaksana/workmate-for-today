export default function Sidebar() {
  return (
    <div className="w-1/5 h-full bg-white border-r p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-6">Workmate For Today</h1>
        <ul className="space-y-3">
          <li>Your Session</li>
          <li>Group Chat</li>
          <li>Session History</li>
          <li>Profile</li>
        </ul>
      </div>
      <button className="mt-4 border p-2 rounded">Log Out</button>
    </div>
  );
}
