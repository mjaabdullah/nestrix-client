"use client";

import { CreditCard, MapPin, ShieldCheck, StarFill } from "@gravity-ui/icons";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiBuildingHouse } from "react-icons/bi";
import { FiUserCheck } from "react-icons/fi";
import SearchPanel from "./SearchPanel";

// ─── Animated Counter ────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target.replace(/\D/g, ""), 10);
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Architectural SVG Illustration ──────────────────────────────────────────
function ArchitecturalIllustration() {
  return (
    <svg
      viewBox="0 0 520 560"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Blueprint grid */}
      <defs>
        <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M 28 0 L 0 0 0 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            className="text-border"
            opacity="0.5"
          />
        </pattern>
        <linearGradient id="buildingFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Grid background */}
      <rect
        width="520"
        height="560"
        fill="url(#grid)"
        className="text-border"
      />

      {/* ── Building silhouette ── */}
      {/* Main tower */}
      <rect
        x="160"
        y="80"
        width="200"
        height="360"
        fill="url(#buildingFade)"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-border"
        rx="2"
      />
      {/* Tower top cap */}
      <rect
        x="180"
        y="68"
        width="160"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-border"
        rx="2"
      />
      {/* Roof antenna line */}
      <line
        x1="260"
        y1="40"
        x2="260"
        y2="68"
        stroke="currentColor"
        strokeWidth="1"
        className="text-border"
        strokeDasharray="4 3"
      />
      <circle
        cx="260"
        cy="38"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-accent"
      />

      {/* Left wing */}
      <rect
        x="80"
        y="200"
        width="80"
        height="240"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-border"
        rx="2"
      />
      {/* Right wing */}
      <rect
        x="360"
        y="200"
        width="80"
        height="240"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-border"
        rx="2"
      />

      {/* ── Windows grid (main tower) ── */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`win-${row}-${col}`}
            x={177 + col * 46}
            y={100 + row * 40}
            width={24}
            height={28}
            rx={2}
            fill={row === 3 && col === 1 ? "currentColor" : "none"}
            fillOpacity={row === 3 && col === 1 ? 0.15 : 0}
            stroke="currentColor"
            strokeWidth="0.9"
            className={row === 3 && col === 1 ? "text-accent" : "text-border"}
            opacity="0.7"
          />
        )),
      )}

      {/* Windows left wing */}
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1].map((col) => (
          <rect
            key={`lwwin-${row}-${col}`}
            x={90 + col * 34}
            y={220 + row * 40}
            width={18}
            height={22}
            rx={2}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-border"
            opacity="0.55"
          />
        )),
      )}

      {/* Windows right wing */}
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1].map((col) => (
          <rect
            key={`rwwin-${row}-${col}`}
            x={372 + col * 34}
            y={220 + row * 40}
            width={18}
            height={22}
            rx={2}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-border"
            opacity="0.55"
          />
        )),
      )}

      {/* ── Central Doorway ── */}
      <rect
        x="228"
        y="370"
        width="64"
        height="70"
        rx="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-accent"
      />
      <rect
        x="236"
        y="406"
        width="48"
        height="34"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-border"
      />
      {/* Door handle */}
      <circle
        cx="275"
        cy="424"
        r="3"
        fill="currentColor"
        className="text-accent"
      />
      {/* Doorway arch detail */}
      <path
        d="M 228 406 Q 260 370 292 406"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-accent"
        strokeDasharray="5 3"
      />

      {/* Ground line */}
      <line
        x1="40"
        y1="440"
        x2="480"
        y2="440"
        stroke="currentColor"
        strokeWidth="1"
        className="text-border"
        opacity="0.6"
      />

      {/* ── Floor plan corner accents ── */}
      {/* Top-left */}
      <path
        d="M 30 30 L 30 70 M 30 30 L 70 30"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-accent"
        fill="none"
        opacity="0.6"
      />
      {/* Top-right */}
      <path
        d="M 490 30 L 490 70 M 490 30 L 450 30"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-accent"
        fill="none"
        opacity="0.6"
      />
      {/* Bottom-left */}
      <path
        d="M 30 530 L 30 490 M 30 530 L 70 530"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-accent"
        fill="none"
        opacity="0.6"
      />
      {/* Bottom-right */}
      <path
        d="M 490 530 L 490 490 M 490 530 L 450 530"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-accent"
        fill="none"
        opacity="0.6"
      />

      {/* ── Map pin ── */}
      <g transform="translate(58, 155)">
        <circle
          cx="14"
          cy="12"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent"
        />
        <circle
          cx="14"
          cy="12"
          r="3.5"
          fill="currentColor"
          className="text-accent"
        />
        <line
          x1="14"
          y1="22"
          x2="14"
          y2="32"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent"
        />
      </g>

      {/* ── Key icon ── */}
      <g transform="translate(430, 145)">
        <circle
          cx="14"
          cy="10"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-border"
          opacity="0.7"
        />
        <circle
          cx="14"
          cy="10"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-border"
          opacity="0.7"
        />
        <line
          x1="20"
          y1="16"
          x2="36"
          y2="32"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-border"
          opacity="0.7"
        />
        <line
          x1="30"
          y1="30"
          x2="30"
          y2="36"
          stroke="currentColor"
          strokeWidth="1.2"
          className="text-border"
          opacity="0.7"
        />
        <line
          x1="34"
          y1="32"
          x2="34"
          y2="38"
          stroke="currentColor"
          strokeWidth="1.2"
          className="text-border"
          opacity="0.7"
        />
      </g>

      {/* ── Dimension annotation lines ── */}
      <line
        x1="60"
        y1="80"
        x2="60"
        y2="440"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeDasharray="3 3"
        className="text-border"
        opacity="0.45"
      />
      <line
        x1="55"
        y1="80"
        x2="65"
        y2="80"
        stroke="currentColor"
        strokeWidth="0.8"
        className="text-border"
        opacity="0.45"
      />
      <line
        x1="55"
        y1="440"
        x2="65"
        y2="440"
        stroke="currentColor"
        strokeWidth="0.8"
        className="text-border"
        opacity="0.45"
      />
    </svg>
  );
}

