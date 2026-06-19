"use client";

import { useState, useRef, useCallback } from "react";
import {
  Eye,
  EyeSlash,
  ArrowRight,
  Google,
  Person,
  At,
  Lock,
  Camera,
  Check,
  Xmark,
} from "@gravity-ui/icons";

// ─────────────────────────────────────────────────────────────────────────────
// Architectural SVG Illustration — left hero panel
// Blueprint-style line-art: apartment tower, modern home, doorway arch, key
// All strokes in brand gold (#C89B3C) at low opacity on the slate background
// ─────────────────────────────────────────────────────────────────────────────
function ArchitecturalIllustration() {
  return (
    <svg
      viewBox="0 0 500 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-h-[480px]"
      aria-hidden="true"
    >
      {/* ── Blueprint grid ── */}
      <g stroke="#C89B3C" strokeOpacity="0.10" strokeWidth="0.5">
        {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500].map((x) => (
          <line key={`gv${x}`} x1={x} y1="0" x2={x} y2="560" />
        ))}
        {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 560].map(
          (y) => (
            <line key={`gh${y}`} x1="0" y1={y} x2="500" y2={y} />
          ),
        )}
      </g>

      {/* ── Main apartment tower (centre) ── */}
      {/* Tower body */}
      <rect
        x="155"
        y="100"
        width="190"
        height="350"
        stroke="#C89B3C"
        strokeOpacity="0.55"
        strokeWidth="1"
        fill="none"
      />
      {/* Mechanical floor lines */}
      {[155, 205, 255, 305, 355, 405].map((y) => (
        <line
          key={`fl${y}`}
          x1="155"
          y1={y}
          x2="345"
          y2={y}
          stroke="#C89B3C"
          strokeOpacity="0.25"
          strokeWidth="0.5"
        />
      ))}
      {/* Vertical centre divider */}
      <line
        x1="250"
        y1="100"
        x2="250"
        y2="450"
        stroke="#C89B3C"
        strokeOpacity="0.15"
        strokeWidth="0.5"
      />

      {/* Window grid — left bay */}
      {[115, 165, 215, 265, 315, 365, 415].map((y) => (
        <rect
          key={`wl${y}`}
          x="170"
          y={y}
          width="30"
          height="22"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.45"
          strokeWidth="0.75"
          fill="none"
        />
      ))}
      {/* Window grid — right bay */}
      {[115, 165, 215, 265, 315, 365, 415].map((y) => (
        <rect
          key={`wr${y}`}
          x="300"
          y={y}
          width="30"
          height="22"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.45"
          strokeWidth="0.75"
          fill="none"
        />
      ))}

      {/* Parapet / rooftop band */}
      <rect
        x="155"
        y="84"
        width="190"
        height="18"
        stroke="#C89B3C"
        strokeOpacity="0.5"
        strokeWidth="0.75"
        fill="none"
      />
      {/* Roof masts */}
      <line
        x1="200"
        y1="84"
        x2="200"
        y2="66"
        stroke="#C89B3C"
        strokeOpacity="0.35"
        strokeWidth="0.75"
      />
      <line
        x1="250"
        y1="84"
        x2="250"
        y2="52"
        stroke="#C89B3C"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <line
        x1="300"
        y1="84"
        x2="300"
        y2="66"
        stroke="#C89B3C"
        strokeOpacity="0.35"
        strokeWidth="0.75"
      />
      <rect
        x="234"
        y="44"
        width="32"
        height="10"
        rx="1"
        stroke="#C89B3C"
        strokeOpacity="0.4"
        strokeWidth="0.75"
        fill="none"
      />
      {/* Penthouse box */}
      <rect
        x="210"
        y="64"
        width="80"
        height="22"
        rx="1"
        stroke="#C89B3C"
        strokeOpacity="0.35"
        strokeWidth="0.75"
        fill="none"
      />

      {/* Grand entrance arch */}
      <path
        d="M215 450 L215 490 Q215 510 250 510 Q285 510 285 490 L285 450"
        stroke="#C89B3C"
        strokeOpacity="0.65"
        strokeWidth="1"
        fill="none"
      />
      <line
        x1="215"
        y1="450"
        x2="285"
        y2="450"
        stroke="#C89B3C"
        strokeOpacity="0.4"
        strokeWidth="0.5"
      />
      {/* Door handle */}
      <circle cx="272" cy="482" r="3" fill="#C89B3C" fillOpacity="0.55" />

      {/* Steps */}
      <line
        x1="205"
        y1="513"
        x2="295"
        y2="513"
        stroke="#C89B3C"
        strokeOpacity="0.4"
        strokeWidth="0.75"
      />
      <line
        x1="198"
        y1="519"
        x2="302"
        y2="519"
        stroke="#C89B3C"
        strokeOpacity="0.3"
        strokeWidth="0.5"
      />
      <line
        x1="192"
        y1="525"
        x2="308"
        y2="525"
        stroke="#C89B3C"
        strokeOpacity="0.2"
        strokeWidth="0.5"
      />

      {/* ── Corner tick marks on main tower ── */}
      <path
        d="M151 96 L155 96 L155 100"
        stroke="#C89B3C"
        strokeOpacity="0.6"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M345 96 L349 96"
        stroke="#C89B3C"
        strokeOpacity="0.6"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M345 450 L349 450"
        stroke="#C89B3C"
        strokeOpacity="0.6"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M151 450 L155 450 L155 454"
        stroke="#C89B3C"
        strokeOpacity="0.6"
        strokeWidth="1"
        fill="none"
      />

      {/* ── Secondary tower (right, recessed) ── */}
      <rect
        x="360"
        y="180"
        width="110"
        height="270"
        stroke="#C89B3C"
        strokeOpacity="0.28"
        strokeWidth="0.7"
        fill="none"
      />
      {[230, 280, 330, 380].map((y) => (
        <line
          key={`rt${y}`}
          x1="360"
          y1={y}
          x2="470"
          y2={y}
          stroke="#C89B3C"
          strokeOpacity="0.15"
          strokeWidth="0.5"
        />
      ))}
      {[190, 240, 290, 340, 390].map((y) =>
        [375, 410, 445].map((x) => (
          <rect
            key={`rb${y}_${x}`}
            x={x}
            y={y}
            width="18"
            height="14"
            rx="1"
            stroke="#C89B3C"
            strokeOpacity="0.28"
            strokeWidth="0.5"
            fill="none"
          />
        )),
      )}

      {/* ── Low villa left ── */}
      <rect
        x="20"
        y="290"
        width="110"
        height="160"
        stroke="#C89B3C"
        strokeOpacity="0.25"
        strokeWidth="0.6"
        fill="none"
      />
      {/* Pitched roof */}
      <polyline
        points="10,290 75,248 140,290"
        stroke="#C89B3C"
        strokeOpacity="0.3"
        strokeWidth="0.75"
        fill="none"
      />
      {/* Villa windows */}
      {[310, 360].map((y) =>
        [35, 75].map((x) => (
          <rect
            key={`vw${y}_${x}`}
            x={x}
            y={y}
            width="24"
            height="20"
            rx="1"
            stroke="#C89B3C"
            strokeOpacity="0.28"
            strokeWidth="0.5"
            fill="none"
          />
        )),
      )}
      {/* Villa door */}
      <rect
        x="57"
        y="390"
        width="26"
        height="60"
        rx="1"
        stroke="#C89B3C"
        strokeOpacity="0.35"
        strokeWidth="0.6"
        fill="none"
      />
      <path
        d="M57 390 Q57 380 70 380 Q83 380 83 390"
        stroke="#C89B3C"
        strokeOpacity="0.3"
        strokeWidth="0.5"
        fill="none"
      />

      {/* ── Floor plan panel (bottom-left) ── */}
      <g transform="translate(18, 488)" opacity="0.52">
        <rect
          x="0"
          y="0"
          width="110"
          height="64"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.5"
          strokeWidth="0.75"
          fill="none"
        />
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="64"
          stroke="#C89B3C"
          strokeOpacity="0.3"
          strokeWidth="0.5"
        />
        <line
          x1="0"
          y1="36"
          x2="50"
          y2="36"
          stroke="#C89B3C"
          strokeOpacity="0.3"
          strokeWidth="0.5"
        />
        {/* Kitchen counter */}
        <rect
          x="6"
          y="6"
          width="20"
          height="26"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.28"
          strokeWidth="0.5"
          fill="none"
        />
        <circle
          cx="12"
          cy="14"
          r="3"
          stroke="#C89B3C"
          strokeOpacity="0.28"
          strokeWidth="0.5"
          fill="none"
        />
        <circle
          cx="22"
          cy="14"
          r="3"
          stroke="#C89B3C"
          strokeOpacity="0.28"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Bath */}
        <rect
          x="6"
          y="40"
          width="20"
          height="18"
          rx="3"
          stroke="#C89B3C"
          strokeOpacity="0.25"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Bed */}
        <rect
          x="56"
          y="6"
          width="48"
          height="34"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.28"
          strokeWidth="0.5"
          fill="none"
        />
        <rect
          x="56"
          y="6"
          width="48"
          height="10"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.2"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Living sofa */}
        <rect
          x="56"
          y="48"
          width="48"
          height="12"
          rx="2"
          stroke="#C89B3C"
          strokeOpacity="0.28"
          strokeWidth="0.5"
          fill="none"
        />
      </g>

      {/* ── Key motif (bottom-right) ── */}
      <g transform="translate(395, 488)" opacity="0.6">
        <circle
          cx="16"
          cy="16"
          r="13"
          stroke="#C89B3C"
          strokeOpacity="0.5"
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx="16"
          cy="16"
          r="6"
          stroke="#C89B3C"
          strokeOpacity="0.35"
          strokeWidth="0.75"
          fill="none"
        />
        <rect
          x="27"
          y="13"
          width="44"
          height="6"
          rx="1.5"
          stroke="#C89B3C"
          strokeOpacity="0.5"
          strokeWidth="0.75"
          fill="none"
        />
        <rect
          x="55"
          y="7"
          width="5"
          height="12"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.4"
          strokeWidth="0.75"
          fill="none"
        />
        <rect
          x="64"
          y="9"
          width="5"
          height="10"
          rx="1"
          stroke="#C89B3C"
          strokeOpacity="0.4"
          strokeWidth="0.75"
          fill="none"
        />
      </g>

      {/* ── Dimension annotation lines ── */}
      <line
        x1="155"
        y1="540"
        x2="345"
        y2="540"
        stroke="#C89B3C"
        strokeOpacity="0.2"
        strokeWidth="0.5"
        strokeDasharray="3 3"
      />
      <line
        x1="155"
        y1="535"
        x2="155"
        y2="545"
        stroke="#C89B3C"
        strokeOpacity="0.2"
        strokeWidth="0.5"
      />
      <line
        x1="345"
        y1="535"
        x2="345"
        y2="545"
        stroke="#C89B3C"
        strokeOpacity="0.2"
        strokeWidth="0.5"
      />

      {/* ── Compass rose (top-right) ── */}
      <circle cx="460" cy="60" r="2" fill="#C89B3C" fillOpacity="0.45" />
      <circle
        cx="460"
        cy="60"
        r="10"
        stroke="#C89B3C"
        strokeOpacity="0.2"
        strokeWidth="0.5"
        fill="none"
      />
      <line
        x1="460"
        y1="46"
        x2="460"
        y2="74"
        stroke="#C89B3C"
        strokeOpacity="0.22"
        strokeWidth="0.5"
      />
      <line
        x1="446"
        y1="60"
        x2="474"
        y2="60"
        stroke="#C89B3C"
        strokeOpacity="0.22"
        strokeWidth="0.5"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Password strength indicator
