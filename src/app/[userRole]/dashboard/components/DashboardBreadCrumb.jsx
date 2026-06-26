"use client";

import { ChevronRight } from "@gravity-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BREADCRUMB_MAP } from "./DashboardMenus ";

export default function DashboardBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((seg, i, arr) => ({
      label: BREADCRUMB_MAP[seg] || seg.charAt(0).toUpperCase() + seg.slice(1),
      href: "/" + arr.slice(0, i + 1).join("/"),
      isLast: i === arr.length - 1,
    }));

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1">
      {segments.map((seg, idx) => (
        <span key={seg.href} className="flex items-center gap-1">
          {idx > 0 && (
            <ChevronRight
              width={13}
              height={13}
              className="text-muted-foreground flex-shrink-0"
              aria-hidden="true"
            />
          )}
          {seg.isLast ? (
            <span
              className="text-xs font-medium text-foreground"
              aria-current="page"
            >
              {seg.label}
            </span>
          ) : (
            <Link
              href={seg.href}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {seg.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
