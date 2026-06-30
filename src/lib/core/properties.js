import { url } from "./property";

export const getProperties = async (location, type, page, min, max) => {
  const params = new URLSearchParams();

  if (page) params.append("page", page);

  if (location) params.append("location", location);
  if (type) params.append("propertyType", type);

  if (min !== undefined) params.append("minPrice", min);

  if (max !== undefined) params.append("maxPrice", max);
  const filter = params.toString();

  const res = await fetch(`${url}/api/properties?${filter}`, {
    cache: "no-store",
  });

  return res.json();
};
