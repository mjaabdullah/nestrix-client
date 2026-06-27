"use client";

import { Input } from "@heroui/react";
import { FiSearch } from "react-icons/fi";

const UsersTableToolbar = ({ search, onSearchChange }) => (
  <div className="mb-4">
    <Input
      placeholder="Search by name or email…"
      value={search}
      onValueChange={onSearchChange}
      startContent={<FiSearch className="text-muted-foreground shrink-0" />}
      variant="bordered"
      classNames={{
        base: "max-w-sm",
        inputWrapper: "border-border bg-background",
        input: "text-foreground placeholder:text-muted-foreground",
      }}
    />
  </div>
);

export default UsersTableToolbar;
