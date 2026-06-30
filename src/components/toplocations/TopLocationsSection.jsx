"use client";

import { MapPin } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const topLocations = [
  {
    id: 1,
    name: "Gulshan",
    city: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80",
    properties: 42,
  },
  {
    id: 2,
    name: "Banani",
    city: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80",
    properties: 35,
  },
  {
    id: 3,
    name: "Dhanmondi",
    city: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80",
    properties: 28,
  },
  {
    id: 4,
    name: "Uttara",
    city: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=900&q=80",
    properties: 31,
  },
  {
    id: 5,
    name: "Baridhara",
    city: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80",
    properties: 19,
  },
  {
    id: 6,
    name: "Mirpur",
    city: "Dhaka",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80",
    properties: 24,
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
  },
};

function LocationCard({ location }) {
  return (
    <motion.div variants={cardVariants} className="group h-full">
      <Link
        href={`/properties?location=${encodeURIComponent(location.name)}`}
        className="relative block h-full overflow-hidden rounded-xl border border-border outline-none transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary focus-visible:-translate-y-1 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary"
      >
        <article className="relative aspect-[4/5] w-full overflow-hidden rounded-xl">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={location.image}
              alt={`${location.name}, ${location.city} rental properties`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent transition-opacity duration-300 ease-out group-hover:from-background/95" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
            <h3 className="text-xl font-semibold text-foreground">
              {location.name}
            </h3>
            <p className="text-sm text-muted-foreground">{location.city}</p>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{location.properties} Properties Available</span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export default function TopLocationsSection() {
  const locations = topLocations;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="w-full bg-background py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={headerVariants}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Popular Locations
          </span>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Explore Rental Hotspots
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Discover the neighborhoods where people love to live, work and rent
            through Nestrix.
          </p>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </motion.div>

        <motion.div
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-base text-muted-foreground">
            Looking for more locations?
          </p>
          <Link href="/properties">
            <Button
              className="bg-accent text-accent-foreground"
              radius="md"
              size="lg"
            >
              Browse All Properties
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
