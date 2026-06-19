"use client";
import {
  ArrowRight,
  At,
  Camera,
  Check,
  Eye,
  EyeSlash,
  Lock,
  Person,
  Xmark,
} from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import GoogleSignIn from "../shared/auth/GoogleSignIn";
import OrDivider from "../shared/auth/OrDivider";

// Password strength indicator

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

// Avatar Upload Zone

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
            <Image
              src={preview}
              width={64}
              height={64}
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

// Reusable form field

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

// Progress steps for multi-step UX hint

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

const RegistrationForm = () => {
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
    const userData = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      avatar: avatarPreview,
    };
    if (!isValid) return;
    setIsLoading(true);
    console.log(userData, "prevSub");

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
          <Link
            href="/properties"
            className="mt-6 inline-flex items-center gap-2 bg-[#3E4E50] text-white text-sm font-medium px-6 py-2.5 rounded-[6px] hover:bg-[#344244] transition-colors duration-200"
          >
            Explore properties <ArrowRight width={14} height={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" lg:w-[48%] flex items-center justify-center px-6 py-12 lg:py-0">
      <div className="w-full max-w-120">
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
            placeholder="Enter your full name"
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
            placeholder="Enter your email"
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
              placeholder="Enter a strong password"
              value={form.password}
              onChange={set("password")}
              icon={Lock}
              error={errors.password}
              autoComplete="new-password"
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
        <OrDivider />

        {/* Google SSO */}
        <GoogleSignIn />

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-[#6B7280]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#3E4E50] font-medium hover:text-[#C89B3C] transition-colors duration-150"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
