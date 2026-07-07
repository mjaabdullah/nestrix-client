export default function PaymentStatusBadge({ status }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase border border-border bg-secondary text-secondary-foreground">
      {status}
    </span>
  );
}
