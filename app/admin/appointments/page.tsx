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
import { Calendar, Clock, Phone, Mail, User, Plus, Filter } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";
// import { format } from "date-fns";
// import vi from "date-fns/locale/vi";

export default function AppointmentsPage() {
  const { data: bookings, isLoading, isError } = useBookings();

  return (
    <div className=" space-y-6 p-4 md:p-8 pt-6 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Lọc theo ngày
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Đặt lịch mới
          </Button>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-semibold text-green-800">
          🗓️ Tất cả lịch hẹn
        </CardTitle>
        <CardDescription>
          Tổng cộng: {bookings?.length ?? 0} lịch
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4  gap-4 grid grid-cols-3">
        {isLoading && <p className="text-muted-foreground">Đang tải...</p>}
        {isError && (
          <p className="text-destructive">Lỗi khi tải dữ liệu lịch hẹn.</p>
        )}
        {!isLoading &&
          bookings?.map((b) => (
            <div
              key={b.id}
              className="p-4  rounded-xl shadow-sm bg-white hover:shadow-md transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm font-semibold text-green-700">
                  <Clock className="w-4 h-4 mr-1" />
                  {b.appointmentTime.slice(0, 5)}
                </div>
                <Badge variant="default">Đã đặt</Badge>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-base text-foreground">
                    {b.fullName}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />

                  {b.appointmentDate}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {b.phone}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {b.email}
                </div>

                <div className="text-sm text-gray-600 italic">
                  📌 {b.message || "Không có ghi chú"}
                </div>
              </div>
            </div>
          ))}
      </CardContent>
    </div>
  );
}
