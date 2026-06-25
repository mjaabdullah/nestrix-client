"use server";
import { headers } from "next/headers";
import { auth } from "./auth";
import { url } from "./core/property";

export const getPropertyById = async (id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`${url}/api/properties/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const property = await res.json();
  return property;
};
