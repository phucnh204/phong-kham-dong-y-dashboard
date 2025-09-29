"use client";
import React, { useState, useMemo } from "react";
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
import { Eye, Pencil, Plus } from "lucide-react";
import { usePersons } from "@/hooks/usePersons";
import { PaginationControls } from "@/components/PaginationControls";
import { getImageSrc } from "@/app/utils/getImageSrc";
import { AddPersonModal } from "@/components/Modal/Person/AddPersonModal";
import { EditStaffModal } from "@/components/Modal/Person/EditStaffModal";

export const ROLES = [
  { key: "", label: "Tất cả" },
  { key: "doctor", label: "Bác sĩ" },
  { key: "nurse", label: "Điều dưỡng" },
  { key: "pharmacist", label: "Dược sĩ" },
  // { key: "receptionist", label: "Lễ tân" },
  { key: "staff", label: "Nhân viên" },
];

export const STATUS = [
  { key: "", label: "Tất cả" },
  { key: "active", label: "Đang làm việc" },
  { key: "inactive", label: "Tạm nghỉ" },
];

export default function StaffPage() {
  const { data: persons, isLoading, isError, refetch } = usePersons();
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);

  const allStaffs = Array.isArray(persons) ? persons : [];

  const filteredStaffs = useMemo(() => {
    return allStaffs.filter((x) => {
      if (role && x.role !== role) return false;
      if (status && (status === "active" ? !x.isActive : x.isActive))
        return false;
      return true;
    });
  }, [allStaffs, role, status]);

  const totalItems = filteredStaffs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const staffs = filteredStaffs.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-8 w-full mx-auto">
      {/* Filter bar */}
      <div className="flex flex-wrap justify-between gap-2 mb-4 border-b pb-2">
        {/* Vai trò */}
        <div className="flex gap-2 flex-wrap">
          {ROLES.map((r) => (
            <Button
              key={r.key}
              onClick={() => {
                setRole(r.key);
                setPage(1);
              }}
              className={
                "rounded-full px-5 py-1 text-base border " +
                (role === r.key
                  ? "bg-emerald-500 border-emerald-500 text-white shadow font-bold"
                  : "bg-white border-emerald-300 text-emerald-600 hover:bg-emerald-50")
              }
            >
              {r.label}
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
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

        {/* Trạng thái */}
        <div className="flex gap-2 flex-wrap">
          {STATUS.map((s) => (
            <Button
              key={s.key}
              onClick={() => {
                setStatus(s.key);
                setPage(1);
              }}
              className={
                "rounded-full px-5 py-1 text-base border " +
                (status === s.key
                  ? "bg-emerald-500 border-emerald-500 text-white shadow font-bold"
                  : "bg-white border-emerald-300 text-emerald-600 hover:bg-emerald-50")
              }
            >
              {s.label}
            </Button>
          ))}
        </div>

        {/* Nút thêm */}
        <Button
          size="lg"
          className="shadow font-semibold px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full"
          onClick={() => setOpenAdd(true)}
        >
          <Plus className="mr-2 h-5 w-5" /> Thêm nhân viên
        </Button>
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
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {staffs.map((staff) => (
              <Card
                key={staff.id}
                className="rounded shadow-md border border-emerald-100/80 hover:shadow-xl transition-all bg-white flex flex-col min-h-[220px]"
              >
                <CardHeader className="flex flex-col items-center gap-3">
                  <Avatar className="w-20 h-20 border shadow bg-emerald-50">
                    <AvatarImage
                      src={getImageSrc(staff.imageUrl)}
                      alt={staff.name}
                    />
                    <AvatarFallback>
                      {staff.name
                        ?.split(" ")
                        .slice(-2)
                        .map((x) => x[0]?.toUpperCase())
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg text-center font-bold line-clamp-1">
                    {staff.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500 text-center line-clamp-1">
                    {staff.specialization ||
                      ROLES.find((r) => r.key === staff.role)?.label}
                  </CardDescription>
                  <Badge
                    className={
                      staff.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-400"
                    }
                  >
                    {staff.isActive ? "Đang làm việc" : "Tạm nghỉ"}
                  </Badge>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 space-y-1">
                  <p className="text-sm text-muted-foreground line-clamp-3 min-h-[48px]">
                    {staff.description}
                  </p>

                  <div className="flex gap-2 mt-auto">
                    <Button
                      disabled
                      size="sm"
                      variant="outline"
                      className="flex-1 flex items-center gap-2 font-semibold"
                    >
                      <Eye className="w-4 h-4" /> Hồ sơ
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingStaff(staff);
                        setOpenEdit(true);
                      }}
                      size="sm"
                      variant="secondary"
                      className="flex-1 flex items-center gap-2 font-semibold"
                    >
                      <Pencil className="w-4 h-4" /> Sửa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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

      <AddPersonModal
        open={openAdd}
        onOpenChange={setOpenAdd}
        onSuccess={refetch}
      />
      <EditStaffModal
        open={openEdit}
        onOpenChange={setOpenEdit}
        staff={editingStaff}
        onSuccess={refetch}
      />
    </div>
  );
}
