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
// export const fetchUsers = async () => {
//   const res = await fetch("/api/users");
//   if (!res.ok) throw new Error("Failed to fetch users");
//   return res.json();
// };

export const fetchUsers = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            _id: "1",
            name: "Arif Hossain",
            email: "arif@nestrix.com",
            photo: "https://i.pravatar.cc/150?img=11",
            role: "admin",
            createdAt: "2024-01-15T08:30:00Z",
          },
          {
            _id: "2",
            name: "Sadia Islam",
            email: "sadia@gmail.com",
            photo: "https://i.pravatar.cc/150?img=47",
            role: "owner",
            createdAt: "2024-03-22T14:10:00Z",
          },
          {
            _id: "3",
            name: "Tanvir Alam",
            email: "tanvir@gmail.com",
            photo: "",
            role: "tenant",
            createdAt: "2024-05-03T09:45:00Z",
          },
          {
            _id: "4",
            name: "Nusrat Jahan",
            email: "nusrat@yahoo.com",
            photo: "https://i.pravatar.cc/150?img=31",
            role: "tenant",
            createdAt: "2024-06-18T11:00:00Z",
          },
          {
            _id: "5",
            name: "Rahim Uddin",
            email: "rahim@nestrix.com",
            photo: "https://i.pravatar.cc/150?img=15",
            role: "owner",
            createdAt: "2024-07-30T16:20:00Z",
          },
          {
            _id: "6",
            name: "Mitu Begum",
            email: "mitu@gmail.com",
            photo: "",
            role: "tenant",
            createdAt: "2024-08-05T10:10:00Z",
          },
          {
            _id: "7",
            name: "Fahad Khan",
            email: "fahad@nestrix.com",
            photo: "https://i.pravatar.cc/150?img=53",
            role: "admin",
            createdAt: "2024-09-12T13:55:00Z",
          },
        ]),
      1200,
    ),
  );

// ─── API: Update a user's role ────────────────────────────────────────────────
// export const patchUserRole = async (userId, newRole) => {
//   const res = await fetch(`/api/users/${userId}/role`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ role: newRole }),
//   });
//   if (!res.ok) throw new Error("Failed to update role");
//   return res.json();
// };

export const patchUserRole = (userId, newRole) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() < 0.1) return reject(new Error("Server error"));
      resolve({ success: true });
    }, 900),
  );
