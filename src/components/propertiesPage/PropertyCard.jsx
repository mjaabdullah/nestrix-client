"use client";

import { useSession } from "@/lib/auth-client";
import { removeFromFavorites, saveToFavorites } from "@/lib/core/property";
import { Heart, MapPin, Star } from "@gravity-ui/icons";
import { Button, toast } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiArea, BiBath, BiBed } from "react-icons/bi";
import { TbBuildingEstate } from "react-icons/tb";

// ─── Animation variant
export const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Normalizer
function normalizeProperty(raw) {
  return {
    // MongoDB _id → id
    id: raw._id ?? raw.id ?? "",

    title: raw.title ?? "Untitled Property",
    location: raw.location ?? "Location not specified",

    // propertyType → type
    type: raw.propertyType ?? raw.type ?? "Property",

    // rent → price
    price: Number(raw.rent ?? raw.price ?? 0),

    rentType: raw.rentType ?? "Monthly",
    bedrooms: Number(raw.bedrooms ?? 0),
    bathrooms: Number(raw.bathrooms ?? 0),

    // propertySize "1650 sq ft" → 1650 (number)
    area: parseArea(raw.propertySize ?? raw.area),

    // images array →
    image: Array.isArray(raw.images)
      ? (raw.images[1] ?? "")
      : (raw.image ?? raw.images ?? ""),

    // averageRating → rating
    rating: Number(raw.averageRating ?? raw.rating ?? 0),

    // totalReviews → reviews
    reviews: Number(raw.totalReviews ?? raw.reviews ?? 0),

    status: raw.status ?? "Approved",
  };
}

/**
 *
 */
function parseArea(value) {
  if (!value && value !== 0) return 0;
  if (typeof value === "number") return value;
  // s
  const match = String(value).match(/[\d,]+/);
  if (!match) return 0;
  return Number(match[0].replace(/,/g, ""));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RentTypeBadge({ type }) {
  const styles =
    type === "Daily"
      ? "bg-accent/15 text-accent"
      : type === "Weekly"
        ? "bg-primary/15 text-primary"
        : "bg-secondary text-secondary-foreground";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[11px] font-semibold tracking-wide rounded ${styles}`}
    >
      {type}
    </span>
  );
}

function StatusBadge({ status = "Approved" }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase rounded-sm bg-emerald-500/12 text-emerald-600 border border-emerald-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      {status}
    </span>
  );
}

// ─── PropertyCard
export default function PropertyCard({
  property: rawProperty,
  isLoggedIn = false,
  animate = true,
}) {
  //
  const property = normalizeProperty(rawProperty);

  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleFavorite = async (e) => {
    e?.stopPropagation();

    if (!user) router.push("/login");

    const favorite = {
      userId: user.id,
      propertyId: property.id,
    };

    if (isFavorited) {
      const res = await removeFromFavorites(favorite);

      if (!res.success) {
        toast.warning(res.message);
      }
      if (res.success) {
        toast.success(res.message);
        setIsFavorited(!isFavorited);
      }
    }
    if (!isFavorited) {
      const res = await saveToFavorites(favorite);
      if (!res.insertedId) {
        toast.warning(res.message);
      }
      if (res.insertedId) {
        toast.success("Added to favorites");
        setIsFavorited(!isFavorited);
      }
    }
  };

  // ─── Fallback image ──────────────────────────────────────────────────────
  const imageSrc =
    !imgError && property.image
      ? property.image
      : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";

  // ─── Card content ────────────────────────────────────────────────────────
  const cardContent = (
    <>
      {/* ── Image area ───────────────────────────────────── */}
      <div className="relative overflow-hidden aspect-[4/3] w-full">
        <motion.img
          src={imageSrc}
          alt={property.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.055 : 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          draggable={false}
        />

        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-transparent pointer-events-none" />

        {/* Property type badge — top left */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded-sm bg-background/90 text-foreground backdrop-blur-sm border border-border/60">
            <TbBuildingEstate className="w-3.5 h-3.5" aria-hidden />
            {property.type}
          </span>
        </div>

        {/* Status badge — top right */}
        <div className="absolute top-3 right-3">
          <StatusBadge status={property.status} />
        </div>

        {/* Quick-favorite button — bottom right */}
        <button
          onClick={handleFavorite}
          aria-label={
            isFavorited ? "Remove from favorites" : "Add to favorites"
          }
          className={`
            absolute bottom-3 right-3 w-8 h-8 rounded-full
            flex items-center justify-center backdrop-blur-sm border transition-all duration-200
            ${
              isFavorited
                ? "bg-accent border-accent text-white"
                : "bg-background/80 border-border/60 text-muted-foreground hover:text-foreground"
            }
          `}
        >
          <Heart className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Card body ────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Title + location */}
        <div className="flex flex-col gap-1.5">
          <div className="relative inline-block">
            <h3 className="text-[15px] font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {property.title}
            </h3>
            {/* Accent underline animation */}
            <motion.span
              className="absolute -bottom-0.5 left-0 h-[1.5px] bg-accent rounded-full"
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-accent" />
            <span className="text-[12px]">{property.location}</span>
          </div>
        </div>

        {/* Rating row */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[13px] font-semibold text-foreground">
              {property.rating > 0 ? property.rating.toFixed(1) : "New"}
            </span>
          </span>
          {property.reviews > 0 && (
            <span className="text-muted-foreground text-[12px]">
              ({property.reviews} reviews)
            </span>
          )}
          <span className="ml-auto">
            <RentTypeBadge type={property.rentType} />
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-[20px] font-bold text-foreground tracking-tight">
            ৳{property.price.toLocaleString("en-BD")}
          </span>
          <span className="text-[12px] text-muted-foreground">
            / {property.rentType.toLowerCase()}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Meta: beds / baths / area */}
        <div className="grid grid-cols-3 text-center text-[12px] text-muted-foreground">
          <div className="flex flex-col items-center gap-1">
            <BiBed className="w-4 h-4 text-foreground/70" aria-hidden />
            <span>
              {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-border">
            <BiBath className="w-4 h-4 text-foreground/70" aria-hidden />
            <span>
              {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <BiArea className="w-4 h-4 text-foreground/70" aria-hidden />
            <span>
              {property.area > 0
                ? `${property.area.toLocaleString()} ft²`
                : "N/A"}
            </span>
          </div>
        </div>

        {/* CTA row */}
        <div className="flex gap-2 mt-auto pt-1">
          <Link className="w-9/10" href={`/properties/details/${property.id}`}>
            <Button
              className="flex-1 w-full bg-primary text-primary-foreground text-[13px] font-semibold h-9 rounded-[6px] hover:opacity-90 transition-opacity"
              aria-label={`View details for ${property.title}`}
            >
              View Details
            </Button>
          </Link>
          <Button
            onClick={handleFavorite}
            variant="bordered"
            isIconOnly
            className={`
              h-9 w-9 rounded-[6px] border-border transition-all duration-200
              ${
                isFavorited
                  ? "bg-accent/10 border-accent/40 text-accent"
                  : "text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }
            `}
            aria-label={
              isFavorited ? "Saved to favorites" : "Save to favorites"
            }
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  if (animate) {
    return (
      <motion.article
        variants={cardVariants}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group flex flex-col bg-secondary border border-border rounded-[8px] overflow-hidden"
        style={{ willChange: "transform" }}
      >
        {cardContent}
      </motion.article>
    );
  }

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col bg-secondary border border-border rounded-[8px] overflow-hidden"
    >
      {cardContent}
    </article>
  );
}
