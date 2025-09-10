"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-10">Workmate For Today</h1>
        <nav className="flex flex-col gap-4">
          <Link
            href="/dashboard/session"
            className="text-gray-800 hover:underline"
          >
            Your Session
          </Link>
          <Link
            href="/dashboard/chat"
            className="text-gray-800 hover:underline"
          >
            Group Chat
          </Link>
          <Link
            href="/dashboard/history"
            className="text-gray-800 hover:underline"
          >
            Session History
          </Link>
          <Link
            href="/dashboard/profile"
            className="text-gray-800 hover:underline mt-8"
          >
            Profile
          </Link>
        </nav>
      </div>
      <button className="mt-10 w-full py-2 text-sm border rounded hover:bg-gray-100">
        Log Out
      </button>
    </aside>
  );
}
