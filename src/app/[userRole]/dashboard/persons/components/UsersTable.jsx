"use client";

import { Avatar, ListBox, Select, Spinner, Table } from "@heroui/react";
import { FiUsers } from "react-icons/fi";
import RoleBadge from "./RoleBadge";
import { ROLES, formatDate } from "./UsersApi";

// ── Helper: name → initials (e.g. "Arif Hossain" → "AH") ──────────────────
const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

// ── Skeleton rows shown while loading ─────────────────────────────────────
const SkeletonRows = ({ count }) =>
  Array.from({ length: count }).map((_, i) => (
    <Table.Row key={`skel-${i}`} id={`skel-${i}`}>
      <Table.Cell>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-muted animate-pulse shrink-0" />
          <div className="space-y-1.5">
            <div className="h-3 w-28 bg-muted animate-pulse rounded" />
            <div className="h-2 w-36 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="h-5 w-16 bg-muted animate-pulse rounded-full" />
      </Table.Cell>
      <Table.Cell>
        <div className="h-3 w-20 bg-muted animate-pulse rounded" />
      </Table.Cell>
      <Table.Cell>
        <div className="h-8 w-28 bg-muted animate-pulse rounded-lg" />
      </Table.Cell>
    </Table.Row>
  ));

// ── Main Table ─────────────────────────────────────────────────────────────
const UsersTable = ({
  users,
  loading,
  updatingId,
  rowsPerPage,
  onRoleSelect,
}) => (
  // Table.ScrollContainer handles horizontal scroll — overflow-x-auto wrapper no longer needed
  <Table>
    <Table.ScrollContainer>
      <Table.Content
        aria-label="All users table"
        className="[&_thead_th]:bg-muted [&_thead_th]:text-muted-foreground [&_thead_th]:text-xs [&_thead_th]:font-semibold [&_thead_th]:uppercase [&_thead_th]:tracking-wide [&_tbody_td]:py-3 [&_tbody_td]:text-sm [&_tbody_td]:text-foreground [&_tbody_td]:border-b [&_tbody_td]:border-border [&_tbody_tr]:hover:bg-muted [&_tbody_tr]:transition-colors"
      >
        {/* ── Header ── */}
        <Table.Header>
          <Table.Column id="user">User</Table.Column>
          <Table.Column id="role">Role</Table.Column>
          <Table.Column id="joined">Joined</Table.Column>
          <Table.Column id="actions">Change Role</Table.Column>
        </Table.Header>

        {/* ── Body ── */}
        <Table.Body
          renderEmptyState={() =>
            loading ? null : (
              <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
                <FiUsers className="text-3xl opacity-40" />
                <p className="text-sm">No users found</p>
              </div>
            )
          }
        >
          {loading
            ? /* Skeleton rows */ SkeletonRows({ count: rowsPerPage })
            : /* Real rows */
              users.map((user) => (
                <Table.Row key={user._id} id={user._id}>
                  {/* ── Avatar + name + email ── */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        size="sm"
                        className="shrink-0 bg-primary text-primary-foreground font-semibold text-xs"
                      >
                        {user.photo ? (
                          <Avatar.Image src={user.photo} alt={user.name} />
                        ) : null}
                        <Avatar.Fallback>
                          {getInitials(user.name)}
                        </Avatar.Fallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate leading-tight">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* ── Role badge ── */}
                  <Table.Cell>
                    <RoleBadge role={user.role} />
                  </Table.Cell>

                  {/* ── Join date ── */}
                  <Table.Cell>
                    <span className="text-muted-foreground text-xs">
                      {formatDate(user.createdAt)}
                    </span>
                  </Table.Cell>

                  {/* ── Role change dropdown ── */}
                  <Table.Cell>
                    {updatingId === user._id ? (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Spinner size="sm" className="text-primary" />
                        <span>Updating…</span>
                      </div>
                    ) : (
                      <Select
                        aria-label="Change role"
                        value={user.role}
                        onChange={(e) => onRoleSelect(user._id, e.target.value)}
                        isDisabled={!!updatingId}
                        className="w-28"
                      >
                        <Select.Trigger className="border border-border bg-background h-8 min-h-8 text-xs text-foreground rounded-lg px-2">
                          <Select.Value className="text-xs text-foreground" />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover className="bg-background border border-border rounded-lg">
                          <ListBox>
                            {ROLES.map((r) => (
                              <ListBox.Item
                                key={r}
                                id={r}
                                textValue={
                                  r.charAt(0).toUpperCase() + r.slice(1)
                                }
                                className="text-foreground data-[focused=true]:bg-muted px-2 py-1.5 text-xs cursor-pointer"
                              >
                                <RoleBadge role={r} />
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
      </Table.Content>
    </Table.ScrollContainer>
  </Table>
);

export default UsersTable;
