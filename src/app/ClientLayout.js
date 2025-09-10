"use client";
import Navbar from "../../components/Navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith("/dashboard");

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="container">{children}</div>
    </>
  );
}
