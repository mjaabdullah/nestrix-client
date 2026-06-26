"use client";

import { motion } from "framer-motion";

export default function DashboardLogo({ collapsed = false }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 px-4 py-5 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Mark */}
      <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-md flex items-center justify-center">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 1.5L2.25 7.125V15.75H6.75V11.25H11.25V15.75H15.75V7.125L9 1.5Z"
            className="fill-primary-foreground"
          />
        </svg>
      </div>

      {/* Wordmark */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col leading-none"
        >
          <span className="text-foreground font-semibold text-base tracking-tight">
            Nestrix
          </span>
          <span className="text-muted-foreground text-[10px] tracking-widest uppercase font-medium">
            Property Platform
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
