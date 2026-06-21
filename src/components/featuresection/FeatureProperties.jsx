import { getFeaturedProperties } from "@/lib/core/property";
import FeatureSection from "./FeatureSection";

const FeatureProperties = async () => {
  const properties = await getFeaturedProperties();
  console.log(properties);

  return (
    <>
      <FeatureSection properties={properties} />
    </>
  );
};

export default FeatureProperties;
