"use client";

import { toast, useOverlayState } from "@heroui/react";
import { useEffect, useState } from "react";

import { useSession } from "@/lib/auth-client";
import { getFavoritesByUser, removeFromFavorites } from "@/lib/core/property";
import FavoritesDeleteModal from "./components/FavoritesDeleteModal";
import FavoritesHeader from "./components/FavoritesHeader";
import FavoritesPagination from "./components/FavoritesPagination";
import FavoritesTable from "./components/FavoritesTable";
import FavoritesToolbar from "./components/FavoritesToolbar";

const FavoritesPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  // ── State ──────────────────────────────────────────────────────────────
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);

  const totalPages = 2;

  // useOverlayState
  const modalState = useOverlayState();

  const getFavoritesForUser = async () => {
    try {
      setIsLoading(true);

      const data = await getFavoritesByUser(user.id);

      setFavorites(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    getFavoritesForUser();
  }, [user?.id]);

  // ── Reset page on search change ────────────────────────────────────────
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  // ── Remove handlers ────────────────────────────────────────────────────
  const handleRemoveClick = (item) => {
    setSelectedItem(item);

    modalState.open();
  };

  const handleConfirmRemove = async () => {
    if (!selectedItem) return;
    setIsDeleting(true);

    const removeItem = {
      userId: user?.id,
      propertyId: selectedItem.propertyId,
    };

    try {
      const res = await removeFromFavorites(removeItem);
      if (!res.success) {
        toast.warning(res.message);
      }
      if (res.success) {
        toast.success(res.message);
        getFavoritesForUser();
      }
    } catch (err) {
      console.error(err);

      toast.error("Failed to remove item");
    } finally {
      setIsDeleting(false);
      modalState.close();
      setSelectedItem(null);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Page heading */}
      <FavoritesHeader />

      {/* Card wrapper */}
      <div className="bg-secondary border border-border rounded-xl p-5">
        {/* Search + badge — hidden while loading */}
        {!isLoading && (
          <FavoritesToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalCount={favorites.length}
          />
        )}

        {/* Table */}
        <FavoritesTable
          items={favorites}
          isLoading={isLoading}
          hasSearch={!!searchQuery}
          onRemoveClick={handleRemoveClick}
        />

        {/* Pagination */}
        {!isLoading && (
          <FavoritesPagination
            totalPages={totalPages}
            page={page}
            onPageChange={setPage}
          />
        )}
      </div>

      {/* Delete confirmation modal — state prop দিয়ে v3 Modal control */}
      <FavoritesDeleteModal
        state={modalState}
        selectedItem={selectedItem}
        isDeleting={isDeleting}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
};

export default FavoritesPage;
