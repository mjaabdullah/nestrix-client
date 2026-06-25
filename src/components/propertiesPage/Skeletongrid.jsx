"use client";

import { motion } from "framer-motion";

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-background">
      <div className="relative overflow-hidden bg-secondary h-52">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="h-3 w-2/3 rounded-full bg-secondary" />
        <div className="h-3 w-1/2 rounded-full bg-secondary" />
        <div className="flex gap-3 pt-1">
          <div className="h-3 w-1/4 rounded-full bg-secondary" />
          <div className="h-3 w-1/4 rounded-full bg-secondary" />
          <div className="h-3 w-1/4 rounded-full bg-secondary" />
        </div>
        <div className="flex justify-between pt-2">
          <div className="h-4 w-1/3 rounded-full bg-secondary" />
          <div className="h-8 w-24 rounded-lg bg-secondary" />
        </div>
      </div>
    </div>
  );
}

export default function SkeletonGrid({ count = 9 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </motion.div>
  );
}
