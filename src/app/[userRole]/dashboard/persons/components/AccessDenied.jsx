import Link from "next/link";

import { FiAlertCircle } from "react-icons/fi";

const AccessDenied = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
      <FiAlertCircle className="text-muted-foreground text-3xl" />
    </div>

    <div>
      <h2 className="text-2xl font-bold text-foreground">Access Denied</h2>
      <p className="text-muted-foreground max-w-sm mt-1">
        You do not have permission to view this page. Only administrators can
        access the user management panel.
      </p>
    </div>

    <Link
      href="/"
      className="mt-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
    >
      Go Home
    </Link>
  </div>
);

export default AccessDenied;
