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
    <div>
      <Stats />
      <UserCalendar />
      <NearbySessions />
    </div>
  );
}
