"use client";

import { usePathname } from "next/navigation";

import DashboardMenuItem from "./DashboardMenuItem";
import { DASHBOARD_MENUS } from "./DashboardMenus ";

export default function DashboardMenu({ role, collapsed = false }) {
  const pathname = usePathname();
  const menuItems = DASHBOARD_MENUS[role] || [];
  console.log(pathname, "path");

  const isActive = (href) => {
    if (href === pathname) return true;

    return false;
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
