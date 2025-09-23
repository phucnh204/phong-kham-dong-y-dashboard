"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Phone, Mail, User, Plus } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";
import { PaginationControls } from "@/components/PaginationControls";
import React from "react";

export default function AppointmentsPage() {
  const { data: bookings = [], isLoading, isError } = useBookings();

  // Pagination State
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const totalItems = bookings.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Reset page nếu đổi pageSize hoặc bookings thay đổi
  React.useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [pageSize, totalPages, bookings]);

  // Chỉ lấy các booking thuộc trang hiện tại
  const pagedBookings = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return bookings.slice(start, start + pageSize);
  }, [bookings, page, pageSize]);

  return (
    <div className="space-y-8 px-4 md:px-8 pt-6 bg-gray-50 min-h-screen">
      {/* Top action */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Có thể bật filter nâng cao ở đây */}
          <Button className="rounded-full shadow-sm" size="sm">
            <Plus className="mr-2 w-4 h-4" />
            Đặt lịch mới
          </Button>
        </div>
      </div>

      {/* Header */}
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold text-emerald-800 flex items-center gap-2">
          <span role="img" aria-label="calendar" className="text-2xl">
            🗓️
          </span>
          Tất cả lịch hẹn
        </CardTitle>
        <CardDescription className="mt-1 text-base text-muted-foreground">
          Tổng cộng:{" "}
          <span className="font-semibold text-emerald-700">
            {bookings.length}
          </span>{" "}
          lịch hẹn
        </CardDescription>
      </CardHeader>

      {/* Booking Card Grid */}
      <CardContent
        className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          2xl:grid-cols-4
          py-2
        "
      >
        {isLoading && (
          <div className="col-span-full flex justify-center items-center h-40 text-muted-foreground text-base font-medium animate-pulse">
            Đang tải dữ liệu...
          </div>
        )}
        {isError && (
          <div className="col-span-full flex justify-center items-center h-40 text-destructive text-base font-semibold">
            Lỗi khi tải dữ liệu lịch hẹn.
          </div>
        )}
        {!isLoading && !pagedBookings.length && (
          <div className="col-span-full flex justify-center items-center h-40 text-muted-foreground text-base italic">
            Không có lịch hẹn nào trong trang này.
          </div>
        )}

        {!isLoading &&
          pagedBookings.map((b) => (
            <div
              key={b.id}
              className="
                p-5 rounded-2xl bg-white border border-gray-100 
                shadow-[0_2px_12px_0_rgba(16,185,129,0.07)] transition
                flex flex-col gap-2 hover:shadow-xl hover:-translate-y-1
              "
            >
              {/* Time + Status */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-sm font-bold text-emerald-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {b.appointmentTime?.slice(0, 5) || "--:--"}
                </div>
                <Badge
                  variant="outline"
                  className="
                    text-xs px-2 py-0.5 rounded-full
                    border-emerald-200 bg-emerald-50 text-emerald-700
                    font-semibold tracking-wide
                  "
                >
                  Đã đặt
                </Badge>
              </div>
              {/* Patient name */}
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-base text-foreground line-clamp-1">
                  {b.fullName}
                </span>
              </div>
              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="font-semibold">{b.appointmentDate}</span>
              </div>
              {/* Phone */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                {b.phone}
              </div>
              {/* Email */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {b.email}
              </div>
              {/* Message */}
              <div className="text-sm text-gray-600 italic mt-1 line-clamp-2">
                📌 {b.message || "Không có ghi chú"}
              </div>
            </div>
          ))}
      </CardContent>

      {/* Pagination Controls */}
      <div className="pb-6">
        <PaginationControls
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
}
