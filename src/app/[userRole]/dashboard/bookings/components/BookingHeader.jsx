"use client";
import { motion } from "framer-motion";
export default function BookingHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-2"
    >
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        My Bookings
      </h1>
      <p className="text-muted-foreground text-sm max-w-xl">
        View and track all of your property reservations in one place.
      </p>
    </motion.div>
  );
}
