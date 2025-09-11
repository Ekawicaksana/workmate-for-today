"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Sidebar({ className = "" }) {
  return (
    <aside
      className={`flex flex-col justify-between h-screen p-6 bg-blue-50 border-r-4 border-blue-300 ${className}`}
    >
      <div>
        <nav className="flex flex-col space-y-4 text-gray-700">
          <Link href="/dashboard/session">Your Session</Link>
          <Link href="/dashboard/group-chat">Group Chat</Link>
          <Link href="/dashboard/history">Session History</Link>
          <Link href="/dashboard/profile">Profile</Link>
        </nav>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-10 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 text-sm"
      >
        Log Out
      </button>
    </aside>
  );
}
