import Image from "next/image";
import { BsLightningChargeFill } from "react-icons/bs";
import {
  FaBath,
  FaBed,
  FaChair,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaParking,
  FaRulerCombined,
  FaSchool,
  FaShieldAlt,
  FaShoppingBag,
  FaStar,
  FaWifi,
} from "react-icons/fa";
import { MdAcUnit, MdElevator } from "react-icons/md";

const AMENITY_ICONS = {
  WiFi: <FaWifi className="w-4 h-4" />,
  Parking: <FaParking className="w-4 h-4" />,
  Security: <FaShieldAlt className="w-4 h-4" />,
  Elevator: <MdElevator className="w-4 h-4" />,
  "Generator Backup": <BsLightningChargeFill className="w-4 h-4" />,
  "Air Conditioning": <MdAcUnit className="w-4 h-4" />,
};

const EXTRA_ICONS = {
  "Fully Furnished": <FaChair className="w-3.5 h-3.5" />,
  "School Nearby": <FaSchool className="w-3.5 h-3.5" />,
  "Shopping Mall Nearby": <FaShoppingBag className="w-3.5 h-3.5" />,
};

const PropertyDetails = ({ property, averageRating, totalReviews }) => {
  return (
    <div className="space-y-10">
      {/* ── HEADER ── */}
      <div className="pb-8 border-b border-border">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-medium uppercase tracking-wider border border-border text-foreground px-2.5 py-1 rounded-sm">
            {property.propertyType}
          </span>
          {property.featured && (
            <span className="text-xs font-medium uppercase tracking-wider bg-primary text-primary-foreground px-2.5 py-1 rounded-sm">
              Featured
            </span>
          )}
          {property.status === "Approved" && (
            <span className="text-xs font-medium uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-sm flex items-center gap-1">
              <FaCheckCircle className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-3">
          {property.title}
        </h1>

        {/* Location & Rating */}
        <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1.5">
            <FaMapMarkerAlt className="w-3.5 h-3.5 text-primary" />
            {property.location}
          </span>
          <span className="flex items-center gap-1.5">
            <FaStar className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-foreground font-medium">{averageRating}</span>
            <span>({totalReviews} reviews)</span>
          </span>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2 text-foreground">
            <FaBed className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{property.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <FaBath className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{property.bathrooms} Bathrooms</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <FaRulerCombined className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{property.propertySize}</span>
          </div>
        </div>
      </div>
      {/* ── IMAGES ── */}
      {Array.isArray(property.images) && property.images.length > 0 && (
        <div className="pb-8 border-b border-border">
          {/* Featured image */}
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm mb-2">
            <Image
              src={property.images[0]}
              alt={`${property.title} - main view`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
            />
          </div>

          {/* Thumbnails — only if more than one image */}
          {property.images.length > 1 && (
            <div className="grid grid-cols-2 gap-2">
              {property.images.slice(1).map((url, i) => (
                <div
                  key={i}
                  className="relative aspect-[16/9] overflow-hidden rounded-sm"
                >
                  <Image
                    src={url}
                    alt={`${property.title} - view ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 400px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* ── DESCRIPTION ── */}
      <div className="pb-8 border-b border-border">
        <h2 className="text-base font-semibold text-foreground mb-3 tracking-tight">
          About this property
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {property.description}
        </p>
      </div>

      {/* ── AMENITIES ── */}
      <div className="pb-8 border-b border-border">
        <h2 className="text-base font-semibold text-foreground mb-4 tracking-tight">
          Amenities
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {property.amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-2.5 border border-border rounded-sm px-3 py-2.5 text-sm text-foreground"
            >
              <span className="text-primary">
                {AMENITY_ICONS[amenity] ?? null}
              </span>
              <span className="font-medium">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXTRA FEATURES ── */}
      <div className="pb-8 border-b border-border">
        <h2 className="text-base font-semibold text-foreground mb-4 tracking-tight">
          Extra Features
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {property.extraFeatures.map((feature) => (
            <span
              key={feature}
              className="flex items-center gap-2 border border-border rounded-sm px-3 py-1.5 text-sm text-foreground"
            >
              <span className="text-primary">
                {EXTRA_ICONS[feature] ?? (
                  <FaCheckCircle className="w-3.5 h-3.5" />
                )}
              </span>
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* ── OWNER ── */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-4 tracking-tight">
          Listed by
        </h2>
        <div className="flex items-center gap-4 border border-border rounded-sm p-5">
          {/* Avatar fallback using initials */}
          <div className="w-12 h-12 rounded-sm bg-secondary flex items-center justify-center text-foreground font-semibold text-lg flex-shrink-0">
            {property.owner.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground">
              {property.owner.name}
            </p>
            <p className="text-sm text-muted-foreground truncate mt-0.5">
              {property.owner.email}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <FaCheckCircle className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                Verified Owner
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
