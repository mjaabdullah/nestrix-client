import { url } from "./core/property";

export const createBookingFromWebhook = async (bookingData) => {
  const res = await fetch(`${url}/api/internal/create-booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": process.env.INTERNAL_WEBHOOK_SECRET,
    },
    body: JSON.stringify(bookingData),
  });
  return res.json();
};