// ─── Floating Property Card ───────────────────────────────────────────────────
function FloatingCard({
  style,
  className = "",
  delay = 0,
  price,
  rating,
  location,
  label,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay },
      }}
      style={style}
      className={`absolute bg-background border border-border rounded-[8px] shadow-sm px-3 py-2.5 min-w-[160px] ${className}`}
    >
      {label && (
        <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-medium mb-1.5">
          {label}
        </p>
      )}
      <div className="flex items-center justify-between gap-3">
        {price && (
          <span className="text-foreground text-sm font-semibold">{price}</span>
        )}
        {rating && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <StarFill className="text-accent w-3 h-3" />
            {rating}
          </span>
        )}
      </div>
      {location && (
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="text-accent w-3 h-3 shrink-0" />
          <span className="text-xs text-muted-foreground truncate">
            {location}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Hero Component ──────────────────────────────────────────────────────
const HeroSection = () => {
  const stats = [
    { value: "12", suffix: "K+", label: "Active Tenants" },
    { value: "2", suffix: "K+", label: "Verified Properties" },
    { value: "850", suffix: "+", label: "Trusted Owners" },
  ];

  const trustIndicators = [
    { icon: ShieldCheck, text: "Verified Properties" },
    { icon: CreditCard, text: "Secure Payments" },
    { icon: FiUserCheck, text: "Trusted Owners" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      className="relative bg-background overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Subtle background texture lines ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, color-mix(in srgb, var(--color-border) 30%, transparent) 80px)",
          backgroundSize: "100% 80px",
          opacity: 0.35,
        }}
      />

      {/* ── Hero main layout ── */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-12 pt-24 pb-8 lg:pt-32 lg:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-8 items-center">
          {/* ══ LEFT: Content ══════════════════════════════════════════════════ */}
          <div className="flex flex-col">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 self-start mb-8"
            >
              <div className="flex items-center gap-2 border border-border rounded-[6px] px-3 py-1.5 bg-background">
                <ShieldCheck className="text-accent w-4 h-4 shrink-0" />
                <span className="text-xs font-medium tracking-[0.08em] uppercase text-muted-foreground">
                  Trusted Rental Marketplace
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-foreground font-bold leading-[1.08] tracking-[-0.03em] mb-6"
              style={{
                fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                letterSpacing: "-0.025em",
              }}
            >
              Find the Right Place. <br />
              Feel at{" "}
              <span
                className="text-accent italic"
                style={{ fontStyle: "italic" }}
              >
                Home
              </span>{" "}
              Instantly.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-muted-foreground text-lg leading-relaxed mb-9 max-w-[520px]"
            >
              Discover verified rental properties, connect with trusted owners,
              and book your next home with confidence through{" "}
              <span className="text-foreground font-medium">Nestrix</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link href="/properties">
                <button
                  className="inline-flex items-center justify-center gap-2 bg-primary text-background font-semibold rounded-[8px] px-7 py-3.5 text-sm tracking-[0.02em] transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{ minWidth: "176px" }}
                >
                  <BiBuildingHouse className="w-4 h-4" />
                  Explore Properties
                </button>
              </Link>
              <button
                className="inline-flex items-center justify-center gap-2 bg-background text-foreground border border-border font-semibold rounded-[8px] px-7 py-3.5 text-sm tracking-[0.02em] transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{ minWidth: "176px" }}
              >
                Become an Owner
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap gap-5"
            >
              {trustIndicators.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="text-accent w-4 h-4 shrink-0" />
                  <span className="text-sm text-muted-foreground">{text}</span>
                </div>
              ))}
            </motion.div>

            {/* Statistics */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="mt-12 pt-10 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {stats.map(({ value, suffix, label }, i) => (
                <div key={label}>
                  <p
                    className="text-foreground font-bold tracking-tight leading-none mb-1"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
                  >
                    <Counter target={value + "000"} />
                    {suffix}
                  </p>
                  <p className="text-muted-foreground text-xs tracking-[0.04em] uppercase">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ══ RIGHT: Architectural Illustration ══════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:justify-end"
            style={{ minHeight: "460px" }}
          >
            {/* Illustration wrapper */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[500px] aspect-[520/560] text-foreground"
            >
              <ArchitecturalIllustration />
            </motion.div>

            {/* Floating card — price & rating */}
            <FloatingCard
              style={{ top: "8%", right: "2%", zIndex: 10 }}
              delay={0.8}
              label="Featured Unit"
              price="$2,400 / mo"
              rating="4.9"
              location="Midtown, New York"
            />

            {/* Floating card — compact available */}
            <FloatingCard
              style={{ bottom: "22%", left: "0%", zIndex: 10 }}
              delay={1.1}
              label="Available Now"
              price="$1,850 / mo"
              rating="4.7"
              location="Shoreditch, London"
            />

            {/* Accent dot cluster */}
            <div
              aria-hidden="true"
              className="absolute top-[44%] left-[46%] w-2 h-2 rounded-full bg-accent"
              style={{
                boxShadow:
                  "0 0 0 6px color-mix(in srgb, var(--color-accent) 15%, transparent)",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Search Panel ── */}
      <SearchPanel />
      {/* ── Bottom accent rule ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-border opacity-60"
        aria-hidden="true"
      />
    </section>
  );
};
export default HeroSection;
