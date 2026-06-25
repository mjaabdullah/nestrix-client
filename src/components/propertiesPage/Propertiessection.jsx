"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RiCloseLine } from "react-icons/ri";
import SearchPanel from "../herosection/SearchPanel";
import EmptyState from "./Emptystate";
import Pagination from "./Pagination";
import PropertyCard from "./PropertyCard";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function PropertiesSection({
  properties,
  total,
  totalPages,
  currentPage,
  searchQuery,
  typeFilter,
  sortOrder,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all" || value === "default") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    router.push(pathname);
  };

  const activeFilters = [
    searchQuery && { label: `"${searchQuery}"`, key: "search" },
    typeFilter && typeFilter !== "all" && { label: typeFilter, key: "type" },
    sortOrder === "price_asc" && { label: "Price: Low → High", key: "sort" },
    sortOrder === "price_desc" && { label: "Price: High → Low", key: "sort" },
  ].filter(Boolean);

  return (
    <>
      {/* Filter Bar */}
      <section className="border-b border-border bg-secondary/40">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-6"
        >
          <SearchPanel />
        </motion.div>
      </section>

      {/* Results + Grid */}
      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-semibold">{total}</span>{" "}
            {total === 1 ? "property" : "properties"}
          </p>

          {activeFilters.length > 0 && (
            <>
              <span className="text-border select-none">|</span>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => updateParam(f.key, "")}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border text-xs text-foreground hover:bg-secondary transition-colors"
                  >
                    {f.label}
                    <RiCloseLine className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                ))}
                <button
                  onClick={handleReset}
                  className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  Clear all
                </button>
              </div>
            </>
          )}
        </motion.div>

        {/* Grid or Empty */}
        <AnimatePresence mode="wait">
          {properties.length === 0 ? (
            <EmptyState key="empty" onReset={handleReset} />
          ) : (
            <motion.div
              key={`grid-p${currentPage}-s${searchQuery}-t${typeFilter}-o${sortOrder}`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {properties.map((property) => (
                <motion.div key={property.id} variants={gridItem}>
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {properties.length > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </main>
    </>
  );
}
