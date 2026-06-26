"use client";

import { motion } from "framer-motion";

export default function DashboardEmptyState({
  icon: Icon,
  title = "Nothing here yet",
  description,
  action,
}) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 gap-4 text-center max-w-sm mx-auto"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {Icon && (
        <div className="w-14 h-14 rounded-xl bg-accent/8 flex items-center justify-center">
          <Icon width={26} height={26} className="text-accent" />
        </div>
      )}
      <div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </motion.div>
  );
}
