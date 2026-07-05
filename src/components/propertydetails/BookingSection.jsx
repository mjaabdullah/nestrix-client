"use client";

import { useOverlayState } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BookingModal from "./BookingModal";

const BookingSection = ({ property, user }) => {
  const router = useRouter();
  const state = useOverlayState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirmBooking = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: user?._id,
          propertyId: property?._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Booking failed. Please try again.");
      }

      console.log("Booking successful:", data);

      state.close();
      window.location.href = data.url;
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

      {error && (
        <p className="text-xs text-foreground mb-3" role="alert">
          {error}
        </p>
      )}

      {/* Book button */}
      <button
        onClick={() => state.open()}
        disabled={isSubmitting}
        aria-label="Book this property"
        className="w-full bg-primary text-primary-foreground text-sm font-medium py-3 rounded-sm hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Please wait..." : "Book Property"}
      </button>

      <BookingModal
        state={state}
        property={property}
        user={user}
        onConfirmBooking={handleConfirmBooking}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default BookingSection;
