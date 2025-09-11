"use client";

import { useSession } from "next-auth/react";
import CreateButton from "./CreateButton";

export default function Header() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "";

  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex justify-between items-center px-8 py-6 border-b-4 border-blue-300 bg-blue-50 shadow-md">
      <div>
        <h1 className="text-2xl font-bold mb-1">Hello, {userName}</h1>
        <p className="text-base text-gray-600">{currentDate}</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="border px-4 py-2 rounded hover:bg-gray-100 text-sm font-medium">
          Location
        </button>
        <div>
          <link href="/dashboard/events/new" />
          <button
            className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-lg hover:opacity-90"
            aria-label="Create"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
