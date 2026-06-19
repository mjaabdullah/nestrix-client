"use client";

import GoogleSignIn from "@/components/shared/auth/GoogleSignIn";
import OrDivider from "@/components/shared/auth/OrDivider";
import { ArrowRight, Eye, EyeSlash } from "@gravity-ui/icons";
import Link from "next/link";
import { useState } from "react";
// ─── Inline SVG architectural illustration ───────────────────────────────────
function ArchitecturalHero() {
  return (
    <svg
      viewBox="0 0 540 620"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-h-[520px]"
      aria-hidden="true"
    >
      {/* Grid / blueprint base lines */}
      <g stroke="#C89B3C" strokeOpacity="0.12" strokeWidth="0.5">
        {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="620" />
        ))}
        {[0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 620].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="540" y2={y} />
        ))}
      </g>

      {/* ── Main apartment building ── */}
      {/* Building body */}
      <rect
        x="100"
        y="160"
        width="240"
        height="340"
        stroke="#C89B3C"
        strokeOpacity="0.55"
        strokeWidth="1"
        fill="none"
      />

      {/* Floors dividers */}
      {[215, 270, 325, 380, 435].map((y) => (
        <line
          key={`floor${y}`}
          x1="100"
          y1={y}
          x2="340"
          y2={y}
          stroke="#C89B3C"
          strokeOpacity="0.3"
          strokeWidth="0.5"
        />
      ))}

      {/* Windows grid – left column */}
      {[175, 230, 285, 340, 395, 450].map((y) => (
        <rect
          key={`wl${y}`}
          x="118"
          y={y}
          width="32"
          height="24"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.45"
          strokeWidth="0.75"
          fill="none"
        />
      ))}

      {/* Windows grid – center column */}
      {[175, 230, 285, 340, 395, 450].map((y) => (
        <rect
          key={`wc${y}`}
          x="204"
          y={y}
          width="32"
          height="24"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.45"
          strokeWidth="0.75"
          fill="none"
        />
      ))}

      {/* Windows grid – right column */}
      {[175, 230, 285, 340, 395, 450].map((y) => (
        <rect
          key={`wr${y}`}
          x="290"
          y={y}
          width="32"
          height="24"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.45"
          strokeWidth="0.75"
          fill="none"
        />
      ))}

      {/* Rooftop detail */}
      <rect
        x="100"
        y="145"
        width="240"
        height="18"
        stroke="#C89B3C"
        strokeOpacity="0.5"
        strokeWidth="0.75"
        fill="none"
      />
      <line
        x1="160"
        y1="145"
        x2="160"
        y2="130"
        stroke="#C89B3C"
        strokeOpacity="0.4"
        strokeWidth="0.75"
      />
      <line
        x1="220"
        y1="145"
        x2="220"
        y2="118"
        stroke="#C89B3C"
        strokeOpacity="0.4"
        strokeWidth="0.75"
      />
      <line
        x1="280"
        y1="145"
        x2="280"
        y2="130"
        stroke="#C89B3C"
        strokeOpacity="0.4"
        strokeWidth="0.75"
      />
      <rect
        x="205"
        y="108"
        width="30"
        height="10"
        rx="1"
        stroke="#C89B3C"
        strokeOpacity="0.4"
        strokeWidth="0.75"
        fill="none"
      />

      {/* Front door */}
      <rect
        x="195"
        y="455"
        width="50"
        height="45"
        rx="1"
        stroke="#C89B3C"
        strokeOpacity="0.6"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="240" cy="478" r="2" fill="#C89B3C" fillOpacity="0.6" />
      <line
        x1="220"
        y1="455"
        x2="220"
        y2="500"
        stroke="#C89B3C"
        strokeOpacity="0.35"
        strokeWidth="0.5"
      />

      {/* Steps */}
      <line
        x1="185"
        y1="503"
        x2="255"
        y2="503"
        stroke="#C89B3C"
        strokeOpacity="0.4"
        strokeWidth="0.75"
      />
      <line
        x1="178"
        y1="508"
        x2="262"
        y2="508"
        stroke="#C89B3C"
        strokeOpacity="0.35"
        strokeWidth="0.5"
      />

      {/* ── Secondary building right ── */}
      <rect
        x="355"
        y="240"
        width="130"
        height="260"
        stroke="#C89B3C"
        strokeOpacity="0.3"
        strokeWidth="0.75"
        fill="none"
      />
      {[290, 340, 390, 440].map((y) => (
        <line
          key={`rb${y}`}
          x1="355"
          y1={y}
          x2="485"
          y2={y}
          stroke="#C89B3C"
          strokeOpacity="0.18"
          strokeWidth="0.5"
        />
      ))}
      {[375, 420, 375, 420].map((y, i) => (
        <rect
          key={`rw${i}_${y}`}
          x={370 + (i % 2) * 55}
          y={y}
          width="28"
          height="20"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.3"
          strokeWidth="0.6"
          fill="none"
        />
      ))}
      {[255, 310].map((y) =>
        [0, 1].map((i) => (
          <rect
            key={`rw2_${y}_${i}`}
            x={370 + i * 55}
            y={y}
            width="28"
            height="20"
            rx="1"
            stroke="#C89B3C"
            strokeOpacity="0.3"
            strokeWidth="0.6"
            fill="none"
          />
        )),
      )}

      {/* ── Small building left ── */}
      <rect
        x="20"
        y="300"
        width="65"
        height="200"
        stroke="#C89B3C"
        strokeOpacity="0.25"
        strokeWidth="0.6"
        fill="none"
      />
      {[340, 380, 420, 460].map((y) => (
        <rect
          key={`lw${y}`}
          x="32"
          y={y}
          width="18"
          height="14"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.25"
          strokeWidth="0.5"
          fill="none"
        />
      ))}

      {/* ── Floor plan overlay (bottom-left) ── */}
      <g transform="translate(20, 530)" opacity="0.55">
        <rect
          x="0"
          y="0"
          width="120"
          height="75"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.5"
          strokeWidth="0.75"
          fill="none"
        />
        <line
          x1="55"
          y1="0"
          x2="55"
          y2="75"
          stroke="#C89B3C"
          strokeOpacity="0.3"
          strokeWidth="0.5"
        />
        <line
          x1="0"
          y1="40"
          x2="55"
          y2="40"
          stroke="#C89B3C"
          strokeOpacity="0.3"
          strokeWidth="0.5"
        />
        <rect
          x="62"
          y="8"
          width="28"
          height="22"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.35"
          strokeWidth="0.5"
          fill="none"
        />
        <rect
          x="94"
          y="8"
          width="22"
          height="22"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.35"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Bathroom fixtures */}
        <rect
          x="5"
          y="8"
          width="22"
          height="28"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.28"
          strokeWidth="0.5"
          fill="none"
        />
        <ellipse
          cx="16"
          cy="18"
          rx="7"
          ry="10"
          stroke="#C89B3C"
          strokeOpacity="0.28"
          strokeWidth="0.5"
          fill="none"
        />
      </g>

      {/* ── Key illustration (bottom-right) ── */}
      <g transform="translate(400, 545)" opacity="0.6">
        <circle
          cx="14"
          cy="14"
          r="10"
          stroke="#C89B3C"
          strokeOpacity="0.5"
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx="14"
          cy="14"
          r="5"
          stroke="#C89B3C"
          strokeOpacity="0.35"
          strokeWidth="0.75"
          fill="none"
        />
        <rect
          x="22"
          y="12"
          width="36"
          height="4"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.5"
          strokeWidth="0.75"
          fill="none"
        />
        <rect
          x="46"
          y="8"
          width="4"
          height="8"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.4"
          strokeWidth="0.75"
          fill="none"
        />
        <rect
          x="54"
          y="10"
          width="4"
          height="6"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.4"
          strokeWidth="0.75"
          fill="none"
        />
      </g>

      {/* ── Dimension / annotation marks ── */}
      {/* Horizontal span arrow */}
      <line
        x1="100"
        y1="528"
        x2="340"
        y2="528"
        stroke="#C89B3C"
        strokeOpacity="0.25"
        strokeWidth="0.5"
        strokeDasharray="3 3"
      />
      <line
        x1="100"
        y1="524"
        x2="100"
        y2="532"
        stroke="#C89B3C"
        strokeOpacity="0.25"
        strokeWidth="0.5"
      />
      <line
        x1="340"
        y1="524"
        x2="340"
        y2="532"
        stroke="#C89B3C"
        strokeOpacity="0.25"
        strokeWidth="0.5"
      />

      {/* Vertical span arrow */}
      <line
        x1="360"
        y1="160"
        x2="360"
        y2="500"
        stroke="#C89B3C"
        strokeOpacity="0.2"
        strokeWidth="0.5"
        strokeDasharray="3 3"
      />

      {/* Corner accent marks */}
      <path
        d="M96 156 L100 156 L100 160"
        stroke="#C89B3C"
        strokeOpacity="0.55"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M340 156 L344 156"
        stroke="#C89B3C"
        strokeOpacity="0.55"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M340 500 L344 500"
        stroke="#C89B3C"
        strokeOpacity="0.55"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M96 500 L100 500 L100 504"
        stroke="#C89B3C"
        strokeOpacity="0.55"
        strokeWidth="1"
        fill="none"
      />

      {/* ── Dot accent (compass rose hint) ── */}
      <circle cx="480" cy="120" r="1.5" fill="#C89B3C" fillOpacity="0.4" />
      <circle
        cx="480"
        cy="120"
        r="8"
        stroke="#C89B3C"
        strokeOpacity="0.2"
        strokeWidth="0.5"
        fill="none"
      />
      <line
        x1="480"
        y1="108"
        x2="480"
        y2="132"
        stroke="#C89B3C"
        strokeOpacity="0.25"
        strokeWidth="0.5"
      />
      <line
        x1="468"
        y1="120"
        x2="492"
        y2="120"
        stroke="#C89B3C"
        strokeOpacity="0.25"
        strokeWidth="0.5"
      />
    </svg>
  );
}

