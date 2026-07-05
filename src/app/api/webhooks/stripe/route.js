import { createBookingFromWebhook } from "@/lib/booking";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { propertyId, userId, moveInDate, contactNumber, notes } =
      session.metadata;

    const newBooking = {
      stripeSessionId: session.id,
      propertyId,
      userId,
      moveInDate,
      contactNumber,
      notes,
      amountPaid: session.amount_total,
      paymentStatus: "paid",
    };

    await createBookingFromWebhook(newBooking);
  }

  return NextResponse.json({ received: true });
}
