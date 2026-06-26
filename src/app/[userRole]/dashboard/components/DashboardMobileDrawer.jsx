"use client";

import { ArrowRightFromSquare, Xmark } from "@gravity-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import DashboardLogo from "./DashboardLogo";
import DashboardMenu from "./DashboardMenu";
import { ROLE_COLORS, ROLE_LABELS } from "./DashboardMenus ";

export default function DashboardMobileDrawer({
  open,
  onClose,
  user,
  onLogout,
}) {
  // Close on route change or ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer-panel"
            className="fixed left-0 top-0 bottom-0 z-50 w-[280px] bg-background border-r border-border flex flex-col"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            aria-label="Mobile navigation"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between pr-4">
              <DashboardLogo collapsed={false} />
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40"
                aria-label="Close navigation"
              >
                <Xmark width={18} height={18} />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-border mx-4" />

            {/* Role badge */}
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

            {/* Menu */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
              <DashboardMenu role={user?.role} collapsed={false} />
            </div>

            {/* Bottom */}
            <div className="border-t border-border">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-semibold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email || "user@nestrix.com"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-colors duration-150 border-t border-border focus:outline-none"
                aria-label="Sign out"
              >
                <ArrowRightFromSquare width={16} height={16} />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
