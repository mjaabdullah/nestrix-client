"use client";

import { ArrowRightFromSquare, Gear, Person } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ROLE_COLORS, ROLE_LABELS } from "./DashboardMenus ";

export default function DashboardProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent/5 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent/40"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User menu"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground  text-xs font-semibold">
            <Image
              className="rounded-full"
              src={user?.image}
              width={100}
              height={100}
              alt={user?.name}
            />
          </span>
        </div>
        <div className="hidden sm:flex flex-col items-start leading-none">
          <span className="text-sm font-medium text-foreground">
            {user?.name || "User"}
          </span>
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded mt-0.5 ${
              ROLE_COLORS[user?.role] ||
              "bg-secondary text-secondary-foreground"
            }`}
          >
            {ROLE_LABELS[user?.role] || "User"}
          </span>
        </div>
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          className="text-muted-foreground hidden sm:block ml-1"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            d="M3 5l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-52 bg-background border border-border rounded-lg z-50 overflow-hidden"
          >
            {/* User info header */}
            <div className="px-4 py-3 border-b border-border">
              <p className="text-sm font-semibold text-foreground">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {user?.email || "user@nestrix.com"}
              </p>
            </div>

            {/* Menu items */}
            <div className="py-1">
              <Link href={`/${user?.role}/dashboard/profile`}>
                <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-accent/5 transition-colors duration-150 text-left">
                  <Person
                    width={15}
                    height={15}
                    className="text-muted-foreground"
                  />
                  View Profile
                </button>
              </Link>
              <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-accent/5 transition-colors duration-150 text-left">
                <Gear
                  width={15}
                  height={15}
                  className="text-muted-foreground"
                />
                Settings
              </button>
            </div>

            <div className="border-t border-border py-1">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-accent/5 transition-colors duration-150 text-left"
              >
                <ArrowRightFromSquare
                  width={15}
                  height={15}
                  className="text-muted-foreground"
                />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
