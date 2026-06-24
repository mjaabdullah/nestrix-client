import { FaStar } from "react-icons/fa";
import ReviewCard from "./ReviewCard";

const ReviewsSection = ({ reviews = [], averageRating, totalReviews }) => {
  return (
    <div className="pt-10 border-t border-border">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-foreground tracking-tight">
          Reviews{" "}
          <span className="text-muted-foreground font-normal">
            ({totalReviews})
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <FaStar className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-foreground">{averageRating}</span>
          <span className="text-sm text-muted-foreground">/ 5</span>
        </div>
      </div>

      {/* Cards */}
      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
