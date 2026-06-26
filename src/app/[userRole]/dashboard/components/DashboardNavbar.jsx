"use client";

import { Bars, Bell, MagnifierPlus, Moon } from "@gravity-ui/icons";
import { motion } from "framer-motion";
import DashboardBreadcrumb from "./DashboardBreadCrumb";
import DashboardProfileDropdown from "./DashboardProfileDropdown";

export default function DashboardNavbar({ user, onLogout, onMenuToggle }) {
  return (
    <motion.header
      className="sticky top-0 z-30 bg-background border-b border-border h-14 flex items-center px-4 lg:px-6 gap-4"
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      role="banner"
    >
      {/* Mobile hamburger */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent/5 transition-colors text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
        aria-label="Open navigation menu"
      >
        <Bars width={18} height={18} />
      </button>

      {/* Breadcrumb */}
      <div className="flex-1 min-w-0">
        <DashboardBreadcrumb />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Search placeholder */}
        <button
          className="flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent/40"
          aria-label="Search"
        >
          <MagnifierPlus width={17} height={17} />
        </button>

        {/* Notifications */}
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent/40"
          aria-label="Notifications"
        >
          <Bell width={17} height={17} />
          {/* Unread indicator */}
          <span
            className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
        </button>

        {/* Theme toggle placeholder */}
        <button
          className="flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent/40"
          aria-label="Toggle theme"
        >
          <Moon width={17} height={17} />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-border mx-1" aria-hidden="true" />

        {/* Profile Dropdown */}
        <DashboardProfileDropdown user={user} onLogout={onLogout} />
      </div>
    </motion.header>
  );
}
