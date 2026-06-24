import Image from "next/image";
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

const ReviewCard = ({ review }) => {
  return (
    <div className="border border-border rounded-sm p-5">
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar — initials fallback */}
        <div className="w-9 h-9 rounded-sm bg-secondary flex items-center justify-center text-foreground font-semibold text-sm flex-shrink-0">
          <Image
            width={100}
            height={100}
            alt={review.name}
            src={review.image}
          />
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
};

export default ReviewCard;
