"use client";
import { motion } from "framer-motion";

export default function SummaryCards({ summary }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "linear" } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_1.5fr] gap-6"
    >
      <motion.div
        variants={cardVariants}
        className="p-6 rounded-xl border border-border bg-background space-y-1.5"
      >
        <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          Total Bookings
        </span>
        <p className="text-3xl font-bold tracking-tight text-foreground">
          {summary.totalBookings}
        </p>
      </motion.div>

      <motion.div
        variants={cardVariants}
        className="p-6 rounded-xl border border-border bg-background space-y-1.5"
      >
        <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          Approved Bookings
        </span>
        <p className="text-3xl font-bold tracking-tight text-foreground">
          {summary.approvedBookings}
        </p>
      </motion.div>

      <motion.div
        variants={cardVariants}
        className="p-6 rounded-xl border border-border bg-background space-y-1.5"
      >
        <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          Pending Bookings
        </span>
        <p className="text-3xl font-bold tracking-tight text-foreground">
          {summary.pendingBookings}
        </p>
      </motion.div>

      <motion.div
        variants={cardVariants}
        className="p-6 rounded-xl border border-border bg-background space-y-1.5"
      >
        <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          Total Amount Paid
        </span>
        <p className="text-3xl font-bold tracking-tight text-foreground">
          ৳
          {summary.totalAmountPaid.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
          })}
        </p>
      </motion.div>
    </motion.div>
  );
}
