"use client";
import Link from "next/link";

const NavLink = ({ href, label, pathName }) => {
  const isActive = pathName === href;
  return (
    <Link
      className={`px-4 py-2 text-[15px] md:text-muted-foreground font-semibold hover:text-foreground rounded-md md:rounded-none hover:bg-muted ${isActive ? "bg-accent text-accent-foreground md:bg-transparent md:border-b-2 md:border-accent" : ""}`}
      href={href}
    >
      {label}
    </Link>
  );
};

export default NavLink;
