import { BookOpen, Compass, Library, ClipboardCheck, MessagesSquare, UserCircle, LayoutDashboard } from "lucide-react";

export const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/learn", label: "Learn AI", icon: BookOpen },
  { href: "/tools", label: "Tool Picker", icon: Compass },
  { href: "/prompts", label: "Prompt Library", icon: Library },
  { href: "/assessments", label: "Assessments", icon: ClipboardCheck },
  { href: "/community", label: "Community", icon: MessagesSquare },
  { href: "/profile", label: "Profile", icon: UserCircle },
];
