"use client";

import { getPropertyTypes } from "@/lib/core/properties";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
const SearchPanel = () => {
  const router = useRouter();
  const [locationVal, setLocationVal] = useState("");
  const [propType, setPropType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPropertyTypes = async () => {
      const res = await getPropertyTypes();
      setPropertyTypes(res);
      setIsLoading(false);
    };

    loadPropertyTypes();
  }, []);

  const handleSearch = () => {
    const searchData = {
      location: locationVal,
      type: propType,
      min: minPrice,
      max: maxPrice,
    };
    const queryParams = new URLSearchParams();

    Object.entries(searchData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();

    router.push(`/properties?${queryString}`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-12 pb-2 lg:pb-5"
    >
      <div className="border border-border rounded-[10px] bg-background p-4 lg:p-5">
        {/* Panel label */}
        <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground mb-4 font-medium px-1">
          Search Properties
        </p>

        <div className="flex flex-col lg:flex-row gap-3 lg:items-end">
          {/* Location */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-[11px] text-muted-foreground uppercase tracking-widest px-1">
              Location
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-accent w-4 h-4 pointer-events-none" />
              <input
                type="text"
                value={locationVal}
                onChange={(e) => setLocationVal(e.target.value)}
                placeholder="City, neighborhood..."
                className="w-full bg-background border border-border rounded-[8px] pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-[11px] text-muted-foreground uppercase tracking-widest px-1">
              Property Type
            </label>
            <select
              value={propType}
              onChange={(e) => setPropType(e.target.value)}
              className="w-full bg-background border border-border rounded-[8px] px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                backgroundSize: "16px",
              }}
            >
              <option value="">Any type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
              {/* <option value="duplex">Duplex</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="studio">Studio</option>
              <option value="villa">Villa</option>
              <option value="penthouse">Penthouse</option> */}
            </select>
          </div>

          {/* Min Price */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-[11px] text-muted-foreground uppercase tracking-widest px-1">
              Min Price
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="$ Min"
              min={0}
              className="w-full bg-background border border-border rounded-[8px] px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
            />
          </div>

          {/* Max Price */}
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-[11px] text-muted-foreground uppercase tracking-widest px-1">
              Max Price
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="$ Max"
              min={0}
              className="w-full bg-background border border-border rounded-[8px] px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
            />
          </div>

          {/* Search button */}
          <div onClick={handleSearch} className="flex flex-col gap-1 lg:pb-0">
            <span className="text-[11px] text-transparent uppercase tracking-widest px-1 hidden lg:block select-none">
              &nbsp;
            </span>
            <button className="inline-flex items-center justify-center gap-2 bg-primary text-background rounded-[8px] px-6 cursor-pointer py-2.5 text-sm font-semibold tracking-[0.02em] transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent whitespace-nowrap">
              <FiSearch className="w-4 h-4" />
              Find Property
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchPanel;
