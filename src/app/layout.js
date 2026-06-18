import NavBar from "@/components/shared/NavBar";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nestrix | Discover, Book & Manage Rental Properties with Confidence",
  description:
    "Nestrix is a modern property rental and booking platform that helps tenants discover verified homes, book properties securely, and connect with trusted property owners through a seamless and transparent rental experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
