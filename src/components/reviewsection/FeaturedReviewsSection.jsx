"use client";

import LoadingState from "@/app/[userRole]/dashboard/components/LoadingState";
import { getTopReviews } from "@/lib/core/property";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReviewCard from "../propertydetails/ReviewCard";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

export default function FeaturedReviewsSection() {
  const [topReviews, setTopReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopReviews()
      .then((res) => {
        setTopReviews(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <motion.section
      aria-labelledby="featured-reviews-heading"
      className="bg-background py-12 md:py-16 lg:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
          variants={headerVariants}
        >
          <span className="text-sm font-semibold tracking-[0.2em] text-primary">
            TESTIMONIALS
          </span>
          <h2
            id="featured-reviews-heading"
            className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl"
          >
            What Our Tenants Say
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Real experiences from tenants who found their perfect rental home
            through Nestrix.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 md:gap-8"
          variants={gridVariants}
        >
          {topReviews.map((review) => (
            <motion.div key={review.id} variants={cardVariants}>
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-4 text-center md:mt-14"
          variants={ctaVariants}
        >
          <p className="text-base text-foreground sm:text-lg">
            Want to share your experience?
          </p>
          <Link href={`/properties`}>
            <Button
              color="primary"
              variant="solid"
              size="lg"
              className="bg-primary text-primary-foreground"
              aria-label="Browse properties on Nestrix"
            >
              Browse Properties
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
