import {
  Globe2,
  Map,
  Workflow,
  ClipboardCheck,
  Trophy,
  Podcast,
  Activity,
  Home,
  Database,
  Users,
  PhoneCall,
  Newspaper,
  Inbox,
  FileStack,
  Receipt,
  BarChart3,
  Calculator,
  BookOpen,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Globe2,
  Map,
  Workflow,
  ClipboardCheck,
  Trophy,
  Podcast,
  Activity,
  Home,
  Database,
  Users,
  PhoneCall,
  Newspaper,
  Inbox,
  FileStack,
  Receipt,
  BarChart3,
  Calculator,
  BookOpen,
  TrendingUp,
};

export function ProjectIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Workflow;
  return <Icon className={className} aria-hidden />;
}
