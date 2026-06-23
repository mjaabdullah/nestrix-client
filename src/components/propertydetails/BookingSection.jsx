"use client";

import { useState } from "react";

const BookingSection = ({ property }) => {
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    setLoading(true);
    // TODO: navigate to booking page or open modal
    // e.g. router.push(`/booking/${property._id}`)
    await new Promise((r) => setTimeout(r, 800)); // placeholder
    setLoading(false);
  };

  return (
    <div className="border border-border rounded-sm p-6 bg-background lg:sticky lg:top-24">
      {/* Price */}
      <div className="mb-6 pb-6 border-b border-border">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground tracking-tight">
            ৳{property.rent.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">
            / {property.rentType}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Negotiable for long-term lease
        </p>
      </div>

      {/* Quick summary */}
      <div className="space-y-2.5 mb-6 text-sm">
        {[
          { label: "Type", value: property.propertyType },
          { label: "Bedrooms", value: property.bedrooms },
          { label: "Bathrooms", value: property.bathrooms },
          { label: "Size", value: property.propertySize },
          { label: "Location", value: property.location },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center">
            <span className="text-muted-foreground">{label}</span>
            <span className="text-foreground font-medium">{value}</span>
          </div>
        ))}
      </div>

      {/* Book button */}
      <button
        onClick={handleBook}
        disabled={loading}
        className="w-full bg-primary text-primary-foreground text-sm font-medium py-3 rounded-sm hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Please wait..." : "Book Property"}
      </button>
    </div>
  );
};

export default BookingSection;
