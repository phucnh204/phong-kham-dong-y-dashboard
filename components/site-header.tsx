import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import {
  Bell,
  Settings,
  LayoutDashboard,
  Users,
  Calendar,
  HeartPulse,
  List,
} from "lucide-react";
// import { NavUser } from "@/components/nav-user";
import { useCurrentUser } from "@/hooks/useCurrentUser"; // 👈
import { HeaderUserMenu } from "./ui/HeaderUserMenu";

function getPageTitle(pathname: string): {
  label: string;
  icon: React.ReactNode;
} {
  const segments = pathname.split("/").filter(Boolean);
  const current = segments[segments.length - 1];
  const map: Record<string, { label: string; icon: React.ReactNode }> = {
    dashboard: {
      label: "Tổng quan",
      icon: <LayoutDashboard className="w-5 h-5 text-emerald-500" />,
    },
    staff: {
      label: "Nhân sự",
      icon: <Users className="w-5 h-5 text-cyan-500" />,
    },
    patients: {
      label: "Bệnh nhân",
      icon: <HeartPulse className="w-5 h-5 text-pink-500" />,
    },
    services: {
      label: "Dịch vụ",
      icon: <List className="w-5 h-5 text-blue-500" />,
    },
    appointments: {
      label: "Lịch hẹn",
      icon: <Calendar className="w-5 h-5 text-amber-500" />,
    },
  };
  return map[current] || { label: "Trang", icon: null };
}

export function SiteHeader() {
  const pathname = usePathname();
  const page = getPageTitle(pathname);

  // Lấy user từ context, KHÔNG hardcode
  const user = useCurrentUser(); // hoặc: const { user } = useAuth();

  return (
    <header
      className="
        sticky top-0 z-40
        flex h-16 w-full items-center shadow-[0_4px_24px_0_rgba(16,185,129,0.08)] backdrop-blur-xl bg-white/85
        px-4 lg:px-8 border-b border-slate-100 transition-all
      "
    >
      <SidebarTrigger className="mr-1 lg:mr-2" />
      <Separator orientation="vertical" className="mx-2 h-6" />

      {/* Page Title + Icon */}
      <div className="flex items-center gap-2 min-w-0">
        {page.icon}
        <h1 className="truncate text-lg lg:text-xl font-bold text-slate-900 drop-shadow-sm">
          {page.label}
        </h1>
      </div>

      {/* Action & Avatar */}
      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-emerald-50 transition"
        >
          <Bell className="w-5 h-5 text-gray-400" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-emerald-50 transition"
        >
          <Settings className="w-5 h-5 text-gray-400" />
        </Button>

        {/* <NavUser /> */}
        <HeaderUserMenu />
      </div>
    </header>
  );
}
