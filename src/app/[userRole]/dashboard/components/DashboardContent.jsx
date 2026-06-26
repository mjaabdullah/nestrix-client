"use client";

import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function DashboardContent({ children }) {
  return (
    <motion.main
      className="flex-1 overflow-y-auto overflow-x-hidden"
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
        {children}
      </div>
    </motion.main>
  );
}
