"use client";
import { motion } from "framer-motion";
import BookingRow from "./BookingRow";
export default function BookingTable({ bookings }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="w-full overflow-x-auto border-none md:border md:border-border md:rounded-xl"
    >
      <table className="w-full border-collapse text-left block md:table">
        <thead className="hidden md:table-header-group bg-secondary border-b border-border">
          <tr>
            <th
              scope="col"
              className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Property
            </th>
            <th
              scope="col"
              className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Booking Date
            </th>
            <th
              scope="col"
              className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Amount Paid
            </th>
            <th
              scope="col"
              className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Booking Status
            </th>
            <th
              scope="col"
              className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Payment Status
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group divide-none md:divide-y md:divide-border">
          {bookings.map((booking) => (
            <BookingRow key={booking._id} booking={booking} />
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
