import BookingSection from "@/components/propertydetails/BookingSection";
import PropertyDetails from "@/components/propertydetails/PropertyDetails";
import ReviewForm from "@/components/propertydetails/ReviewForm";
import ReviewsSection from "@/components/propertydetails/ReviewsSection";

import { getReviewsByPropertyId } from "@/lib/core/reviews";
import { getPropertyById } from "@/lib/getproperty";


export async function generateMetadata({ params }) {
  const { id } = await params;

  const property = await getPropertyById(id);

  return {
    title: property.title,
    description: property.description,
  };
}


const PropertyDetailsPage = async ({ params }) => {
  const { id } = await params;
  const property = await getPropertyById(id);

  //
  const reviews = await getReviewsByPropertyId(id);
  const totalReviews = reviews?.length;
  const totalRating = reviews.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);

  const averageRating = (totalRating / totalReviews || 0).toFixed(1);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Two-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          {/* LEFT — property info + reviews */}
          <div className="min-w-0 space-y-0">
            {/* 1. property details */}
            <PropertyDetails
              property={property}
              averageRating={averageRating}
              totalReviews={totalReviews}
            />

            {/* 2. Reviews */}
            <ReviewsSection
              reviews={reviews}
              averageRating={averageRating}
              totalReviews={totalReviews}
            />
            {/* 3. Add a review */}
            <div className="mt-6">
              <ReviewForm propertyId={property._id} />
            </div>
          </div>

          {/* RIGHT — sticky booking */}
          <aside>
            {/* 3. Booking section */}
            <BookingSection property={property} />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailsPage;
