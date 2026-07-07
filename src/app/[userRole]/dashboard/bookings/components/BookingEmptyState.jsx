import Link from "next/link";
import { FiInbox } from "react-icons/fi";

export default function BookingEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 border border-border rounded-xl bg-background text-center space-y-5 max-w-md mx-auto">
      <div className="p-4 rounded-full bg-secondary text-muted-foreground border border-border">
        <FiInbox size={32} />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold text-foreground tracking-tight">
          No Bookings Yet
        </h3>
        <p className="text-sm text-muted-foreground">
          You haven't booked any properties yet. Find your next structural
          masterpiece today.
        </p>
      </div>
      <Link
        href="/properties"
        className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium bg-primary text-primary-foreground transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-border"
      >
        Browse Properties
      </Link>
    </div>
  );
}
