import FeatureProperties from "@/components/featuresection/FeatureProperties";
import HeroSection from "@/components/herosection/HeroSection";
import FeaturedReviewsSection from "@/components/reviewsection/FeaturedReviewsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureProperties />
      <FeaturedReviewsSection />
    </>
  );
}
