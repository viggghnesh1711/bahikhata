"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logoutbutton from "./Logoutbutton";

function Sidebar() {
  const pathname = usePathname(); // get current route

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/customers", label: "All Customers" },
    { href: "/dashboard/new-customer", label: "New Customers" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <div className="flex flex-col h-screen w-64 bg-stone-100 text-stone-900 shadow-md">
      {/* Top Section */}
      <div className="p-4 text-lg font-semibold border-b border-stone-300">
        COUNTERR
      </div>

      <nav className="flex-1 flex flex-col gap-3 p-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "hover:text-stone-600"
                }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-stone-300">
        <Logoutbutton />
      </div>
    </div>
  );
}

export default Sidebar;
