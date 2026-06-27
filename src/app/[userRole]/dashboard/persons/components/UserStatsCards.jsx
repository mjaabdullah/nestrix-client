import { House, Person, ShieldCheck } from "@gravity-ui/icons";
import { FiUsers } from "react-icons/fi";

const STAT_ITEMS = [
  {
    key: "total",
    label: "Total Users",
    icon: <FiUsers className="text-foreground text-base" />,
    cardClass: "bg-secondary border-border",
    textClass: "text-foreground",
  },
  {
    key: "admin",
    label: "Admins",
    icon: <ShieldCheck width={16} height={16} />,
    cardClass: "bg-accent/10 border-accent/30",
    textClass: "text-accent",
  },
  {
    key: "owner",
    label: "Owners",
    icon: <House width={16} height={16} />,
    cardClass: "bg-primary/10 border-primary/30",
    textClass: "text-primary",
  },
  {
    key: "tenant",
    label: "Tenants",
    icon: <Person width={16} height={16} />,
    cardClass: "bg-muted border-border",
    textClass: "text-foreground",
  },
];

const UserStatsCards = ({ stats }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
    {STAT_ITEMS.map(({ key, label, icon, cardClass, textClass }) => (
      <div
        key={key}
        className={`rounded-xl border p-4 flex flex-col gap-2 ${cardClass}`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
          <span className="opacity-60">{icon}</span>
        </div>
        <span className={`text-2xl font-bold ${textClass}`}>{stats[key]}</span>
      </div>
    ))}
  </div>
);

export default UserStatsCards;
