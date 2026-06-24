import BookingSection from "@/components/propertydetails/BookingSection";
import PropertyDetails from "@/components/propertydetails/PropertyDetails";
import ReviewForm from "@/components/propertydetails/ReviewForm";
import ReviewsSection from "@/components/propertydetails/ReviewsSection";
import { getPropertyById } from "@/lib/core/property";
import { getReviewsByPropertyId } from "@/lib/core/reviews";

async function getProperty(id) {
  return {
    _id: id,
    title: "Modern Family Apartment in Gulshan",
    description:
      "Experience refined urban living in this thoughtfully designed family apartment nestled in Gulshan's most sought-after address. The residence seamlessly blends contemporary architecture with functional elegance — featuring expansive living areas bathed in natural light, a gourmet kitchen outfitted with premium fittings, and three generously proportioned bedrooms.",
    location: "Gulshan, Dhaka",
    propertyType: "Apartment",
    rent: 55000,
    rentType: "Monthly",
    bedrooms: 3,
    bathrooms: 3,
    propertySize: "1650 sq ft",
    amenities: [
      "WiFi",
      "Parking",
      "Security",
      "Elevator",
      "Generator Backup",
      "Air Conditioning",
    ],
    extraFeatures: ["Fully Furnished", "School Nearby", "Shopping Mall Nearby"],
    status: "Approved",
    featured: true,
    averageRating: 4.8,
    totalReviews: 184,
    owner: {
      ownerId: "owner_001",
      name: "Arif Hossain",
      email: "arif@nestrix-owner.com",
    },
  };
}

async function getReviews(propertyId) {
  return [
    {
      _id: "r1",
      name: "Nadia Rahman",
      date: "March 2025",
      rating: 5,
      comment:
        "Absolutely stunning apartment. The finishes are impeccable and the Gulshan location is unbeatable. Highly recommend to anyone seeking premium Dhaka living.",
    },
    {
      _id: "r2",
      name: "Tanvir Islam",
      date: "February 2025",
      rating: 5,
      comment:
        "The generator backup and 24/7 security gave us complete peace of mind. Spacious layout, excellent natural lighting. Move-in was seamless.",
    },
    {
      _id: "r3",
      name: "Sadia Akter",
      date: "January 2025",
      rating: 4,
      comment:
        "Very well-maintained property with modern amenities. Minor maintenance requests were resolved within 24 hours.",
    },
    {
      _id: "r4",
      name: "Kabir Hasan",
      date: "December 2024",
      rating: 5,
      comment:
        "Exceptional value for a Gulshan address. Fully furnished so we could move in immediately. Building management is professional.",
    },
  ];
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

  const averageRating = totalRating / totalReviews || 0;

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
