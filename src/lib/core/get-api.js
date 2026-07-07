"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { url } from "./property";

export const getDataInServer = async (api) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${url}${api}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return await res.json();
};
