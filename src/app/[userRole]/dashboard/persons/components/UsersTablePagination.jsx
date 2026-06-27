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

      <Pagination
        total={totalPages}
        page={page}
        onChange={onPageChange}
        size="sm"
        showControls
        classNames={{
          cursor: "bg-primary text-primary-foreground",
          item: "text-foreground bg-transparent hover:bg-muted",
          prev: "text-foreground bg-transparent hover:bg-muted",
          next: "text-foreground bg-transparent hover:bg-muted",
        }}
      />
    </div>
  );
};

export default UsersTablePagination;
