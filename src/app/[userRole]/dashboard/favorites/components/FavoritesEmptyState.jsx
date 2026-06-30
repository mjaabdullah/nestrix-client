import { BsBookmarkHeartFill } from "react-icons/bs";
import { MdOutlineSearchOff } from "react-icons/md";

const FavoritesEmptyState = ({ hasSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      {/* Icon circle */}
      <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center">
        {hasSearch ? (
          <MdOutlineSearchOff className="text-accent-foreground text-4xl" />
        ) : (
          <BsBookmarkHeartFill className="text-accent-foreground text-3xl" />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <p className="text-lg font-semibold text-foreground">
          {hasSearch ? "No results found" : "No favorites yet"}
        </p>
        <p className="text-sm text-muted-foreground max-w-xs">
          {hasSearch
            ? "Try searching with a different keyword."
            : "Properties you save will appear here. Start exploring to save your favorites!"}
        </p>
      </div>
    </div>
  );
};

export default FavoritesEmptyState;
