"use client";

import { usePathname } from "next/navigation";

import DashboardMenuItem from "./DashboardMenuItem";
import { DASHBOARD_MENUS } from "./DashboardMenus ";

export default function DashboardMenu({ role, collapsed = false }) {
  const pathname = usePathname();
  const menuItems = DASHBOARD_MENUS[role] || [];

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex flex-col gap-0.5 py-2" aria-label="Main navigation">
      {menuItems.map((item) => (
        <DashboardMenuItem
          key={item.key}
          item={item}
          isActive={isActive(item.href)}
          collapsed={collapsed}
        />
      ))}
    </nav>
  );
}
