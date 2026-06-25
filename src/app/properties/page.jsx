import PropertiesSection from "@/components/propertiesPage/Propertiessection";
import SkeletonGrid from "@/components/propertiesPage/Skeletongrid";
import { getProperties } from "@/lib/core/properties";
import { Suspense } from "react";
import { RiMapPinLine, RiPhoneLine, RiStarLine } from "react-icons/ri";

const PropertiesPage = async ({ searchParams }) => {
  const params = await searchParams;
  const location = (await params?.location) || "";
  const type = await params?.type;
  const min = (await params?.min) || 0;
  const max = (await params?.max) || Number.MAX_SAFE_INTEGER;
  const page = Math.max(1, Number(await params?.page) || 1);

  const { data: properties, pagination } = await getProperties(
    location,
    type,
    page,
    min,
    max,
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-muted-foreground border border-border rounded-full px-4 py-1.5 mb-6">
                <RiMapPinLine className="w-3.5 h-3.5" />
                Verified Rentals
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] mb-5">
                Find Your Perfect
                <br />
                <span className="text-muted-foreground font-normal italic">
                  Rental Property
                </span>
              </h1>

              <p className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed">
                Browse verified rental properties across multiple locations and
                discover your next home — curated, inspected, and ready to move
                into.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter + Grid (Client island) ─────────────────────────────────────── */}
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14">
            <SkeletonGrid count={6} />
          </div>
        }
      >
        <PropertiesSection
          properties={properties}
          total={pagination.total}
          totalPages={pagination.totalPages}
          currentPage={page}
          locationQuery={location}
          typeFilter={type}
          minPrice={min}
          maxPrice={max}
        />
      </Suspense>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
                Expert Guidance
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
                Need Help Finding the Right Property?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-lg leading-relaxed">
                Our team can help you discover properties that match your
                lifestyle and budget — with no pressure and no hidden fees.
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-col gap-3">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity">
                <RiPhoneLine className="w-4 h-4" />
                Contact Support
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors">
                <RiStarLine className="w-4 h-4" />
                Browse Featured
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;
