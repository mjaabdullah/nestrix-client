"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HiOutlineArrowRight } from "react-icons/hi";
import PropertyCard from "../propertiesPage/PropertyCard";

// ─── Mock data (replace with API call in production) ──────────────────────────
const FEATURED_PROPERTIES = [
  {
    id: "prop-001",
    title: "Skyline Residency — Gulshan",
    type: "Apartment",
    location: "Gulshan-2, Dhaka",
    rating: 4.9,
    reviews: 38,
    price: 45000,
    rentType: "Monthly",
    bedrooms: 3,
    bathrooms: 2,
    area: 1850,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    status: "Approved",
  },
  {
    id: "prop-002",
    title: "The Meridian — Banani",
    type: "Penthouse",
    location: "Banani, Dhaka",
    rating: 4.8,
    reviews: 24,
    price: 72000,
    rentType: "Monthly",
    bedrooms: 4,
    bathrooms: 3,
    area: 2600,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    status: "Approved",
  },
  {
    id: "prop-003",
    title: "Garden Terrace Villa",
    type: "Villa",
    location: "Baridhara, Dhaka",
    rating: 4.7,
    reviews: 19,
    price: 95000,
    rentType: "Monthly",
    bedrooms: 5,
    bathrooms: 4,
    area: 3800,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    status: "Approved",
  },
  {
    id: "prop-004",
    title: "Studio Loft — Dhanmondi",
    type: "Studio",
    location: "Dhanmondi, Dhaka",
    rating: 4.6,
    reviews: 51,
    price: 22000,
    rentType: "Monthly",
    bedrooms: 1,
    bathrooms: 1,
    area: 620,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    status: "Approved",
  },
  {
    id: "prop-005",
    title: "Heritage Courtyard House",
    type: "House",
    location: "Uttara, Dhaka",
    rating: 4.8,
    reviews: 31,
    price: 58000,
    rentType: "Monthly",
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    image:
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&q=80",
    status: "Approved",
  },
  {
    id: "prop-006",
    title: "Waterfront Suite — Motijheel",
    type: "Suite",
    location: "Motijheel, Dhaka",
    rating: 4.5,
    reviews: 17,
    price: 3500,
    rentType: "Daily",
    bedrooms: 2,
    bathrooms: 2,
    area: 980,
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80",
    status: "Approved",
  },
];

// ─── Animation variants ────────────────────────────────────────────────────────
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.25 },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.8, ease: "easeOut" },
  },
};

// ─── ArchLine — section header decoration ─────────────────────────────────────
function ArchLine() {
  return (
    <div
      className="flex items-center justify-center gap-3 mt-6 mb-2"
      aria-hidden
    >
      <div className="h-px w-12 bg-border" />
      <div className="flex gap-1.5 items-center">
        <span className="block w-1.5 h-1.5 rounded-full border border-accent" />
        <span className="block w-8 h-px bg-accent/60" />
        <span className="block w-1.5 h-1.5 border border-border rotate-45" />
        <span className="block w-8 h-px bg-accent/60" />
        <span className="block w-1.5 h-1.5 rounded-full border border-accent" />
      </div>
      <div className="h-px w-12 bg-border" />
    </div>
  );
}

// ─── FeaturedProperties ───────────────────────────────────────────────────────

const FeatureSection = ({ properties }) => {
  const router = useRouter();

  // const properties = FEATURED_PROPERTIES;

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background"
      aria-labelledby="featured-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section header ──────────────────────────────────── */}
        <motion.div variants={headerVariants} className="text-center mb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="h-px w-6 bg-accent" aria-hidden />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-accent">
              Featured Collection
            </span>
            <span className="h-px w-6 bg-accent" aria-hidden />
          </div>

          {/* Heading */}
          <h2
            id="featured-heading"
            className="text-[2.25rem] sm:text-[2.75rem] font-bold text-foreground leading-tight tracking-tight"
          >
            <span className="text-accent">Featured</span>{" "}
            <span>Properties</span>
          </h2>

          {/* Subheading */}
          <p className="mt-4 text-muted-foreground text-[15px] max-w-xl mx-auto leading-relaxed">
            Explore hand-picked rental properties from trusted owners across
            Bangladesh.
          </p>

          <ArchLine />
        </motion.div>

        {/* ── Property grid ───────────────────────────────────── */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.06 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </motion.div>

        {/* ── Bottom CTA ──────────────────────────────────────── */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-16 text-center"
        >
          {/* Hairline rule */}
          <div className="flex items-center gap-4 mb-10" aria-hidden>
            <div className="flex-1 h-px bg-border" />
            <span className="block w-1 h-1 border border-border rotate-45" />
            <div className="flex-1 h-px bg-border" />
          </div>

          <p className="text-[13px] font-medium tracking-widest uppercase text-muted-foreground mb-3">
            Looking for more options?
          </p>
          <h3 className="text-[1.5rem] font-bold text-foreground mb-6 tracking-tight">
            Browse our full collection
          </h3>
          <Button
            onPress={() => router.push("/properties")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-[13px] font-semibold h-11 px-8 rounded-[6px] hover:opacity-90 transition-opacity"
          >
            Browse All Properties
            <HiOutlineArrowRight className="w-4 h-4" aria-hidden />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeatureSection;
