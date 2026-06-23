"use client";

import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const RATING_LABELS = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export default function ReviewForm({ propertyId }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) return;

    setStatus("loading");

    try {
      // TODO:  API
      setInterval(() => {}, 2000);

      setStatus("success");
      setRating(0);
      setComment("");
    } catch (err) {
      setStatus("error");
    }
  };

  // Success state
  if (status === "success") {
    return (
      <div className="border border-border rounded-sm p-6 text-center space-y-2">
        <p className="text-foreground font-medium">Review submitted!</p>
        <p className="text-sm text-muted-foreground">
          Thank you for your feedback.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-foreground underline underline-offset-4 hover:text-primary transition-colors mt-1"
        >
          Write another review
        </button>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-sm p-6 space-y-5">
      <h2 className="text-base font-semibold text-foreground tracking-tight">
        Write a review
      </h2>

      {/* Star selector */}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
          Your rating
        </p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(star)}
              className="transition-transform duration-100 hover:scale-110 focus:outline-none"
              aria-label={`Rate ${star} out of 5`}
            >
              {star <= (hovered || rating) ? (
                <FaStar className="w-6 h-6 text-amber-400" />
              ) : (
                <FaRegStar className="w-6 h-6 text-muted-foreground" />
              )}
            </button>
          ))}

          {/* Label */}
          {(hovered || rating) > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">
              {RATING_LABELS[hovered || rating]}
            </span>
          )}
        </div>
      </div>

      {/* Comment textarea */}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
          Your comment
        </p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this property..."
          rows={4}
          className="w-full bg-background text-foreground text-sm border border-border rounded-sm px-3 py-2.5 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground resize-none transition-colors"
        />
        <p className="text-xs text-muted-foreground mt-1 text-right">
          {comment.trim().length} / 500
        </p>
      </div>

      {/* Error message */}
      {status === "error" && (
        <p className="text-sm text-red-500">
          Something went wrong. Please try again.
        </p>
      )}

      {/* Submit button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!rating || !comment.trim() || status === "loading"}
        className="w-full bg-primary text-primary-foreground text-sm font-medium py-2.5 rounded-sm hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}
