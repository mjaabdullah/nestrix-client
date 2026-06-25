"use client";

import { motion } from "framer-motion";
import { RiBuilding2Line, RiCloseLine } from "react-icons/ri";

export default function EmptyState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-2xl border border-border bg-secondary flex items-center justify-center">
          <RiBuilding2Line className="w-10 h-10 text-muted-foreground" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full border border-border bg-background flex items-center justify-center">
          <RiCloseLine className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No Properties Found
      </h3>
      <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-8">
        Try changing your filters or search criteria to discover more available
        properties.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
      >
        Reset Filters
      </button>
    </motion.div>
  );
}
