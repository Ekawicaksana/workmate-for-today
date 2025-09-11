"use client";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({ children }) {
  return (
    <SessionProvider>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-800 font-sans">
        <div className="w-[1100px] h-[900px] bg-white border-2 border-gray-300 rounded-xl shadow-lg flex overflow-hidden">
          <Sidebar className="w-72 h-full bg-white border-r border-l-black rounded-l-xl shadow-md" />
          <div className="flex flex-col flex-1 min-h-full p-10">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-start gap-8">
              {children}
            </main>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
