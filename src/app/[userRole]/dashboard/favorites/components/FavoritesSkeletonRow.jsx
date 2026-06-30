import { Skeleton, TableCell, TableRow } from "@heroui/react";

const FavoritesSkeletonRow = () => {
  return (
    <TableRow>
      {/* Property column skeleton */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="w-14 h-14 rounded-lg" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-36 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
        </div>
      </TableCell>

      {/* Price column skeleton */}
      <TableCell>
        <Skeleton className="h-4 w-20 rounded-md" />
      </TableCell>

      {/* Date column skeleton */}
      <TableCell>
        <Skeleton className="h-4 w-24 rounded-md" />
      </TableCell>

      {/* Action column skeleton */}
      <TableCell>
        <Skeleton className="h-8 w-8 rounded-lg" />
      </TableCell>
    </TableRow>
  );
};

export default FavoritesSkeletonRow;
