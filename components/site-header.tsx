"use client";

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
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { HeaderUserMenu } from "./ui/HeaderUserMenu";
import { motion, AnimatePresence } from "framer-motion";

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

  // Demo unread, trạng thái có thể lấy từ backend thực tế
  const notiUnread = 3;
  const user = useCurrentUser();

  return (
    <header
      className="
        sticky top-0 z-40
        flex h-16 w-full items-center
        shadow-[0_4px_24px_0_rgba(16,185,129,0.10)]
        backdrop-blur-md bg-white/90 dark:bg-slate-900/85
        px-4 lg:px-8 border-b border-slate-100 dark:border-slate-800
        transition-all
      "
    >
      {/* Sidebar trigger (hiện trên mobile) */}
      {/* <div className="lg:hidden mr-2">
        <SidebarTrigger />
      </div> */}

      {/* Page Title + Icon */}
      <div className="flex items-center gap-3 min-w-0 select-none">
        {/* Animate icon khi route đổi */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page.label}
            initial={{ scale: 0.7, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
          >
            {page.icon}
          </motion.div>
        </AnimatePresence>
        <motion.h1
          className="truncate text-lg lg:text-xl font-bold text-slate-900 dark:text-white drop-shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.08 }}
        >
          {page.label}
        </motion.h1>
      </div>

      {/* Separator nhỏ */}
      {/* <Separator orientation="vertical" className="mx-4 h-7 hidden lg:block" /> */}

      {/* Action & Avatar */}
      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        {/* Notification (Badge unread) */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-800/10 transition relative"
          aria-label="Thông báo"
        >
          <Bell className="w-5 h-5 text-gray-400" />
          {notiUnread > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.2rem] flex items-center justify-center border-2 border-white dark:border-slate-900 shadow"
              style={{ fontSize: 11, lineHeight: "1rem" }}
            >
              {notiUnread}
            </span>
          )}
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-800/10 transition"
          aria-label="Cài đặt"
        >
          <Settings className="w-5 h-5 text-gray-400" />
        </Button>

        {/* User Avatar/Menu */}
        <HeaderUserMenu />
      </div>
    </header>
  );
}
