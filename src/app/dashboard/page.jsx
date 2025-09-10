import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Stats from "./components/Stats";
import NearbySessions from "./components/NearbySessions";
import UserCalendar from "./components/Calendar";
import CreateButton from "./components/CreateButton";
import LocationButton from "./components/LocationButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Header name="Eka Wicaksana Putra" />
        <div className="flex-1 p-6 bg-gray-100 overflow-auto">
          <CreateButton />
          <LocationButton />
        </div>
        <Stats />
        <div>
          <UserCalendar />
          <NearbySessions />
        </div>
      </main>
    </div>
  );
}
