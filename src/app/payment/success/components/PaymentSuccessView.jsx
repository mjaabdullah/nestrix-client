"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiCheckCircle, FiInfo } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatAmount = (value) => {
  if (value === undefined || value === null) return "—";
  return `৳ ${(value / 100).toLocaleString("en-BD")}`;
};

const SummaryRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-right text-sm font-medium text-foreground">
      {value || "—"}
    </span>
  </div>
);

const PaymentSuccessView = ({
  customerEmail,
  amountPaid,
  moveInDate,
  contactNumber,
  user,
}) => {
  return (
    <section
      id="success"
      className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-12 sm:px-6"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl rounded-2xl border border-border bg-background p-6 sm:p-10"
      >
        <motion.div
          variants={iconVariants}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent"
        >
          <FiCheckCircle
            className="h-10 w-10 text-accent-foreground"
            aria-hidden="true"
          />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-center text-3xl font-semibold text-foreground sm:text-4xl"
        >
          Payment Successful 🎉
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground"
        >
          Thank you for choosing Nestrix. Your booking request has been
          submitted successfully and your payment has been confirmed. The
          property owner will review your request and you&apos;ll receive
          updates in your dashboard.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-8 rounded-xl border border-border p-5 sm:p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              Booking Summary
            </h2>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold tracking-wide text-accent-foreground">
              PAID
            </span>
          </div>

          <div className="flex flex-col">
            <SummaryRow label="Payment Status" value="Paid" />
            <SummaryRow label="Paid Amount" value={formatAmount(amountPaid)} />
            <SummaryRow label="Customer Email" value={customerEmail} />
            <SummaryRow label="Move-in Date" value={formatDate(moveInDate)} />
            <SummaryRow label="Contact Number" value={contactNumber} />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-secondary p-4"
        >
          <FiInfo
            className="mt-0.5 h-5 w-5 shrink-0 text-secondary-foreground"
            aria-hidden="true"
          />
          <p className="text-sm text-secondary-foreground">
            A confirmation email has been sent to your registered email address.
            You can also track your booking status from your dashboard.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href={`/${user?.role}/dashboard`}
            aria-label="Go to Dashboard"
            className="flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:w-1/2"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/properties"
            aria-label="Browse more properties"
            className="flex w-full items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:w-1/2"
          >
            Browse More Properties
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PaymentSuccessView;
