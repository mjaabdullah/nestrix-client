import Image from "next/image";
import BookingStatusBadge from "./BookingStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

export default function BookingRow({ booking }) {
  const displayDate = new Date(booking.moveInDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const displayAmount = Number(booking.amountPaid).toLocaleString("en-IN");

  return (
    <tr className="block md:table-row border border-border md:border-0 rounded-xl md:rounded-none p-5 md:p-0 mb-5 md:mb-0 bg-background md:bg-transparent space-y-4 md:space-y-0 transition-colors hover:bg-secondary/40">
      {/* Property Profile Cell */}
      <td className="block md:table-cell py-2 md:py-5 px-0 md:px-6 alignment-baseline">
        <div className="flex items-center gap-4">
          <Image
            src={booking.property.image}
            alt={booking.property.title}
            width={64}
            height={64}
            className="w-16 h-16 rounded-xl object-cover border border-border flex-shrink-0"
          />
          <div className="space-y-0.5">
            <h4 className="font-medium text-foreground text-sm md:text-base leading-tight">
              {booking.property.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {booking.property.location}
            </p>
            <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-muted-foreground bg-accent px-2 py-0.5 rounded mt-1">
              {booking.property.type}
            </span>
          </div>
        </div>
      </td>

      {/* Booking Date Cell */}
      <td className="flex items-center justify-between md:table-cell py-1 md:py-5 px-0 md:px-6 text-sm text-foreground">
        <span className="md:hidden text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          Booking Date
        </span>
        <span>{displayDate}</span>
      </td>

      {/* Amount Paid Cell */}
      <td className="flex items-center justify-between md:table-cell py-1 md:py-5 px-0 md:px-6 text-sm font-semibold text-foreground">
        <span className="md:hidden text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          Amount Paid
        </span>
        <span>৳{displayAmount}</span>
      </td>

      {/* Booking Status Cell */}
      <td className="flex items-center justify-between md:table-cell py-1 md:py-5 px-0 md:px-6">
        <span className="md:hidden text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          Booking Status
        </span>
        <BookingStatusBadge status={booking.bookingStatus} />
      </td>

      {/* Payment Status Cell */}
      <td className="flex items-center justify-between md:table-cell py-1 md:py-5 px-0 md:px-6">
        <span className="md:hidden text-xs font-semibold tracking-wider uppercase text-muted-foreground">
          Payment Status
        </span>
        <PaymentStatusBadge status={booking.paymentStatus} />
      </td>
    </tr>
  );
}
