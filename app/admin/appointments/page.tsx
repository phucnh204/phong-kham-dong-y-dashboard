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
import { getStatusBadge } from "@/app/utils/status";
import { updateBookingStatus } from "@/app/utils/booking-apis";

export default function AppointmentsPage() {
  const { data: bookings = [], isLoading, isError, refetch } = useBookings();

  // Pagination State
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(9);

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
  const STATUS_OPTIONS = [
    { value: "cho_xu_ly", label: "Chờ xử lý" },
    { value: "da_hoan_thanh", label: "Đã hoàn thành" },
    { value: "da_huy", label: "Đã huỷ" },
  ];

  return (
    <div className="space-y-5 px-4 md:px-8 pt-2  ">
      {/* Top action */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CardHeader className="px-0">
          <CardDescription className="mt-1 text-base text-muted-foreground">
            Tổng cộng:{" "}
            <span className="font-semibold text-emerald-700">
              {bookings.length}
            </span>{" "}
            lịch hẹn
          </CardDescription>
        </CardHeader>
        <div className="flex items-center gap-2 ">
          {/* Modal thgeem mới */}
          {/* <AddBookingModal
            onSuccess={() => {
              refetch();
            }}
          /> */}
        </div>
      </div>

      {/* Header */}

      {/* Booking Card Grid */}
      <CardContent
        className="
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          
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
          pagedBookings.map((b) => {
            const { label, color, icon } = getStatusBadge(b.status);
            const badgeClass = getStatusBadge(b.status);
            return (
              <div
                key={b.id}
                tabIndex={0}
                className="
    group transition
    bg-white/70 backdrop-blur-sm
    border border-gray-100
    shadow-[0_6px_24px_0_rgba(16,185,129,0.08)]
    rounded-2xl px-8 py-7 flex flex-col gap-4 min-h-[220px]
    hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.025]
    outline-none focus:ring-2 focus:ring-emerald-400
  "
              >
                {/* Tên & Badge */}
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="text-xl font-extrabold text-gray-900 truncate tracking-tight"
                    title={b.fullName}
                  >
                    {b.fullName || "Không có tên"}
                  </span>
                  <Badge
                    variant="outline"
                    className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-semibold ${color}
         ${badgeClass} border`}
                  >
                    {icon}
                    {label}
                  </Badge>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-gray-500">
                      Trạng thái:
                    </span>
                    <select
                      value={b.status}
                      onChange={async (e) => {
                        const newStatus = e.target.value;
                        try {
                          await updateBookingStatus(b.id, newStatus);
                          refetch();
                        } catch (err) {
                          console.log("Cập nhật trạng thái thất bại!" + err);
                        }
                      }}
                      className="text-xs border rounded px-2 py-1 bg-white"
                      style={{ minWidth: 120 }}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Ngày & Giờ */}
                <div className="flex items-center justify-around gap-5 text-base text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-emerald-50 rounded-full">
                      <Calendar className="w-4 h-4 opacity-80" />
                    </div>
                    <span>
                      {b.appointmentDate
                        ? (() => {
                            const [y, m, d] = b.appointmentDate.split("-");
                            return `${d}/${m}/${y}`;
                          })()
                        : "--/--/----"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-cyan-50 rounded-full">
                      <Clock className="w-4 h-4 opacity-80" />
                    </div>
                    <span>{b.appointmentTime?.slice(0, 5) || "--:--"}</span>
                  </div>
                </div>
                {/* Liên hệ */}
                <div className="flex justify-between gap-6 flex-wrap text-gray-500">
                  <a
                    href={b.phone ? `tel:${b.phone}` : undefined}
                    className={`flex items-center gap-2 hover:text-emerald-600 transition ${
                      !b.phone && "opacity-60 pointer-events-none"
                    }`}
                  >
                    <div className="p-1.5 bg-orange-50 rounded-full">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span>{b.phone || "Chưa có số"}</span>
                  </a>
                  <a
                    href={b.email ? `mailto:${b.email}` : undefined}
                    className={`flex items-center gap-2 hover:text-emerald-600 transition ${
                      !b.email && "opacity-60 pointer-events-none"
                    }`}
                  >
                    <div className="p-1.5 bg-blue-50 rounded-full">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="truncate" title={b.email}>
                      {b.email || "Chưa có email"}
                    </span>
                  </a>
                </div>
                {/* Ghi chú */}
                <div className="mt-auto text-xs text-gray-400 italic line-clamp-2 min-h-[1.5rem]">
                  {b.message ? ` ${b.message}` : "Không có ghi chú"}
                </div>
              </div>
            );
          })}
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
