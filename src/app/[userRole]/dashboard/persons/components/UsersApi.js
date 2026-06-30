import { authClient } from "@/lib/auth-client";
import { url } from "@/lib/core/property";
import { House, Person, ShieldCheck } from "@gravity-ui/icons";

// ─── Constants ────────────────────────────────────────────────────────────────

export const ROLES = ["tenant", "owner", "admin"];

export const ROWS_PER_PAGE = 5;

export const ROLE_CONFIG = {
  tenant: {
    label: "Tenant",
    className: "bg-muted text-muted-foreground",
    icon: <Person width={12} height={12} />,
  },
  owner: {
    label: "Owner",
    className: "bg-primary text-primary-foreground",
    icon: <House width={12} height={12} />,
  },
  admin: {
    label: "Admin",
    className: "bg-accent text-accent-foreground",
    icon: <ShieldCheck width={12} height={12} />,
  },
};

// ─── Utility ──────────────────────────────────────────────────────────────────

export const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ─── API: Fetch all users ─────────────────────────────────────────────────────
//
export const fetchUsers = async () => {
  const { data: session } = await authClient.token();
  const res = await fetch(`${url}/api/persons`, {
    headers: {
      authorization: `Bearer ${session?.token}`,
    },
  });

  return res.json();
};



export const patchUserRole = async (userId, newRole) => {
  const { data: session } = await authClient.token();
  const res = await fetch(`${url}/api/person/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify({ userId, newRole }),
  });

  return res.json();
};
  
