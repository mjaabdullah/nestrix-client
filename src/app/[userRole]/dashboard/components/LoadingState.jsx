"use client";

import { Spinner } from "@heroui/react";
import { motion } from "framer-motion";

export default function LoadingState() {
  return (
    <motion.main
      role="status"
      aria-live="polite"
      aria-label="Loading content, please wait"
      className="min-h-screen flex items-center justify-center bg-background px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center gap-5 text-center max-w-xs w-full">
        {/* Spinner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
          aria-hidden="true"
        >
          <Spinner
            size="lg"
            classNames={{
              wrapper: "w-10 h-10",
              circle1: "border-b-primary",
              circle2: "border-b-primary/40",
            }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-foreground text-base font-semibold tracking-tight">
            Loading...
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Please wait while we load your data.
          </p>
        </motion.div>
      </div>
    </motion.main>
  );
}
