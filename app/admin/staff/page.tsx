"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { usePersons } from "@/hooks/usePersons";
import { PaginationControls } from "@/components/PaginationControls";
import { getImageSrc } from "@/app/utils/getImageSrc";
import { AddPersonModal } from "@/components/Modal/Person/AddPersonModal";

export const ROLES = [
  { key: "", label: "Tất cả" },
  { key: "doctor", label: "Bác sĩ" },
  { key: "nurse", label: "Điều dưỡng" },
  { key: "pharmacist", label: "Dược sĩ" },
  { key: "receptionist", label: "Lễ tân" },
  { key: "staff", label: "Nhân viên" },
];

const STATUS = [
  { key: "", label: "Tất cả" },
  { key: "active", label: "Đang làm việc" },
  { key: "inactive", label: "Tạm nghỉ" },
];

export default function StaffPage() {
  const { data: persons, isLoading, isError } = usePersons();
  const [role, setRole] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(9);
  const [status, setStatus] = React.useState(""); // "" = tất cả
  const [openAdd, setOpenAdd] = React.useState(false);
  const allStaffs = Array.isArray(persons) ? persons : [];

  let filteredStaffs = allStaffs;

  if (role) {
    filteredStaffs = filteredStaffs.filter((x) => x.role === role);
  }
  if (status) {
    filteredStaffs = filteredStaffs.filter((x) =>
      status === "active" ? x.isActive : !x.isActive
    );
  }

  if (role) filteredStaffs = filteredStaffs.filter((x) => x.role === role);

  const totalItems = filteredStaffs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const staffs = filteredStaffs.slice(startIdx, endIdx);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-8 w-full mx-auto">
      <div className="flex justify-between gap-2 mb-4 border-b pb-2">
        {/* Tabs vai trò */}
        <div className="flex gap-2  ">
          {ROLES.map((r) => (
            <Button
              key={r.key}
              variant={role === r.key ? "default" : "ghost"}
              onClick={() => {
                setRole(r.key);
                setPage(1);
              }}
              className={
                "rounded-full px-5 py-1 text-base " +
                (role === r.key
                  ? "bg-emerald-600 text-white shadow font-bold"
                  : "text-emerald-700 hover:bg-emerald-50")
              }
            >
              {r.label}
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                {
                  allStaffs
                    .filter((x) => !r.key || x.role === r.key)
                    .filter(
                      (x) =>
                        !status ||
                        (status === "active" ? x.isActive : !x.isActive)
                    ).length
                }
              </span>
            </Button>
          ))}
        </div>

        <Button
          size="lg"
          className="shadow font-semibold px-6"
          onClick={() => setOpenAdd(true)}
        >
          <Plus className="mr-2 h-5 w-5" />
          Thêm nhân viên
        </Button>
        <AddPersonModal
          open={openAdd}
          onOpenChange={setOpenAdd}
          onSuccess={() => window.location.reload()} // hoặc gọi refetch nếu xài react-query smart hơn
        />

        {/* Tabs trạng thái */}
        {/* <div className="flex gap-2 flex-wrap border-b pb-2">
          {STATUS.map((s) => (
            <Button
              key={s.key}
              variant={status === s.key ? "default" : "ghost"}
              onClick={() => {
                setStatus(s.key);
                setPage(1);
              }}
              className={
                "rounded-full px-5 py-1 text-base " +
                (status === s.key
                  ? "bg-blue-600 text-white shadow font-bold"
                  : "text-blue-700 hover:bg-blue-50")
              }
            >
              {s.label}
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                {
                  allStaffs
                    .filter((x) => !role || x.role === role)
                    .filter(
                      (x) =>
                        !s.key ||
                        (s.key === "active" ? x.isActive : !x.isActive)
                    ).length
                }
              </span>
            </Button>
          ))}
        </div> */}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-center text-emerald-500 py-20 text-lg">
          Đang tải danh sách nhân sự…
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 py-16 text-base">
          Lỗi khi tải nhân sự, thử lại sau.
        </div>
      ) : totalItems === 0 ? (
        <div className="text-center text-gray-500 py-16 text-base">
          Không có nhân sự nào phù hợp.
        </div>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {staffs.map((staff) => (
              <Card
                key={staff.id}
                className="rounded-2xl shadow border border-emerald-100/80 hover:shadow-2xl transition-all bg-white flex flex-col min-h-[400px]"
              >
                <CardHeader className="flex flex-col items-center pb-2 pt-5 gap-2">
                  <Avatar className="w-20 h-20 border shadow bg-emerald-50">
                    <AvatarImage
                      src={getImageSrc(staff.imageUrl)}
                      alt={staff.name}
                    />
                    <AvatarFallback>
                      {staff.name
                        .split(" ")
                        .filter(Boolean)
                        .slice(-2)
                        .map((x) => x[0]?.toUpperCase())
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg text-center font-bold truncate w-full">
                    {staff.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 text-center w-full truncate">
                    {staff.specialization ||
                      ROLES.find((r) => r.key === staff.role)?.label}
                  </CardDescription>
                  <Badge
                    className={
                      "mt-1 px-3 py-1 rounded-full text-xs font-semibold " +
                      (staff.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-400")
                    }
                  >
                    {staff.isActive ? "Đang làm việc" : "Tạm nghỉ"}
                  </Badge>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 space-y-3 pt-1 pb-4 min-h-[60px]">
                  <div className="text-sm text-muted-foreground line-clamp-3 min-h-[36px]">
                    {staff.description}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 font-semibold"
                    >
                      Xem hồ sơ
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex-1 font-semibold"
                    >
                      Chỉnh sửa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <PaginationControls
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalItems={totalItems}
            className="mt-8"
          />
        </>
      )}
    </div>
  );
}
