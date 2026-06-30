import { FiHeart } from "react-icons/fi";

const FavoritesHeader = () => {
  return (
    <div className="mb-6 flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <FiHeart className="text-primary text-2xl" />
        <h1 className="text-2xl font-bold text-foreground">My Favorites</h1>
      </div>
      <p className="text-sm text-muted-foreground ml-8">
        Your saved properties, all in one place.
      </p>
    </div>
  );
};

export default FavoritesHeader;
