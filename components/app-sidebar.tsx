"use client";

import type * as React from "react";
import {
  IconCalendar,
  IconChartBar,
  IconDashboard,
  IconFlask,
  IconHeart,
  IconLeaf,
  IconMedicineSyrup,
  IconNotes,
  IconPill,
  IconReport,
  IconSearch,
  IconSettings,
  IconStethoscope,
  IconUsers,
  IconUserCheck,
  IconHelp,
} from "@tabler/icons-react";

// import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
// import { NavSecondary } from "@/components/nav-secondary";
// import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import Image from "next/image";
import { useCurrentUser } from "@/hooks/useCurrentUser";
// import { UserCircle } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Tổng quan",
      url: "dashboard",
      icon: IconDashboard,
    },
    {
      title: "Lịch hẹn",
      url: "/appointments",
      icon: IconCalendar,
    },
    {
      title: "Bệnh nhân",
      url: "/patients", // Updated from "#" to patients page route
      icon: IconUserCheck,
    },

    {
      title: "Dịch vụ khám bệnh",
      url: "/services", // Updated from "#" to examination page route
      icon: IconStethoscope,
    },
    {
      title: "Nhân sự/Bác sĩ",
      url: "/staff", // Updated from "#" to staff page route
      icon: IconUsers,
    },
    {
      title: "Báo cáo",
      url: "/reports", // Updated from "#" to reports page route
      icon: IconChartBar,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Lấy user nếu muốn show avatar ở footer
  const user = useCurrentUser();

  return (
    <Sidebar
      collapsible="offcanvas"
      className="bg-gradient-to-b from-emerald-50 to-white shadow-2xl border-r border-emerald-100 backdrop-blur-lg min-h-screen"
      {...props}
    >
      <SidebarHeader className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="!p-2 flex items-center gap-3 hover:bg-primary/5 group transition "
            >
              <a
                href="/admin/dashboard"
                className="flex items-center  w-full select-none"
              >
                {/* Logo */}
                <img
                  src="/logo.png"
                  alt="Logo Phòng khám"
                  className="w-9 h-9 rounded-full shadow group-hover:scale-110 transition-all duration-200 flex-shrink-0"
                  draggable={false}
                />
                {/* Brand title block: fix width & overflow */}
                <div className="flex flex-col justify-center min-w-0">
                  <span className="font-extrabold text-lg text-emerald-700 drop-shadow-sm group-hover:text-primary transition-all duration-150 leading-tight whitespace-nowrap">
                    Phòng khám
                  </span>
                  <span className="text-[10px] text-emerald-500 font-medium tracking-wide mt-0.5 leading-tight whitespace-nowrap">
                    Traditional Medicine
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <hr
        className="
     mx-4 border-0 h-[2px] rounded-full
    bg-gradient-to-r from-emerald-300/0 via-emerald-400/40 to-emerald-200/0
    dark:from-emerald-600/0 dark:via-emerald-400/40 dark:to-emerald-900/0
    shadow-[0_1px_8px_0_rgba(16,185,129,0.10)]
  "
      />

      {/* Main nav (NavMain đã nâng cấp rồi) */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
