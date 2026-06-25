"use server";
import { headers } from "next/headers";
import { auth } from "../auth";
import { url } from "./property";

export const saveReview = async (review) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${url}/api/new/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(review),
  });

  return res.json();
};

export const getReviewsByPropertyId = async (propertyId) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${url}/api/reviews/${propertyId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const reviews = await res.json();
  return reviews;
};
