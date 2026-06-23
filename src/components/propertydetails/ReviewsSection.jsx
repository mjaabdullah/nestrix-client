import { FaRegStar, FaStar } from "react-icons/fa";

// Renders 5 star icons based on a numeric rating
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= Math.round(rating) ? (
          <FaStar key={i} className="w-3.5 h-3.5 text-amber-400" />
        ) : (
          <FaRegStar key={i} className="w-3.5 h-3.5 text-muted-foreground" />
        ),
      )}
    </div>
  );
}

// Single review card
function ReviewCard({ review }) {
  return (
    <div className="border border-border rounded-sm p-5">
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar — initials fallback */}
        <div className="w-9 h-9 rounded-sm bg-secondary flex items-center justify-center text-foreground font-semibold text-sm flex-shrink-0">
          {review.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-foreground text-sm">
              {review.name}
            </p>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {review.date}
            </span>
          </div>
          <Stars rating={review.rating} />
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
}

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
