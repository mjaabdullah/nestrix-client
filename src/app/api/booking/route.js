import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getPropertyById } from "@/lib/getproperty";
import { stripe } from "../../../lib/stripe";

export async function POST(request) {
  try {
    const {
      propertyId,
      userId,
      moveInDate,
      contactNumber,
      notes,
      paymentMethod,
      rentAmount,
      bookingFee,
      totalPayable,
      userEmail,
    } = await request.json();

    if (paymentMethod !== "card") {
      throw new Error("Invalid payment method");
    }

    const property = await getPropertyById(propertyId);
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail,
      mode: "payment",
      metadata: {
        propertyId,
        userId,
        moveInDate,
        contactNumber,
        notes,
      },

      line_items: [
        {
          quantity: 1,

          price_data: {
            currency: "bdt",

            product_data: {
              name: property.title,
              images: [property.images[0]],
            },

            unit_amount: property.rent * 100,
          },
        },
      ],

      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/properties/details/${propertyId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
