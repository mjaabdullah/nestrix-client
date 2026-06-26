"use client";

import { motion } from "framer-motion";

export default function DashboardLoading({ message = "Loading…" }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 gap-4"
      role="status"
      aria-label={message}
    >
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-accent"
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.85, 1, 0.85] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
