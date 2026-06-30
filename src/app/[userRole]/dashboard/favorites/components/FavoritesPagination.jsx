import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import { Button, Pagination } from "@heroui/react";

const FavoritesPagination = ({ totalPages, page, onPageChange }) => {
  if (totalPages <= 1) return null;

  const isFirst = page === 1;
  const isLast = page === totalPages;

  const handlePrev = () => {
    if (!isFirst) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (!isLast) onPageChange(page + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-5">
      {/* Previous Button */}
      <Button
        isIconOnly
        size="sm"
        onPress={handlePrev}
        isDisabled={isFirst}
        className="bg-background border border-border text-foreground disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="text-sm" />
      </Button>

      {/* Page Numbers */}
      <Pagination
        total={totalPages}
        page={page}
        onChange={onPageChange}
        classNames={{
          wrapper: "gap-1",
          item: "bg-background border border-border text-foreground text-sm",
          cursor: "bg-primary text-primary-foreground font-semibold",
        }}
      />

      {/* Next Button */}
      <Button
        isIconOnly
        size="sm"
        onPress={handleNext}
        isDisabled={isLast}
        className="bg-background border border-border text-foreground disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="text-sm" />
      </Button>
    </div>
  );
};

export default FavoritesPagination;
