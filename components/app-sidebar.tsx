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

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRoleFromToken } from "@/hooks/useRoleFromToken";

// Định nghĩa menu cho từng role
const SIDEBAR_MENU = {
  admin: [
    { title: "Tổng quan", url: "/admin/dashboard", icon: IconDashboard },
    { title: "Lịch hẹn", url: "/appointments", icon: IconCalendar },
    { title: "Bệnh nhân", url: "/patients", icon: IconUserCheck },
    { title: "Dịch vụ khám bệnh", url: "/services", icon: IconStethoscope },
    { title: "Nhân sự/Bác sĩ", url: "/staff", icon: IconUsers },
    { title: "Báo cáo", url: "/reports", icon: IconChartBar },
  ],
  doctor: [
    { title: "Tổng quan", url: "/doctor/dashboard", icon: IconDashboard },
    { title: "Lịch hẹn", url: "/appointments", icon: IconCalendar },
    { title: "Bệnh nhân của tôi", url: "/patients", icon: IconUserCheck },
    { title: "Chỉ định thuốc", url: "/prescription", icon: IconPill },
    { title: "Báo cáo", url: "/reports", icon: IconChartBar },
  ],
  nurse: [
    { title: "Tổng quan", url: "/nurse/dashboard", icon: IconDashboard },
    { title: "Lịch hẹn", url: "/appointments", icon: IconCalendar },
    { title: "Chăm sóc bệnh nhân", url: "/patients", icon: IconHeart },
    { title: "Nhật ký công việc", url: "/nurse/logs", icon: IconNotes },
  ],
  pharmacist: [
    { title: "Tổng quan", url: "/pharma/dashboard", icon: IconDashboard },
    { title: "Đơn thuốc", url: "/prescriptions", icon: IconNotes },
    { title: "Quản lý thuốc", url: "/medicines", icon: IconMedicineSyrup },
  ],
  staff: [
    { title: "Tổng quan", url: "/staff/dashboard", icon: IconDashboard },
    { title: "Lịch hẹn", url: "/appointments", icon: IconCalendar },
    { title: "Hỗ trợ khách hàng", url: "/support", icon: IconHelp },
  ],
  //
};

function getSidebarMenu(role?: string) {
  if (!role) return SIDEBAR_MENU.staff;
  return SIDEBAR_MENU[role] || SIDEBAR_MENU.staff;
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const user = useCurrentUser();

  // Có thể là "admin", "doctor", "nurse", "pharmacist", "staff",...
  const role = useRoleFromToken() || "staff";
  // alert(role);
  return (
    <Sidebar
      collapsible="offcanvas"
      className="bg-gradient-to-b from-emerald-50 to-white shadow-2xl border-r border-emerald-100 backdrop-blur-lg min-h-screen"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="!p-2 flex items-center gap-3 hover:bg-primary/5 group transition "
            >
              <a
                href="/admin/dashboard"
                className="flex items-center w-full select-none"
              >
                <img
                  src="/logo.png"
                  alt="Logo Phòng khám"
                  className="w-9 h-9 rounded-full shadow group-hover:scale-110 transition-all duration-200 flex-shrink-0"
                  draggable={false}
                />
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
      <SidebarContent>
        <NavMain items={getSidebarMenu(role)} />
      </SidebarContent>
    </Sidebar>
  );
}
