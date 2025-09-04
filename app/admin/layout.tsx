"use client";
import { LayoutWithSidebar } from "@/components/layouts/LayoutWithSidebar";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import type { Metadata } from "next";

// export const metadata: Metadata = {
//   icons: {
//     icon: "logo.png",
//   },
//   title: "Trang Quản trị Phòng khám",
//   description: "Giao diện quản lý phòng khám Đông y Cần Thơ",
// };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //useProtectRoute(); // Chặn không cho user chưa login vào
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutWithSidebar>{children}</LayoutWithSidebar>
    </QueryClientProvider>
  );
}
