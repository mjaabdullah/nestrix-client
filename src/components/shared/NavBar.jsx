"use client";
import { authClient, useSession } from "@/lib/auth-client";
import { Bars, Xmark } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import NavLink from "./NavLink";
import NestrixLogo from "./NestrixLogo";

const NavBar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogOut = async () => {
    await authClient.signOut();

    router.push("/login");
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "All Properties", href: "/properties" },
  ];

  const userRole = user?.role || null; //"tenant";
  const isLoggedIn = !!user; // true;

  const btnOutline =
    "inline-flex items-center justify-center h-10 px-[18px] text-[15px] font-semibold text-[#3E4E50] bg-white border border-[#E5E7EB] rounded-xl transition-all duration-200 hover:border-[#3E4E50] hover:bg-[#3E4E50]/5 hover:-translate-y-px";

  const btnAccent =
    "inline-flex items-center justify-center h-10 px-[18px] text-[15px] font-semibold text-white rounded-xl shadow-[0_4px_12px_rgba(200,155,60,0.25)] bg-gradient-to-br from-[#D9AE52] to-[#C89B3C] cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(200,155,60,0.35)]";

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E5E7EB] shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_16px_rgba(16,24,40,0.04)]">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 sm:px-8">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <NestrixLogo />
        </Link>

        {/* Center: Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              pathName={pathName}
            />
          ))}
        </nav>

        {/* Right: Auth */}
        <div className="hidden lg:flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link href="/login" className={btnOutline}>
                Login
              </Link>
              <Link href="/register" className={btnAccent}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href={`/${userRole}/dashboard`}>
                <Button
                  variant="outline"
                  className={`rounded-lg hover:text-foreground ${pathName == `/${userRole}/dashboard` ? "border border-accent text-accent" : "text-primary"}`}
                >
                  Dashboard
                </Button>
              </Link>
              <button className={btnAccent} onClick={handleLogOut}>
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl text-[#3E4E50] hover:bg-[#3E4E50]/5 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <Xmark className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden bg-white transition-[max-height,opacity] duration-300 ease-out ${
          open
            ? "max-h-[520px] opacity-100 border-t border-[#E5E7EB]"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 sm:px-8 py-5 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              pathName={pathName}
              onClick={() => setOpen(false)}
            />
          ))}
          <div className="mt-4 flex flex-col gap-2.5">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className={`${btnOutline} w-full`}
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`${btnAccent} w-full`}
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={`/${userRole}/dashboard`}
                  onClick={() => setOpen(false)}
                >
                  <Button
                    variant="outline"
                    className={`rounded-lg w-full hover:text-foreground ${pathName == `/${userRole}/dashboard` ? "border border-accent text-accent" : "text-primary"}`}
                  >
                    Dashboard
                  </Button>
                </Link>
                <button className={`${btnAccent} w-full`}>Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
