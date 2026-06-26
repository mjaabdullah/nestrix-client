"use client";

import { usePathname } from "next/navigation";
import Footer from "./shared/Footer";
import NavBar from "./shared/NavBar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <>
      {!isDashboard && <NavBar />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}
