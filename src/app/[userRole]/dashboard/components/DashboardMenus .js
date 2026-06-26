import {
  Archive,
  BellFill,
  Factory,
  Heart,
  House,
  ListUl,
  Person,
  Persons,
  Plus,
  Receipt,
} from "@gravity-ui/icons";

export const ROLES = {
  TENANT: "tenant",
  OWNER: "owner",
  ADMIN: "admin",
};

export const ROLE_LABELS = {
  [ROLES.TENANT]: "Tenant",
  [ROLES.OWNER]: "Owner",
  [ROLES.ADMIN]: "Admin",
};

export const ROLE_COLORS = {
  [ROLES.TENANT]: "bg-accent text-accent-foreground",
  [ROLES.OWNER]: "bg-primary text-primary-foreground",
  [ROLES.ADMIN]: "bg-secondary text-secondary-foreground",
};

export const DASHBOARD_MENUS = {
  [ROLES.TENANT]: [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: House,
      href: "/tenant/dashboard",
    },
    {
      key: "bookings",
      label: "My Bookings",
      icon: ListUl,
      href: "/tenant/dashboard/bookings",
    },
    {
      key: "favorites",
      label: "Favorites",
      icon: Heart,
      href: "/tenant/dashboard/favorites",
    },
    {
      key: "profile",
      label: "Profile",
      icon: Person,
      href: "/tenant/dashboard/profile",
    },
  ],
  [ROLES.OWNER]: [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: House,
      href: "/owner/dashboard",
    },
    {
      key: "add-property",
      label: "Add Property",
      icon: Plus,
      href: "/owner/dashboard/add-property",
    },
    {
      key: "properties",
      label: "My Properties",
      icon: Factory,
      href: "/owner/dashboard/properties",
    },
    {
      key: "booking-requests",
      label: "Booking Requests",
      icon: BellFill,
      href: "/owner/dashboard/booking-requests",
    },
    {
      key: "profile",
      label: "Profile",
      icon: Person,
      href: "/owner/dashboard/profile",
    },
  ],
  [ROLES.ADMIN]: [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: House,
      href: "/admin/dashboard",
    },
    {
      key: "Persons",
      label: "All Persons",
      icon: Persons,
      href: "/admin/dashboard/persons",
    },
    {
      key: "all-properties",
      label: "All Properties",
      icon: Factory,
      href: "/admin/dashboard/all-properties",
    },
    {
      key: "all-bookings",
      label: "All Bookings",
      icon: Archive,
      href: "/admin/dashboard/all-bookings",
    },
    {
      key: "transactions",
      label: "Transactions",
      icon: Receipt,
      href: "/admin/dashboard/transactions",
    },
    {
      key: "profile",
      label: "Profile",
      icon: Person,
      href: "/admin/dashboard/profile",
    },
  ],
};

export const BREADCRUMB_MAP = {
  dashboard: "Dashboard",
  bookings: "My Bookings",
  favorites: "Favorites",
  profile: "Profile",
  "add-property": "Add Property",
  properties: "My Properties",
  "booking-requests": "Booking Requests",
  Persons: "All Persons",
  "all-properties": "All Properties",
  "all-bookings": "All Bookings",
  transactions: "Transactions",
};
