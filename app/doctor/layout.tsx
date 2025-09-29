"use client";
import { LayoutWithSidebar } from "@/components/layouts/LayoutWithSidebar";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { queryClient } from "@/app/utils/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import type { Metadata } from "next";

// export const metadata: Metadata = {
//   icons: {
//     icon: "logo.png",
//   },
//   title: "Trang Bác Sĩ Phòng khám",
//   description: "Giao diện quản lý phòng khám bác siwx",
// };

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutWithSidebar>{children}</LayoutWithSidebar>
    </QueryClientProvider>
  );
}
