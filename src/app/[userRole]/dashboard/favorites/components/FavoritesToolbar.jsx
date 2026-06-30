import { Chip, CloseButton, InputGroup, TextField } from "@heroui/react";
import { FiHeart, FiSearch } from "react-icons/fi";

const FavoritesToolbar = ({ searchQuery, onSearchChange, totalCount }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
      {/* Search Input */}
      <TextField
        aria-label="Search by title or location"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-xs"
      >
        <InputGroup className="bg-background border border-border rounded-lg h-9">
          <InputGroup.Prefix>
            <FiSearch className="text-foreground text-base flex-shrink-0" />
          </InputGroup.Prefix>
          <InputGroup.Input
            placeholder="Search by title or location..."
            className="text-sm text-foreground placeholder:text-secondary-foreground"
          />
          {searchQuery && (
            <InputGroup.Suffix>
              <CloseButton
                aria-label="Clear search"
                size="sm"
                onPress={() => onSearchChange("")}
              />
            </InputGroup.Suffix>
          )}
        </InputGroup>
      </TextField>

      {/* Saved Count Badge */}
      <Chip
        startContent={<FiHeart className="text-xs" />}
        className="bg-primary/10 border border-primary/30"
        size="sm"
      >
        <Chip.Label className="text-primary text-xs font-medium">
          {totalCount} {totalCount === 1 ? "Property" : "Properties"} saved
        </Chip.Label>
      </Chip>
    </div>
  );
};

export default FavoritesToolbar;
