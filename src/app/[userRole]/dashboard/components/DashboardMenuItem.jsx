"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardMenuItem({ item, isActive, collapsed }) {
  const Icon = item.icon;

  return (
    <Link href={item.href} className="block w-full">
      <motion.div
        className={`
          relative flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-150
          ${
            isActive
              ? "bg-accent/10 text-accent border-l-2 border-accent"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/5 border-l-2 border-transparent"
          }
        `}
        whileHover={{ x: isActive ? 0 : 1 }}
        transition={{ duration: 0.12 }}
        aria-current={isActive ? "page" : undefined}
      >
        {/* Icon */}
        <span
          className={`flex-shrink-0 w-5 h-5 flex items-center justify-center transition-colors duration-150 ${
            isActive ? "text-accent" : ""
          }`}
        >
          {Icon && <Icon width={18} height={18} />}
        </span>

        {/* Label */}
        {!collapsed && (
          <motion.span
            className={`text-sm truncate ${isActive ? "font-semibold text-accent" : "font-medium"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {item.label}
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
}
