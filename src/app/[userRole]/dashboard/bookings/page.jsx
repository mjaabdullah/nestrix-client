import { getBookings } from "@/lib/getBookings";
import { getUser } from "@/lib/getUserInSever";
import BookingEmptyState from "./components/BookingEmptyState";
import BookingHeader from "./components/BookingHeader";
import BookingPagination from "./components/BookingPagination";
import BookingTable from "./components/BookingTable";
import SummaryCards from "./components/SummaryCards";

// Mock server database mimicking your application's exact schema
const MOCK_SERVER_DATA = [
  {
    _id: "6a4bccb8292ab400ba977f34",
    stripeSessionId:
      "cs_test_a12mbVk2wq3VNLM0N6OGNzKvJE0OXnnOpq6xSwbkiDoGV1IUkeRI8p0cQA",
    property: {
      title: "Nestrix Luxury Premium Apartment",
      location: "Gulshan-2, Dhaka",
      type: "Apartment",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&auto=format&fit=crop",
    },
    userId: "6a3b8d057feeb7a205556e71",
    moveInDate: "2026-07-09",
    contactNumber: "+8801123562816",
    customerEmail: "natasha@nestrix.ja",
    notes: "",
    amountPaid: "180000.00",
    paymentStatus: "Paid",
    bookingStatus: "Approved",
    bookedAt: "2026-07-06T15:41:44.048Z",
  },
  {
    _id: "6a4bccb8292ab400ba977f35",
    stripeSessionId:
      "cs_test_b98mxYk2wq3VNLM0N6OGNzKvJE0OXnnOpq6xSwbkiDoGV1IUkeRI8p0cQB",
    property: {
      title: "Minimalist Studio Loft",
      location: "Banani, Dhaka",
      type: "Studio Suite",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400&auto=format&fit=crop",
    },
    userId: "6a3b8d057feeb7a205556e71",
    moveInDate: "2026-08-01",
    contactNumber: "+8801123562816",
    customerEmail: "natasha@nestrix.ja",
    notes: "High floor requested",
    amountPaid: "55000.00",
    paymentStatus: "Paid",
    bookingStatus: "Pending",
    bookedAt: "2026-07-05T12:30:11.048Z",
  },
  {
    _id: "6a4bccb8292ab400ba977f36",
    stripeSessionId:
      "cs_test_c45nzZk2wq3VNLM0N6OGNzKvJE0OXnnOpq6xSwbkiDoGV1IUkeRI8p0cQC",
    property: {
      title: "Cozy Suburban Duplex",
      location: "Uttara, Dhaka",
      type: "Duplex House",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=400&auto=format&fit=crop",
    },
    userId: "6a3b8d057feeb7a205556e71",
    moveInDate: "2026-09-10",
    contactNumber: "+8801123562816",
    customerEmail: "natasha@nestrix.ja",
    notes: "",
    amountPaid: "0.00",
    paymentStatus: "Unpaid",
    bookingStatus: "Rejected",
    bookedAt: "2026-07-04T09:15:22.048Z",
  },
];

export default async function BookingsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page || 1);
  const limit = Number(resolvedParams?.limit || 2);
  const user = await getUser();

  const data = await getBookings(user?.id, currentPage);
  console.log(data, "in server");

  // Pure Server Side Metrics Aggregations
  const totalBookings = data.totalBookings;
  const approvedBookings = data.data.filter(
    (b) => b.bookingStatus.toLowerCase() === "approved",
  ).length;
  const pendingBookings = data.data.filter(
    (b) => b.bookingStatus.toLowerCase() === "pending",
  ).length;
  const totalAmountPaid = data.data.reduce(
    (acc, curr) => acc + parseFloat(curr.amountPaid),
    0,
  );

  const paginatedBookings = data.data;
  const totalPages = data.totalPages;

  const summaryMetrics = {
    totalBookings,
    approvedBookings,
    pendingBookings,
    totalAmountPaid,
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 space-y-10 selection:bg-accent selection:text-accent-foreground">
      <BookingHeader />

      {totalBookings === 0 ? (
        <BookingEmptyState />
      ) : (
        <div className="space-y-8">
          <SummaryCards summary={summaryMetrics} />
          <BookingTable bookings={paginatedBookings} />
          {totalPages > 1 && (
            <BookingPagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      )}
    </div>
  );
}
