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