// ─── Main Login Page ──────────────────────────────────────────────────────────
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 1800);
  };

  return (
    <div className="min-h-screen bg-[#FCFCFA] flex flex-col lg:flex-row">
      {/* ── LEFT: Architectural Hero */}
      <div
        className="relative hidden lg:w-[52%] lg:flex flex-col justify-between overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #2C3A3C 0%, #3E4E50 55%, #344244 100%)",
        }}
      >
        {/* Subtle top-left corner mark */}
        <div className="absolute top-0 left-0 w-16 h-16 opacity-30">
          <svg viewBox="0 0 64 64" fill="none">
            <path d="M0 0 L64 0 L64 4 L4 4 L4 64 L0 64 Z" fill="#C89B3C" />
          </svg>
        </div>

        {/* Logo + Nav */}
        <div className="relative z-10 px-8 pt-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Logomark: stylised N inside a box */}
            <div className="w-8 h-8 border border-[#C89B3C] flex items-center justify-center">
              <span className="text-[#C89B3C] font-semibold text-sm tracking-tight leading-none">
                N
              </span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              Nestrix
            </span>
          </div>
          <a
            href="#"
            className="text-xs text-[#C89B3C] border border-[#C89B3C] border-opacity-50 px-3 py-1.5 hover:border-opacity-100 transition-all duration-200 tracking-wide"
          >
            List a Property
          </a>
        </div>

        {/* Architectural illustration */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-8 py-6">
          <ArchitecturalHero />
        </div>

        {/* Hero text */}
        <div className="relative z-10 px-8 pb-10">
          {/* Gold rule */}
          <div className="w-8 h-px bg-[#C89B3C] mb-5" />
          <h1 className="text-white text-2xl lg:text-3xl font-semibold leading-snug tracking-tight max-w-sm">
            Find the Place That
            <br />
            <span className="text-[#C89B3C]">Feels Like Home</span>
          </h1>
          <p className="mt-3 text-sm text-white/55 leading-relaxed max-w-xs">
            Discover verified rental properties, connect with trusted owners,
            and book with confidence.
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex items-center gap-5">
            {[
              { value: "12K+", label: "Verified listings" },
              { value: "98%", label: "Owner response" },
              { value: "4.9★", label: "Avg. rating" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-[#C89B3C] text-sm font-semibold">
                  {value}
                </div>
                <div className="text-white/40 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Login Form ────────────────────────────────────────────────── */}
      <div className="lg:w-[48%] flex items-center justify-center px-6 py-12 lg:py-0">
        <div className="w-full max-w-[400px]">
          {/* Form header */}
          <div className="mb-8">
            {/* Mobile logo */}
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <div className="w-7 h-7 border border-[#3E4E50] flex items-center justify-center">
                <span className="text-[#3E4E50] font-semibold text-xs">N</span>
              </div>
              <span className="text-[#1B1B1B] font-semibold text-base tracking-tight">
                Nestrix
              </span>
            </div>

            <p className="text-xs text-[#C89B3C] font-medium tracking-widest uppercase mb-2">
              Welcome back
            </p>
            <h2 className="text-[#1B1B1B] text-2xl font-semibold tracking-tight leading-tight">
              Sign in to your account
            </h2>
            <p className="mt-1.5 text-sm text-[#6B7280]">
              Access your saved properties and bookings.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#1B1B1B] mb-1.5 tracking-wide"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                  w-full h-10 px-3 text-sm text-[#1B1B1B] bg-white
                  border border-[#E5E7EB] rounded-[6px]
                  placeholder:text-[#D1D5DB]
                  outline-none
                  transition-all duration-150
                  hover:border-[#3E4E50]/40
                  focus:border-[#3E4E50] focus:ring-2 focus:ring-[#3E4E50]/10
                "
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-[#1B1B1B] tracking-wide"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-[#C89B3C] hover:text-[#b08932] transition-colors duration-150"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="
                    w-full h-10 px-3 pr-10 text-sm text-[#1B1B1B] bg-white
                    border border-[#E5E7EB] rounded-[6px]
                    placeholder:text-[#D1D5DB]
                    outline-none
                    transition-all duration-150
                    hover:border-[#3E4E50]/40
                    focus:border-[#3E4E50] focus:ring-2 focus:ring-[#3E4E50]/10
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    text-[#9CA3AF] hover:text-[#3E4E50]
                    transition-colors duration-150
                  "
                >
                  {showPassword ? (
                    <EyeSlash width={16} height={16} />
                  ) : (
                    <Eye width={16} height={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                role="checkbox"
                aria-checked={rememberMe}
                onClick={() => setRememberMe((v) => !v)}
                className={`
                  w-4 h-4 rounded-[3px] border flex items-center justify-center flex-shrink-0
                  transition-all duration-150 cursor-pointer
                  ${
                    rememberMe
                      ? "bg-[#3E4E50] border-[#3E4E50]"
                      : "bg-white border-[#D1D5DB] hover:border-[#3E4E50]/50"
                  }
                `}
              >
                {rememberMe && (
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path
                      d="M1 3.5L3.2 6L8 1"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <span
                onClick={() => setRememberMe((v) => !v)}
                className="text-sm text-[#4B5563] cursor-pointer select-none"
              >
                Remember me for 30 days
              </span>
            </div>

            {/* Submit button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isLoading}
                className="
                  w-full h-10 flex items-center justify-center gap-2
                  bg-[#3E4E50] text-white text-sm font-medium
                  rounded-[6px] tracking-wide
                  transition-all duration-200
                  hover:bg-[#344244]
                  active:scale-[0.99]
                  disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E4E50] focus-visible:ring-offset-2
                "
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeWidth="3"
                      />
                      <path
                        className="opacity-80"
                        fill="white"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Signing in…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign in
                    <ArrowRight width={15} height={15} />
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <OrDivider />

          {/* Google SignIn */}
          <GoogleSignIn />
          {/* Register link */}
          <p className="mt-6 text-center text-sm text-[#6B7280]">
            New to Nestrix?{" "}
            <Link
              href="/register"
              className="text-[#3E4E50] font-medium hover:text-[#C89B3C] transition-colors duration-150"
            >
              Create an account
            </Link>
          </p>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-[#E5E7EB]">
            <p className="text-xs text-[#9CA3AF] text-center leading-relaxed">
              By signing in, you agree to Nestrix's{" "}
              <Link
                href="/"
                className="underline hover:text-[#6B7280] transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/"
                className="underline hover:text-[#6B7280] transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
