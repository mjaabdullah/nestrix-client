import { url } from "./property";

export const getProperties = async (
  location,
  type,
  page,
  minPrice,
  maxPrice,
) => {
  const params = new URLSearchParams();

  if (page) params.append("page", page);

  if (location) params.append("location", location);
  if (type) params.append("propertyType", type);

  if (minPrice !== undefined) params.append("minPrice", minPrice);

  if (maxPrice !== undefined) params.append("maxPrice", maxPrice);
  const filter = params.toString();

  const res = await fetch(`${url}/api/properties?${filter}`, {
    cache: "no-store",
  });

  return res.json();
};
