"use client";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <Link href="/">
          <b>Workmate for Today</b>
        </Link>
        <nav className="nav-links">
          <Link href="/events/new">Buat WFC/WFA</Link>
          <Link href="/history">History</Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            style={{
              background: "transparent",
              border: "none",
              color: "blue",
              cursor: "pointer",
              marginLeft: "1rem",
            }}
          >
            Login
          </button>
        </nav>
      </div>
    </div>
  );
}
