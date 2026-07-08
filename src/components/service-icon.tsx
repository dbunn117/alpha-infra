import {
  Rocket,
  Users,
  UserRound,
  ClipboardCheck,
  Compass,
  LineChart,
  Database,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Rocket,
  Users,
  UserRound,
  ClipboardCheck,
  Compass,
  LineChart,
  Database,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Rocket;
  return <Icon className={className} aria-hidden />;
}
