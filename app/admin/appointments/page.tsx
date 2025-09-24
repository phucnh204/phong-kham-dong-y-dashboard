"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";

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
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [tab, setTab] = React.useState("all");
  // Pagination State
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(9);

  // // Reset page nếu đổi pageSize hoặc bookings thay đổi
  const filteredBookings = React.useMemo(() => {
    if (tab === "all") return bookings;
    return bookings.filter((b) => b.status === tab);
  }, [bookings, tab]);

  const totalItems = filteredBookings.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const pagedBookings = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredBookings.slice(start, start + pageSize);
  }, [filteredBookings, page, pageSize]);

  React.useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [pageSize, totalPages, filteredBookings]);

  const STATUS_OPTIONS = [
    { value: "cho_xu_ly", label: "Chờ xử lý" },
    { value: "da_hoan_thanh", label: "Đã hoàn thành" },
    { value: "da_huy", label: "Đã huỷ" },
  ];

  const TABS = [
    { value: "all", label: "Tất cả" },
    { value: "cho_xu_ly", label: "Chờ xử lý" },
    { value: "da_hoan_thanh", label: "Đã hoàn thành" },
    { value: "da_huy", label: "Đã huỷ" },
  ] as const; // <-- thêm as const
  type TabValue = (typeof TABS)[number]["value"];
  const countByStatus: Record<TabValue, number> = React.useMemo(() => {
    const count: Record<TabValue, number> = {
      all: bookings.length,
      cho_xu_ly: 0,
      da_hoan_thanh: 0,
      da_huy: 0,
    };
    bookings.forEach((b) => {
      if (b.status in count) count[b.status as TabValue]++;
    });
    return count;
  }, [bookings]);

  React.useEffect(() => {
    setPage(1);
  }, [tab]);

  return (
    <div className="space-y-5 px-4 md:px-8 pt-2  ">
      {/* Top action */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CardHeader className="px-0">
          {/* <CardDescription className="mt-1 text-base text-muted-foreground">
            Tổng cộng:{" "}
            <span className="font-semibold text-emerald-700">
              {bookings.length}
            </span>{" "}
            lịch hẹn
          </CardDescription> */}
        </CardHeader>
        <div className="flex items-center gap-2 ">
          {/* Modal thgeem mới */}
          {/* <AddBookingModal
            onSuccess={() => {
              refetch();
            }}
          /> */}
        </div>
        <div className="flex gap-2 my-2">
          {TABS.map((t) => (
            <Button
              key={t.value}
              variant={tab === t.value ? "default" : "outline"}
              size="sm"
              className={
                tab === t.value ? "shadow text-white bg-emerald-700" : ""
              }
              onClick={() => setTab(t.value)}
            >
              {t.label}
              <span className="ml-1 rounded bg-white/70 text-emerald-700 px-1.5 text-xs font-bold min-w-[22px] text-center">
                {countByStatus[t.value]}
              </span>
            </Button>
          ))}
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
                className={`
    group 
    bg-white/80 backdrop-blur-lg
    
    shadow-[0_6px_24px_0_rgba(16,185,129,0.10)]
    rounded-sm p-6 flex flex-col gap-4 
    hover:shadow-xl hover:-translate-y-1 hover:scale-[1.022]
    focus:ring-2 focus:ring-emerald-400 outline-none
    transition-all duration-200 text-green-800
  `}
              >
                {/* Tên khách + Trạng thái */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className="flex items-center gap-1 text-xl font-bold  truncate text-green-800"
                    title={b.fullName}
                  >
                    <User className="w-5 h-5 opacity-80" />
                    {b.fullName || "Không có tên"}
                  </span>
                  <Badge
                    variant="outline"
                    className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-semibold shadow-sm cursor-pointer
        ${color} ${badgeClass} border`}
                    tabIndex={-1}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-1 outline-none bg-transparent border-none cursor-pointer px-1">
                          {icon}
                          <span className="capitalize">{label}</span>
                          <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
                          {loadingId === b.id && (
                            <Loader2 className="animate-spin w-4 h-4 text-emerald-400 ml-1" />
                          )}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        side="bottom"
                        align="start"
                        className="min-w-[140px]"
                      >
                        <DropdownMenuLabel>Đổi trạng thái</DropdownMenuLabel>
                        {STATUS_OPTIONS.map((opt) => (
                          <DropdownMenuItem
                            key={opt.value}
                            disabled={
                              b.status === opt.value || loadingId === b.id
                            }
                            className={`flex items-center gap-2 px-2 py-1.5 text-base
                ${b.status === opt.value ? "opacity-60" : ""}
                hover:bg-emerald-50 hover:text-emerald-700`}
                            onClick={async () => {
                              if (b.status === opt.value) return;
                              setLoadingId(b.id);
                              try {
                                await updateBookingStatus(b.id, opt.value);
                                refetch();
                              } finally {
                                setLoadingId(null);
                              }
                            }}
                          >
                            {getStatusBadge(opt.value).icon}
                            <span className="ml-2">{opt.label}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Badge>
                </div>

                {/* Ngày & Giờ */}
                <div className="flex items-center justify-between gap-4 text-base text-gray-700 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 opacity-80" />
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
                    <Clock className="w-4 h-4 opacity-80" />
                    <span>{b.appointmentTime?.slice(0, 5) || "--:--"}</span>
                  </div>
                </div>

                {/* Liên hệ */}
                <div className="flex items-center justify-between gap-6 flex-wrap text-gray-500 mt-2">
                  <a
                    href={b.phone ? `tel:${b.phone}` : undefined}
                    className={`flex items-center gap-2 hover:text-emerald-600 transition
        ${!b.phone && "opacity-60 pointer-events-none"}`}
                    tabIndex={b.phone ? 0 : -1}
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-base">{b.phone || "Chưa có số"}</span>
                  </a>
                  <a
                    href={b.email ? `mailto:${b.email}` : undefined}
                    className={`flex items-center gap-2 hover:text-emerald-600 transition
        ${!b.email && "opacity-60 pointer-events-none"}`}
                    tabIndex={b.email ? 0 : -1}
                  >
                    <Mail className="w-4 h-4" />
                    <span className="truncate max-w-[220px]" title={b.email}>
                      {b.email || "Chưa có email"}
                    </span>
                  </a>
                </div>

                {/* Ghi chú */}
                <div className=" text-xs text-gray-500 italic line-clamp-2 min-h-[1.5rem]">
                  {b.message ? b.message : "Không có ghi chú"}
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
