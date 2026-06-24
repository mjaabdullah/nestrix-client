import { url } from "./property";

export const saveReview = async (review) => {
  const res = await fetch(`${url}/api/new/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  return res.json();
};

export const getReviewsByPropertyId = async (propertyId) => {
  const res = await fetch(`${url}/api/reviews/${propertyId}`);
  const reviews = await res.json();
  return reviews;
};
