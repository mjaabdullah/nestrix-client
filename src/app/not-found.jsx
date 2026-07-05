"use client";

import { ArrowLeft, House } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <main
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-background"
        aria-labelledby="not-found-heading"
      >
        <motion.div
          className="flex flex-col items-center text-center max-w-md w-full gap-6"
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.09 }}
        >
          {/* Icon */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-14 h-14 rounded-xl border border-border flex items-center justify-center bg-background"
            aria-hidden="true"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
              <path d="M11 8v3m0 3h.01" />
            </svg>
          </motion.div>

          {/* 404 number */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-8xl font-semibold tracking-tight text-foreground leading-none select-none"
            aria-hidden="true"
          >
            404
          </motion.p>

          {/* Heading + description */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            <h1
              id="not-found-heading"
              className="text-2xl font-semibold text-foreground tracking-tight"
            >
              Page Not Found
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The page you&rsquo;re looking for doesn&rsquo;t exist or may have
              been moved.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-12 h-px bg-border"
            aria-hidden="true"
          />

          {/* Actions */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            <Button
              onPress={() => router.push("/")}
              startContent={<House width={16} height={16} />}
              className="bg-primary text-primary-foreground font-medium w-full sm:w-auto px-6"
              aria-label="Go back to home page"
            >
              Go Back Home
            </Button>

            <Button
              variant="bordered"
              onPress={() => router.back()}
              startContent={<ArrowLeft width={16} height={16} />}
              className="border-border text-foreground font-medium w-full sm:w-auto px-6"
              aria-label="Go back to previous page"
            >
              Go Back
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
