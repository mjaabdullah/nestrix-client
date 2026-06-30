"use client";

import { Pagination } from "@heroui/react";

const UsersTablePagination = ({
  page,
  totalPages,
  totalFiltered,
  rowsPerPage,
  onPageChange,
}) => {
  const from = (page - 1) * rowsPerPage + 1;
  const to = Math.min(page * rowsPerPage, totalFiltered);

  // Build the visible page-number window: first page, last page, current
  // page ± 1, with ellipses for any gaps. Falls back to showing every page
  // when totalPages is small enough that no collapsing is needed.
  const pageNumbers = [];
  if (totalPages <= 7) {
    for (let p = 1; p <= totalPages; p++) pageNumbers.push(p);
  } else {
    pageNumbers.push(1);
    if (page > 3) pageNumbers.push("ellipsis-start");
    for (
      let p = Math.max(2, page - 1);
      p <= Math.min(totalPages - 1, page + 1);
      p++
    ) {
      pageNumbers.push(p);
    }
    if (page < totalPages - 2) pageNumbers.push("ellipsis-end");
    pageNumbers.push(totalPages);
  }

  return (
    <div className="mt-4 flex justify-between items-center flex-wrap gap-3">
      <p className="text-xs text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {from}–{to}
        </span>{" "}
        of <span className="font-medium text-foreground">{totalFiltered}</span>{" "}
        users
      </p>

      <Pagination>
        <Pagination.Content>
          {/* ── Previous ── */}
          <Pagination.Item>
            <Pagination.Previous
              isDisabled={page === 1}
              onPress={() => onPageChange(Math.max(1, page - 1))}
              className="text-foreground bg-transparent hover:bg-muted"
            >
              <Pagination.PreviousIcon />
            </Pagination.Previous>
          </Pagination.Item>

          {/* ── Page numbers (with collapsing) ── */}
          {pageNumbers.map((p, i) =>
            typeof p === "number" ? (
              <Pagination.Item key={p}>
                <Pagination.Link
                  isActive={page === p}
                  onPress={() => onPageChange(p)}
                  className={
                    page === p
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground bg-transparent hover:bg-muted"
                  }
                >
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ) : (
              <Pagination.Item key={`${p}-${i}`}>
                <Pagination.Ellipsis />
              </Pagination.Item>
            ),
          )}

          {/* ── Next ── */}
          <Pagination.Item>
            <Pagination.Next
              isDisabled={page === totalPages}
              onPress={() => onPageChange(Math.min(totalPages, page + 1))}
              className="text-foreground bg-transparent hover:bg-muted"
            >
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
};;

export default UsersTablePagination;
