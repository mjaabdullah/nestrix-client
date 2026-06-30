import { TrashBin } from "@gravity-ui/icons";
import { Button, Table } from "@heroui/react";
import Image from "next/image";
import { FiCalendar, FiHeart, FiMapPin } from "react-icons/fi";

import FavoritesEmptyState from "./FavoritesEmptyState";
import FavoritesSkeletonRow from "./FavoritesSkeletonRow";

// ── Helpers ────────────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatPrice = (price) => {
  if (!price) return "—";
  return `৳ ${Number(price).toLocaleString("en-IN")}`;
};

// ── Component ──────────────────────────────────────────────────────────────
const FavoritesTable = ({ items, isLoading, hasSearch, onRemoveClick }) => {
  const showEmptyState = !isLoading && items.length === 0;

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Favorites table">
            <Table.Header className="bg-muted">
              <Table.Column className="text-muted-foreground text-xs font-semibold uppercase tracking-wide border-b border-border">
                Property
              </Table.Column>
              <Table.Column className="text-muted-foreground text-xs font-semibold uppercase tracking-wide border-b border-border">
                Price
              </Table.Column>
              <Table.Column className="text-muted-foreground text-xs font-semibold uppercase tracking-wide border-b border-border">
                Added Date
              </Table.Column>
              <Table.Column className="text-muted-foreground text-xs font-semibold uppercase tracking-wide border-b border-border">
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {isLoading
                ? // ── Skeleton rows ──
                  Array.from({ length: 5 }).map((_, i) => (
                    <FavoritesSkeletonRow key={i} />
                  ))
                : // ── Data rows ──
                  items.map((item) => (
                    <Table.Row
                      key={item._id}
                      className="hover:bg-muted transition-colors duration-150"
                    >
                      {/* Property */}
                      <Table.Cell className="border-b border-border py-3">
                        <div className="flex items-center gap-3 min-w-[220px]">
                          {/* Thumbnail */}
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted border border-border">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.propertyTitle || "Property"}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                No img
                              </div>
                            )}
                            {/* Heart badge */}
                            <span className="absolute top-1 right-1 bg-primary/90 rounded-full p-0.5">
                              <FiHeart className="text-primary-foreground text-[8px]" />
                            </span>
                          </div>

                          {/* Title + Location */}
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-foreground line-clamp-1 max-w-[180px]">
                              {item.propertyTitle || "—"}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <FiMapPin className="flex-shrink-0" />
                              <span className="line-clamp-1 max-w-[150px]">
                                {item.location || "—"}
                              </span>
                            </span>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Price */}
                      <Table.Cell className="border-b border-border py-3">
                        <span className="text-sm font-medium text-foreground whitespace-nowrap">
                          {`${formatPrice(item.price)} / ${item.priceType.slice(0, 1).toUpperCase() + item.priceType.slice(1)}`}
                        </span>
                      </Table.Cell>

                      {/* Added Date */}
                      <Table.Cell className="border-b border-border py-3">
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground whitespace-nowrap">
                          <FiCalendar className="flex-shrink-0 text-xs" />
                          {formatDate(item.addedAt)}
                        </span>
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell className="border-b border-border py-3">
                        <Button
                          isIconOnly
                          size="sm"
                          onPress={() => onRemoveClick(item)}
                          className="bg-accent text-accent-foreground hover:opacity-80 transition"
                          aria-label="Remove from favorites"
                        >
                          <TrashBin className="text-sm" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {/* Empty state rendered outside the table body, since v3's TableBody
          no longer accepts an emptyContent prop */}
      {showEmptyState && <FavoritesEmptyState hasSearch={hasSearch} />}
    </div>
  );
};

export default FavoritesTable;
