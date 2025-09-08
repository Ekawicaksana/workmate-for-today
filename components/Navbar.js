"use client";
import Link from "next/link";
import { useState } from "react";

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
        </nav>
      </div>
    </div>
  );
}
