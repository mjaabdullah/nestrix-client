"use client";

import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardContent from "./components/DashboardContent";
import DashboardFooter from "./components/DashboardFooter";
import DashboardMobileDrawer from "./components/DashboardMobileDrawer";
import DashboardNavbar from "./components/DashboardNavbar";
import DashboardSidebar from "./components/DashboardSidebar";

// ---------------------------------------------------------------------------
// Hook: detect tablet breakpoint
// ---------------------------------------------------------------------------
function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const update = () => setIsTablet(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isTablet;
}

// ---------------------------------------------------------------------------
// DashboardLayout
// ---------------------------------------------------------------------------
export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { data, isPending, error } = authClient.useSession();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isTablet = useIsTablet();

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  // Sidebar is collapsed on tablet, hidden on mobile (drawer takes over)
  const sidebarCollapsed = isTablet;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* Desktop & Tablet Sidebar                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="hidden md:flex flex-shrink-0">
        <DashboardSidebar
          user={data?.user}
          onLogout={handleLogout}
          collapsed={sidebarCollapsed}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile Drawer Sidebar                                               */}
      {/* ------------------------------------------------------------------ */}
      <DashboardMobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={data?.user}
        onLogout={handleLogout}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Main column (Navbar + Content + Footer)                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <DashboardNavbar
          user={data?.user}
          onLogout={handleLogout}
          onMenuToggle={() => setDrawerOpen(true)}
        />

        <DashboardContent>{children}</DashboardContent>

        <DashboardFooter />
      </div>
    </div>
  );
}
