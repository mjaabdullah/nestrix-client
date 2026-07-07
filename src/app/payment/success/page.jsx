import { createBookingFromWebhook } from "@/lib/booking";
import { getUser } from "@/lib/getUserInSever";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import PaymentSuccessView from "./components/PaymentSuccessView";

const PaymentSuccessPage = async ({ searchParams }) => {
  const { session_id } = await searchParams;

  const user = await getUser();

  if (!session_id) throw new Error("Please provide a valid session_id");

  const {
    status,
    metadata,
    amount_total,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const { propertyId, userId, moveInDate, contactNumber, notes } = metadata;
    const newBooking = {
      stripeSessionId: session_id,
      propertyId,
      userId,
      moveInDate,
      contactNumber,
      customerEmail,
      notes,
      amountPaid: (amount_total / 100).toFixed(2),
      paymentStatus: "paid",
      bookingStatus: "pending",
    };

    await createBookingFromWebhook(newBooking);

    return (
      <PaymentSuccessView
        user={user}
        customerEmail={customerEmail}
        amountPaid={amount_total}
        moveInDate={moveInDate}
        contactNumber={contactNumber}
      />
    );
  }
};

export default PaymentSuccessPage;
