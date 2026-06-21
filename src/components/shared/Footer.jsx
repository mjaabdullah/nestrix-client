"use client";

import { Clock, Envelope, Handset, MapPin } from "@gravity-ui/icons";
import Link from "next/link";
import { useState } from "react";
import NestrixLogo from "./NestrixLogo";

function XIcon({ className, size = 20 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const Footer = () => {
  const [email, setEmail] = useState("");
  const EXPLORE_LINKS = [
    { label: "Home", href: "/" },
    { label: "All Properties", href: "/properties" },
    { label: "Featured Listings", href: "/properties" },
    { label: "Top Locations", href: "/properties" },
  ];

  const RESOURCE_LINKS = [
    { label: "Help Center", href: "/" },
    { label: "Privacy Policy", href: "/" },
    { label: "Terms & Conditions", href: "/" },
    { label: "FAQ", href: "/" },
  ];

  const CONTACT_INFO = [
    { icon: Envelope, label: "hello@nestrix.com" },
    { icon: Handset, label: "+1 (555) 123-4567" },
    {
      icon: MapPin,
      label: "123 Luxury Lane, Suite 400\nNew York, NY 10001",
    },
    { icon: Clock, label: "Mon – Fri: 9:00 AM – 6:00 PM" },
  ];

  const SOCIALS = [
    { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
    {
      icon: InstagramIcon,
      label: "Instagram",
      href: "https://instagram.com",
    },
    { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: XIcon, label: "X", href: "https://x.com" },
  ];

  return (
    <footer className="w-full bg-background">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        {/* ── Top grid ── */}
        <div className="grid grid-cols-1 gap-10 py-10 sm:py-14  sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <NestrixLogo />
            </Link>

            <p className="text-sm leading-relaxed max-w-xs text-muted-foreground">
              Helping people discover and book their ideal rental properties
              with confidence.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:scale-105 text-muted-foreground hover:text-accent"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
              Explore
            </h3>
            <ul className="flex flex-col gap-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-accent text-muted-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
              Resources
            </h3>
            <ul className="flex flex-col gap-3">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-accent text-muted-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
              Contact
            </h3>
            <ul className="flex flex-col gap-3.5">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-start gap-3">
                    <Icon
                      width={16}
                      height={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--brand-accent)" }}
                    />
                    <span className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ── Newsletter ── */}
        <div
          className="flex flex-col items-center gap-5 rounded-2xl px-6 py-5 sm:px-10"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-muted-foreground">
              Subscribe to our newsletter
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get the latest listings and market insights delivered to your
              inbox.
            </p>
          </div>

          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="h-12 flex-1 rounded-xl py-3 px-4 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-accent"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "var(--brand-footer-text)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
            <button
              type="button"
              onClick={() => {
                // TODO: newsletter subscribe logic
                setEmail("");
              }}
              className="h-12 shrink-0 rounded-xl px-6 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #D9AE52 0%, #C89B3C 100%)",
                boxShadow: "0 4px 14px rgba(200,155,60,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(200,155,60,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 14px rgba(200,155,60,0.25)";
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="my-6 sm:my-10 h-px w-full bg-accent/25" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-4 pb-10 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nestrix. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies Policy"].map(
              (label) => (
                <Link
                  key={label}
                  href="/"
                  className="text-xs transition-colors duration-200 hover:text-accent text-muted-foreground"
                >
                  {label}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
