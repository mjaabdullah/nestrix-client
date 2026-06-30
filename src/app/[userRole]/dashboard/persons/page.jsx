"use client";

import { toast } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";

import { useSession } from "@/lib/auth-client";
import AccessDenied from "./components/AccessDenied";
import RoleChangeConfirmModal from "./components/RoleChangeConfirmModal";
import UserStatsCards from "./components/UserStatsCards";
import {
  fetchUsers,
  patchUserRole,
  ROWS_PER_PAGE,
} from "./components/UsersApi";
import UsersTable from "./components/UsersTable";
import UsersTablePagination from "./components/UsersTablePagination";
import UsersTableToolbar from "./components/UsersTableToolbar";

const MOCK_CURRENT_USER = { role: "admin" };

const AllUsersPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const currentUser = user || MOCK_CURRENT_USER;

  // ── State ────────────────────────────────────────────────────────────────
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState(null);
  const [pendingChange, setPendingChange] = useState(null); // { userId, newRole, userName }

  //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // ── Fetch users on mount ─────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const userData = await fetchUsers();
        if (userData?.success) {
          setUsers(userData?.data);
          setLoading(false);
        }
      } catch {
        toast.warning("Failed to load users");
      } finally {
        if (userData?.success) {
          setLoading(false);
        }
      }
    };
    load();
  }, []);

  // ── Derived: filtered list + pagination ──────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    );
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE,
  );

  // ── Derived: stat counts ─────────────────────────────────────────────────
  const stats = useMemo(
    () => ({
      total: users.length,
      admin: users.filter((u) => u.role === "admin").length,
      owner: users.filter((u) => u.role === "owner").length,
      tenant: users.filter((u) => u.role === "tenant").length,
    }),
    [users],
  );

  // ── Handlers ─────────────────────────────────────────────────────────────

  // Step 1: user selects a new role → open confirm modal
  const handleRoleSelect = (userId, newRole) => {
    const user = users.find((u) => u._id === userId);
    if (!user || user.role === newRole) return;
    setPendingChange({ userId, newRole, userName: user.name });
    openModal();
  };

  // Step 2: user confirms in modal → call API
  const handleConfirmRoleChange = async () => {
    if (!pendingChange) return;
    const { userId, newRole } = pendingChange;

    setUpdatingId(userId);
    closeModal();

    try {
      await patchUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)),
      );
      toast.success("Role updated successfully");
    } catch {
      toast.danger("Failed to update role");
    } finally {
      setUpdatingId(null);
      setPendingChange(null);
    }
  };

  // Step 3: search → reset to page 1
  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  // ── Guard: non-admin users ───────────────────────────────────────────────
  if (currentUser.role !== "admin") return <AccessDenied />;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen bg-background">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <MdAdminPanelSettings className="text-primary-foreground text-lg" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              All Users
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage platform members and their access roles
            </p>
          </div>
        </div>
      </div>

      {/* Stat Cards — only after data loads */}
      {!loading && <UserStatsCards stats={stats} />}

      {/* Table Card */}
      <div className="bg-secondary border border-border rounded-xl p-5">
        {/* Search bar */}
        <UsersTableToolbar
          search={search}
          onSearchChange={handleSearchChange}
        />

        {/* Users table */}
        <UsersTable
          users={paginated}
          loading={loading}
          updatingId={updatingId}
          rowsPerPage={ROWS_PER_PAGE}
          onRoleSelect={handleRoleSelect}
        />

        {/* Pagination — only when there's more than one page */}
        {!loading && filtered.length > ROWS_PER_PAGE && (
          <UsersTablePagination
            page={page}
            totalPages={totalPages}
            totalFiltered={filtered.length}
            rowsPerPage={ROWS_PER_PAGE}
            onPageChange={setPage}
          />
        )}

        {/* No search results message */}
        {!loading && users.length > 0 && filtered.length === 0 && (
          <div className="flex flex-col items-center py-10 gap-2 text-muted-foreground">
            <FiSearch className="text-2xl opacity-40" />
            <p className="text-sm">No users match &ldquo;{search}&rdquo;</p>
          </div>
        )}
      </div>

      {/* Role change confirmation modal */}
      <RoleChangeConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        pendingChange={pendingChange}
        onConfirm={handleConfirmRoleChange}
      />
    </div>
  );
};

export default AllUsersPage;
