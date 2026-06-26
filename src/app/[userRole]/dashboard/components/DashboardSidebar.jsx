"use client";

import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { motion } from "framer-motion";

import DashboardLogo from "./DashboardLogo";
import DashboardMenu from "./DashboardMenu";
import { ROLE_COLORS, ROLE_LABELS } from "./DashboardMenus ";

export default function DashboardSidebar({
  user,
  onLogout,
  collapsed = false,
}) {
  return (
    <motion.aside
      className={`
        h-full flex flex-col bg-background border-r border-border
        transition-all duration-300 ease-in-out overflow-hidden
        ${collapsed ? "w-[60px]" : "w-[280px]"}
      `}
      initial={false}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <DashboardLogo collapsed={collapsed} />

      {/* Divider */}
      <div className="h-px bg-border mx-4" />

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-1">
          <span
            className={`inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
              ROLE_COLORS[user?.role] ||
              "bg-secondary text-secondary-foreground"
            }`}
          >
            {ROLE_LABELS[user?.role] || "User"}
          </span>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
        <DashboardMenu role={user?.role} collapsed={collapsed} />
      </div>

      {/* Bottom section */}
      <div className="border-t border-border">
        {/* User profile */}
        <div
          className={`flex items-center gap-3 px-4 py-3 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || "user@nestrix.com"}
              </p>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className={`
            w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground
            hover:text-foreground hover:bg-accent/5 transition-colors duration-150
            border-t border-border focus:outline-none focus:ring-inset focus:ring-2 focus:ring-accent/40
            ${collapsed ? "justify-center" : ""}
          `}
          aria-label="Sign out"
        >
          <ArrowRightFromSquare
            width={16}
            height={16}
            className="flex-shrink-0"
          />
          {!collapsed && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
}
