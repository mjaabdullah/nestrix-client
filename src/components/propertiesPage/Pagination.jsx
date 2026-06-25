"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (p) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`${pathname}?${params.toString()}`);
  };

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis-start");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      )
        pages.push(i);
      if (currentPage < totalPages - 2) pages.push("ellipsis-end");
      pages.push(totalPages);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex items-center justify-center gap-1.5 pt-12"
    >
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
      >
        <RiArrowLeftSLine className="w-4 h-4" />
        Prev
      </button>

      <div className="flex items-center gap-1">
        {getPages().map((p) =>
          typeof p === "string" ? (
            <span
              key={p}
              className="px-2 text-muted-foreground text-sm select-none"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                p === currentPage
                  ? "bg-foreground text-background shadow-sm"
                  : "border border-border text-foreground hover:bg-secondary"
              }`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm text-foreground disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed hover:bg-secondary transition-colors"
      >
        Next
        <RiArrowRightSLine className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
