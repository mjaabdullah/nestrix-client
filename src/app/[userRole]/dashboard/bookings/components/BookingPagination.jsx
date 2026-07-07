import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
export default function BookingPagination({ currentPage, totalPages }) {
  const previousPageNumber = currentPage > 1 ? currentPage - 1 : 1;
  const nextPageNumber =
    currentPage < totalPages ? currentPage + 1 : totalPages;

  return (
    <nav
      aria-label="Server Pagination"
      className="flex items-center justify-between pt-6 border-t border-border mt-4"
    >
      <div className="text-xs md:text-sm text-muted-foreground font-medium">
        Showing Page{" "}
        <span className="text-foreground font-semibold">{currentPage}</span> of{" "}
        <span className="text-foreground font-semibold">{totalPages}</span>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`?page=${previousPageNumber}`}
          aria-label="Navigate to previous page"
          className={`inline-flex items-center justify-center p-2 rounded-xl border border-border bg-background text-foreground transition-colors ${
            currentPage === 1
              ? "pointer-events-none opacity-40"
              : "hover:bg-secondary text-foreground"
          }`}
        >
          <FiChevronLeft size={16} />
        </Link>

        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
          (pageIdx) => (
            <Link
              key={pageIdx}
              href={`?page=${pageIdx}`}
              aria-current={pageIdx === currentPage ? "page" : undefined}
              className={`hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-xl text-xs font-semibold tracking-tight transition-colors border ${
                pageIdx === currentPage
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-secondary"
              }`}
            >
              {pageIdx}
            </Link>
          ),
        )}

        <Link
          href={`?page=${nextPageNumber}`}
          aria-label="Navigate to next page"
          className={`inline-flex items-center justify-center p-2 rounded-xl border border-border bg-background text-foreground transition-colors ${
            currentPage === totalPages
              ? "pointer-events-none opacity-40"
              : "hover:bg-secondary text-foreground"
          }`}
        >
          <FiChevronRight size={16} />
        </Link>
      </div>
    </nav>
  );
}
