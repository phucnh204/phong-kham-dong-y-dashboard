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
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

const data = {
  user: {
    name: "Bác sĩ Nguyễn Hữu Púc",
    email: "bacsi@phongkhamdongycantho.vn",
    avatar: "/avatars/doctor.jpg",
  },
  navMain: [
    {
      title: "Tổng quan",
      url: "dashboard", // Updated from "#" to actual dashboard route
      icon: IconDashboard,
    },
    {
      title: "Bệnh nhân",
      url: "/patients", // Updated from "#" to patients page route
      icon: IconUserCheck,
    },
    {
      title: "Lịch hẹn",
      url: "/appointments", // Updated from "#" to appointments page route
      icon: IconCalendar,
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
  navClouds: [
    {
      title: "Thuốc đông y",
      icon: IconLeaf,
      isActive: true,
      url: "/medicine", // Updated from "#" to medicine page route
      items: [
        {
          title: "Kho thuốcdfvbfgbf",
          url: "/medicine/inventory", // Updated from "#" to medicine inventory route
        },
        {
          title: "Đơn thuốc",
          url: "/medicine/prescriptions", // Updated from "#" to prescriptions route
        },
      ],
    },
    {
      title: "Điều trị",
      icon: IconHeart,
      url: "/treatment", // Updated from "#" to treatment page route
      items: [
        {
          title: "Phương pháp",
          url: "/treatment/methods", // Updated from "#" to treatment methods route
        },
        {
          title: "Liệu trình",
          url: "/treatment/courses", // Updated from "#" to treatment courses route
        },
      ],
    },
    {
      title: "Xét nghiệm",
      icon: IconFlask,
      url: "/tests", // Updated from "#" to tests page route
      items: [
        {
          title: "Kết quả",
          url: "/tests/results", // Updated from "#" to test results route
        },
        {
          title: "Lịch sử",
          url: "/tests/history", // Updated from "#" to test history route
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Cài đặt",
      url: "/settings", // Updated from "#" to settings page route
      icon: IconSettings,
    },
    {
      title: "Trợ giúp",
      url: "/help", // Updated from "#" to help page route
      icon: IconHelp,
    },
    // {
    //   title: "Tìm kiếm",
    //   url: "/search", // Updated from "#" to search page route
    //   icon: IconSearch,
    // },
  ],
  // documents: [
  //   {
  //     name: "Hồ sơ bệnh án",
  //     url: "/records", // Updated from "#" to medical records route
  //     icon: IconNotes,
  //   },
  //   {
  //     name: "Báo cáo y tế",
  //     url: "/reports/medical", // Updated from "#" to medical reports route
  //     icon: IconReport,
  //   },
  //   {
  //     name: "Kho thuốc",
  //     url: "/medicine/inventory", // Updated from "#" to medicine inventory route
  //     icon: IconMedicineSyrup,
  //   },
  //   {
  //     name: "Đơn thuốc",
  //     url: "/medicine/prescriptions", // Updated from "#" to prescriptions route
  //     icon: IconPill,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/admin/dashboard">
                {/* Updated from "#" to dashboard route */}

                {/* <IconLeaf className="!size-5 text-primary" /> */}
                <span className=" font-semibold text-xl text-foreground">
                  Phòng khám Đông y
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.navClouds} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      {/* <SidebarFooter><NavUser user={data.user} /></SidebarFooter> */}
    </Sidebar>
  );
}
