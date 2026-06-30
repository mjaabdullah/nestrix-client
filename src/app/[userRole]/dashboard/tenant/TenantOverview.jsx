"use client";

import { CalendarIcon, ShieldKeyholeIcon, WalletIcon } from "@gravity-ui/icons";
import { Avatar } from "@heroui/react";
import { motion } from "framer-motion";
import { FaHeart, FaStar } from "react-icons/fa";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

function SummaryCard({ icon, label, value, helperText, index }) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-secondary p-5 transition-colors duration-200 hover:border-primary"
      role="group"
      aria-label={label}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent text-accent-foreground">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-2xl font-semibold text-foreground">{value}</span>
        <span className="text-xs text-muted-foreground">{helperText}</span>
      </div>
    </motion.div>
  );
}

export default function TenantOverview({ user, stats }) {
  const greeting = getGreeting();

  return (
    <section
      aria-label="Tenant dashboard overview"
      className="w-full flex flex-col gap-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-border bg-secondary p-6"
      >
        <div className="flex items-center gap-4">
          <Avatar.Root className="w-14 h-14 shrink-0">
            <Avatar.Image
              src={user?.avatarUrl}
              alt={user?.name || "User avatar"}
            />
            <Avatar.Fallback className="bg-accent text-accent-foreground text-lg font-medium">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </Avatar.Fallback>
          </Avatar.Root>
          <div className="flex flex-col">
            <h2 className="text-sm font-medium text-muted-foreground">
              {greeting},
            </h2>
            <p className="text-xl font-semibold text-foreground">
              {user?.name}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Welcome back! Here&apos;s a quick overview of your rental
              activity.
            </p>
          </div>
        </div>

        <div
          className="flex items-center gap-2 self-start sm:self-auto rounded-full bg-accent px-4 py-2 text-accent-foreground"
          aria-label="Tenant account badge"
        >
          <ShieldKeyholeIcon className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm font-medium">Tenant Account</span>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        role="list"
        aria-label="Rental activity summary"
      >
        <SummaryCard
          icon={<CalendarIcon className="w-5 h-5" aria-hidden="true" />}
          label="Total Bookings"
          value={stats?.totalBookings ?? 0}
          helperText="Across all bookings"
        />
        <SummaryCard
          icon={<FaHeart className="w-4 h-4" aria-hidden="true" />}
          label="Favorite Properties"
          value={stats?.favoriteProperties ?? 0}
          helperText="Saved by you"
        />
        <SummaryCard
          icon={<FaStar className="w-4 h-4" aria-hidden="true" />}
          label="Reviews Given"
          value={stats?.reviewsGiven ?? 0}
          helperText="Reviews submitted"
        />
        <SummaryCard
          icon={<WalletIcon className="w-5 h-5" aria-hidden="true" />}
          label="Total Amount Paid"
          value={formatCurrency(stats?.totalAmountPaid)}
          helperText="Lifetime payments"
        />
      </motion.div>
    </section>
  );
}