// ─────────────────────────────────────────────────────────────────────────────
function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "",
    "bg-red-400",
    "bg-amber-400",
    "bg-yellow-400",
    "bg-emerald-500",
  ];
  return { score, label: labels[score], color: colors[score] };
}

function PasswordStrengthBar({ password }) {
  const { score, label, color } = getPasswordStrength(password);
  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? color : "bg-[#E5E7EB]"
            }`}
          />
        ))}
      </div>
      <p
        className={`text-xs ${score <= 1 ? "text-red-400" : score === 2 ? "text-amber-500" : score === 3 ? "text-yellow-600" : "text-emerald-600"}`}
      >
        {label}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Avatar Upload Zone
// ─────────────────────────────────────────────────────────────────────────────
function AvatarUpload({ preview, onFile }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    onFile(url);
  };

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [onFile],
  );

  return (
    <div className="flex items-center gap-4">
      {/* Avatar circle */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`
          relative w-16 h-16 rounded-full border-2 flex items-center justify-center cursor-pointer
          overflow-hidden flex-shrink-0 group transition-all duration-200
          ${dragging ? "border-[#C89B3C] scale-105" : "border-[#E5E7EB] hover:border-[#C89B3C]/60"}
        `}
        role="button"
        aria-label="Upload profile photo"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-[#3E4E50]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <Camera width={16} height={16} color="white" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1 text-[#9CA3AF] group-hover:text-[#C89B3C] transition-colors duration-200">
            <Camera width={18} height={18} />
          </div>
        )}
      </div>

      {/* Upload copy */}
      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-xs font-medium text-[#3E4E50] hover:text-[#C89B3C] transition-colors duration-150 underline underline-offset-2"
        >
          {preview ? "Change photo" : "Upload photo"}
        </button>
        <p className="text-xs text-[#9CA3AF] mt-0.5">
          PNG or JPG · max 5 MB · optional
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
        aria-label="Profile photo file input"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Reusable form field
// ─────────────────────────────────────────────────────────────────────────────
function Field({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  rightSlot,
  error,
  success,
  hint,
  autoComplete,
}) {
  const borderClass = error
    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
    : success
      ? "border-emerald-400 focus:border-emerald-400 focus:ring-emerald-50"
      : "border-[#E5E7EB] hover:border-[#3E4E50]/40 focus:border-[#3E4E50] focus:ring-[#3E4E50]/8";

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-[#1B1B1B] mb-1.5 tracking-wide"
      >
        {label}
      </label>
      <div className="relative">
        {/* Left icon */}
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none flex">
            <Icon width={14} height={14} />
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`
            w-full h-10 bg-white text-sm text-[#1B1B1B]
            border rounded-[6px] outline-none
            transition-all duration-150
            focus:ring-2
            placeholder:text-[#D1D5DB]
            ${Icon ? "pl-9" : "pl-3"}
            ${rightSlot ? "pr-10" : "pr-3"}
            ${borderClass}
          `}
        />
        {/* Right slot (toggle, check icon, etc.) */}
        {rightSlot && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {rightSlot}
          </span>
        )}
      </div>
      {/* Feedback line */}
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <Xmark width={11} height={11} /> {error}
        </p>
      )}
      {success && !error && (
        <p className="mt-1 text-xs text-emerald-600 flex items-center gap-1">
          <Check width={11} height={11} /> {success}
        </p>
      )}
      {hint && !error && !success && (
        <p className="mt-1 text-xs text-[#9CA3AF]">{hint}</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Progress steps for multi-step UX hint
// ─────────────────────────────────────────────────────────────────────────────
function StepDots({ current, total }) {
  return (
    <div className="flex items-center gap-1.5 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`transition-all duration-300 rounded-full ${
            i < current
              ? "w-4 h-1.5 bg-[#C89B3C]"
              : i === current
                ? "w-6 h-1.5 bg-[#3E4E50]"
                : "w-4 h-1.5 bg-[#E5E7EB]"
          }`}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Registration Page
// ─────────────────────────────────────────────────────────────────────────────
export default function NestrixRegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setTouched((t) => ({ ...t, [key]: true }));
  };

  // ── Validation ──────────────────────────────────────────────────────────
  const errors = {
    name:
      touched.name && form.name.trim().length < 2
        ? "Enter your full name"
        : null,
    email:
      touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ? "Enter a valid email address"
        : null,
    password:
      touched.password && form.password.length < 8
        ? "Password must be at least 8 characters"
        : null,
    confirm:
      touched.confirm && form.confirm !== form.password
        ? "Passwords do not match"
        : null,
  };

  const successes = {
    name: touched.name && !errors.name && form.name ? "Looks good" : null,
    email: touched.email && !errors.email && form.email ? "Valid email" : null,
    confirm:
      touched.confirm && !errors.confirm && form.confirm
        ? "Passwords match"
        : null,
  };

  const isValid =
    form.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.password.length >= 8 &&
    form.confirm === form.password;

  // Determine progress for step dots (0-based field completion)
  const fieldsComplete = [
    form.name.trim().length >= 2,
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    form.password.length >= 8,
    form.confirm === form.password && form.confirm.length > 0,
  ].filter(Boolean).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirm: true });
    if (!isValid) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  // ── Success state ───────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FCFCFA] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-full border-2 border-[#C89B3C] flex items-center justify-center mx-auto mb-5">
            <Check width={22} height={22} color="#C89B3C" />
          </div>
          <p className="text-xs text-[#C89B3C] font-medium tracking-widest uppercase mb-2">
            Account created
          </p>
          <h2 className="text-2xl font-semibold text-[#1B1B1B] tracking-tight">
            Welcome to Nestrix, {form.name.split(" ")[0]}
          </h2>
          <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
            Your account is ready. Start exploring verified rental properties
            curated just for you.
          </p>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 bg-[#3E4E50] text-white text-sm font-medium px-6 py-2.5 rounded-[6px] hover:bg-[#344244] transition-colors duration-200"
          >
            Explore properties <ArrowRight width={14} height={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFCFA] flex flex-col lg:flex-row">
      {/* ── LEFT: Architectural Hero ────────────────────────────────────────── */}
      <div
        className="relative lg:w-[52%] flex flex-col justify-between overflow-hidden"
        style={{
          background:
            "linear-gradient(155deg, #2C3A3C 0%, #3E4E50 50%, #334446 100%)",
        }}
      >
        {/* Top-left corner bracket mark */}
        <div className="absolute top-0 left-0 w-14 h-14 opacity-30">
          <svg viewBox="0 0 56 56" fill="none">
            <path
              d="M0 0 L56 0 L56 3.5 L3.5 3.5 L3.5 56 L0 56 Z"
              fill="#C89B3C"
            />
          </svg>
        </div>
        {/* Bottom-right corner bracket mark */}
        <div className="absolute bottom-0 right-0 w-14 h-14 opacity-20">
          <svg viewBox="0 0 56 56" fill="none">
            <path
              d="M56 56 L0 56 L0 52.5 L52.5 52.5 L52.5 0 L56 0 Z"
              fill="#C89B3C"
            />
          </svg>
        </div>

        {/* Nav bar */}
        <div className="relative z-10 px-8 pt-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 border border-[#C89B3C] flex items-center justify-center">
              <span className="text-[#C89B3C] font-semibold text-sm leading-none">
                N
              </span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              Nestrix
            </span>
          </div>
          <a
            href="/login"
            className="text-xs text-[#C89B3C] border border-[#C89B3C]/50 px-3 py-1.5 hover:border-[#C89B3C] transition-all duration-200 tracking-wide"
          >
            Sign in
          </a>
        </div>

        {/* Illustration */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-4">
          <ArchitecturalIllustration />
        </div>

        {/* Hero copy */}
        <div className="relative z-10 px-8 pb-10">
          <div className="w-8 h-px bg-[#C89B3C] mb-5" />
          <h1 className="text-white text-2xl lg:text-[1.65rem] font-semibold leading-snug tracking-tight max-w-xs">
            Start Your
            <br />
            <span className="text-[#C89B3C]">Rental Journey</span>
          </h1>
          <p className="mt-3 text-sm text-white/52 leading-relaxed max-w-[280px]">
            Join Nestrix and explore trusted properties, secure bookings, and
            seamless rental experiences.
          </p>

          {/* Feature pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            {["Verified listings", "Secure payments", "24/7 support"].map(
              (f) => (
                <span
                  key={f}
                  className="text-xs text-[#C89B3C] border border-[#C89B3C]/30 px-2.5 py-1 rounded-[4px]"
                >
                  {f}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Registration Form ────────────────────────────────────────── */}
      <div className="lg:w-[48%] flex items-center justify-center px-6 py-12 lg:py-0">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 border border-[#3E4E50] flex items-center justify-center">
              <span className="text-[#3E4E50] font-semibold text-xs">N</span>
            </div>
            <span className="text-[#1B1B1B] font-semibold text-base tracking-tight">
              Nestrix
            </span>
          </div>

          {/* Form header */}
          <div className="mb-6">
            <p className="text-xs text-[#C89B3C] font-medium tracking-widest uppercase mb-2">
              New account
            </p>
            <h2 className="text-[#1B1B1B] text-2xl font-semibold tracking-tight leading-tight">
              Create your account
            </h2>
            <p className="mt-1.5 text-sm text-[#6B7280]">
              Set up your profile to start exploring properties.
            </p>
          </div>

          {/* Step progress dots */}
          <StepDots current={fieldsComplete} total={4} />

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Avatar */}
            <div>
              <p className="text-xs font-medium text-[#1B1B1B] mb-2 tracking-wide">
                Profile photo
              </p>
              <AvatarUpload preview={avatarPreview} onFile={setAvatarPreview} />
            </div>

            {/* Thin rule */}
            <div className="h-px bg-[#E5E7EB] my-1" />

            {/* Full name */}
            <Field
              id="name"
              label="Full name"
              placeholder="Sarah Chen"
              value={form.name}
              onChange={set("name")}
              icon={Person}
              error={errors.name}
              success={successes.name}
              autoComplete="name"
            />

            {/* Email */}
            <Field
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set("email")}
              icon={At}
              error={errors.email}
              success={successes.email}
              autoComplete="email"
            />

            {/* Password */}
            <div>
              <Field
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={set("password")}
                icon={Lock}
                error={errors.password}
                autoComplete="new-password"
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="text-[#9CA3AF] hover:text-[#3E4E50] transition-colors duration-150"
                  >
                    {showPassword ? (
                      <EyeSlash width={15} height={15} />
                    ) : (
                      <Eye width={15} height={15} />
                    )}
                  </button>
                }
              />
              <PasswordStrengthBar password={form.password} />
            </div>

            {/* Confirm password */}
            <Field
              id="confirm"
              label="Confirm password"
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={set("confirm")}
              icon={Lock}
              error={errors.confirm}
              success={successes.confirm}
              autoComplete="new-password"
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  className="text-[#9CA3AF] hover:text-[#3E4E50] transition-colors duration-150"
                >
                  {showConfirm ? (
                    <EyeSlash width={15} height={15} />
                  ) : (
                    <Eye width={15} height={15} />
                  )}
                </button>
              }
            />

            {/* Terms micro-copy */}
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              By creating an account you agree to Nestrix's{" "}
              <a
                href="#"
                className="underline hover:text-[#6B7280] transition-colors"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline hover:text-[#6B7280] transition-colors"
              >
                Privacy Policy
              </a>
              .
            </p>

            {/* Submit */}
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
                  disabled:opacity-60 disabled:cursor-not-allowed
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-[#3E4E50] focus-visible:ring-offset-2
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
                    Creating account…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create account
                    <ArrowRight width={14} height={14} />
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* OR Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#E5E7EB]" />
            <span className="text-xs text-[#9CA3AF] tracking-widest uppercase font-medium">
              or
            </span>
            <div className="flex-1 h-px bg-[#E5E7EB]" />
          </div>

          {/* Google SSO */}
          <button
            type="button"
            className="
              w-full h-10 flex items-center justify-center gap-2.5
              bg-white text-[#1B1B1B] text-sm font-medium
              border border-[#E5E7EB] rounded-[6px]
              transition-all duration-200
              hover:bg-[#FCFCFA] hover:border-[#D1D5DB]
              active:scale-[0.99]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#3E4E50] focus-visible:ring-offset-2
            "
          >
            <Google width={16} height={16} />
            Continue with Google
          </button>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-[#6B7280]">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#3E4E50] font-medium hover:text-[#C89B3C] transition-colors duration-150"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
