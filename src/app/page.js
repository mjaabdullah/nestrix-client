import FeatureProperties from "@/components/featuresection/FeatureProperties";
import HeroSection from "@/components/herosection/HeroSection";
import FeaturedReviewsSection from "@/components/reviewsection/FeaturedReviewsSection";
import TopLocationsSection from "@/components/toplocations/TopLocationsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureProperties />
      <FeaturedReviewsSection />
      <TopLocationsSection />
    </>
  );
}
