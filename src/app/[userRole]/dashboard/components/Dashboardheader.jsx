"use client";

import { motion } from "framer-motion";
import DashboardSectionTitle from "./DashboardSectionTitle";

export default function DashboardHeader({ title, subtitle, actions }) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <DashboardSectionTitle title={title} subtitle={subtitle} />
      {actions && (
        <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>
      )}
    </motion.div>
  );
}
