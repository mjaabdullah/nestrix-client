"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  RiCalendarLine,
  RiMailLine,
  RiShieldUserLine,
  RiUserLine,
} from "react-icons/ri";
import LoadingState from "../components/LoadingState";



// ─── Role badge config ─────────────────────────────────────────────────────────
const roleBadge = {
  Tenant: {
    label: "Tenant",
    classes: "bg-secondary text-secondary-foreground",
  },
  Owner: { label: "Owner", classes: "bg-primary text-primary-foreground" },
  Admin: { label: "Admin", classes: "bg-accent text-accent-foreground" },
};

// ─── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

// ─── InfoField ─────────────────────────────────────────────────────────────────
function InfoField({ icon: Icon, label, value }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-start gap-3 p-4 rounded-xl border border-border bg-background hover:border-primary transition-colors duration-200"
    >
      <span className="mt-0.5 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-secondary">
        <Icon className="text-primary text-base" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider mb-0.5 text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-medium truncate text-foreground">{value}</p>
      </div>
    </motion.div>
  );
}

// ─── StatCard ──────────────────────────────────────────────────────────────────
function StatCard({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-4 rounded-xl border border-border bg-background">
      <span className="text-2xl font-bold text-primary">{value}</span>
      <span className="text-xs font-medium tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

// ─── ProfilePage ───────────────────────────────────────────────────────────────
const ProfilePage = () => {
  const { data, isPending, error } = authClient.useSession();

  if (isPending) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="text-center min-h-screen">Something went wrong.</div>
    );
  }

  const user = data?.user;
  const memberSince = new Date(user?.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const badge = roleBadge[user.role] ?? roleBadge.Tenant;

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="mx-auto max-w-3xl space-y-6"
      >
        {/* ── Hero Card ── */}
        <motion.div
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
        >
          {/* Banner */}
          <div className="h-28 w-full bg-gradient-to-br from-primary to-accent" />

          <div className="relative px-6 pb-6">
            {/* Avatar row */}
            <div className="-mt-12 mb-4 flex items-end justify-between">
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={100}
                  height={100}
                  className="h-24 w-24 rounded-2xl object-cover shadow-md border-4 border-background"
                />
                {/* Online dot */}
                <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-400 border-2 border-background" />
              </div>

              {/* Role badge */}
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide shadow-sm ${badge.classes}`}
              >
                <RiShieldUserLine className="text-sm" />
                {(user?.role).toUpperCase()}
              </span>
            </div>

            {/* Name + location */}
            <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <RiMailLine className="text-accent text-base" />
              {user.email}
            </p>
          </div>
        </motion.div>

        {/* ── Account Info Card ── */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-border bg-secondary p-6 shadow-sm"
        >
          {/* Section title */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-1 h-5 rounded-full bg-accent" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">
              Account Information
            </h2>
          </div>

          {/* Info grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <InfoField icon={RiUserLine} label="Full Name" value={user.name} />
            <InfoField icon={RiMailLine} label="Email" value={user.email} />

            <InfoField icon={RiShieldUserLine} label="Role" value={user.role} />

            <InfoField
              icon={RiCalendarLine}
              label="Member Since"
              value={memberSince}
            />
          </motion.div>
        </motion.div>

        {/* ── Read-only notice ── */}
        <motion.p
          variants={fadeUp}
          className="text-center text-xs pb-4 text-muted-foreground"
        >
          This is a read-only view of your profile.{" "}
          <span className="font-semibold cursor-pointer text-accent hover:underline">
            Contact support
          </span>{" "}
          to make changes.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
