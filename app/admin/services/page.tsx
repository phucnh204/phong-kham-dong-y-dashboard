"use client";

import { useState, useEffect } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";
import Image from "next/image";
import { PaginationControls } from "@/components/PaginationControls";
import { Input } from "@/components/ui/input";
import { AddServiceModal } from "@/components/Modal/Service/AddServiceModal";
import { Badge } from "@/components/ui/badge"; // Bạn cần có Badge component, hoặc dùng từ shadcn/ui
import { Edit } from "lucide-react";
import EditServiceModal from "@/components/Modal/Service/EditServiceModal";
import { getImageSrc } from "@/app/utils/getImageSrc";

const SERVICE_TYPES = [
  { type: "all", label: "Tất cả" },
  { type: "kham", label: "Khám & Tư vấn" },
  { type: "dieutri", label: "Điều trị" },
  { type: "phuchoi", label: "Phục hồi" },
  { type: "khac", label: "Khác" },
];
const STATUS_FILTERS = [
  { key: "", label: "Tất cả trạng thái" },
  { key: "true", label: "Đang hoạt động" },
  { key: "false", label: "Ngừng hoạt động" },
];

export default function ServicePage() {
  const [search, setSearch] = useState("");
  const [currentType, setCurrentType] = useState("all");
  const [isActive, setIsActive] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  // Khi filter thay đổi -> reset về page 1
  useEffect(() => {
    setPage(1);
  }, [search, currentType, isActive, pageSize]);

  // Chỉ truyền filter cho BE, KHÔNG truyền page, pageSize
  const filters = {
    type: undefined, // lấy hết cho FE tự lọc theo tab
    isActive: isActive !== "" ? isActive : undefined,
    search: search.trim() || undefined,
  };

  const { data, isLoading, isError } = useServices(filters);
  const allServices = Array.isArray(data) ? data : data?.data || [];

  // Tính số lượng theo từng tab
  type TypeCounts = { [key: string]: number };

  const typeCounts: TypeCounts = SERVICE_TYPES.reduce((acc: TypeCounts, t) => {
    acc[t.type] =
      t.type === "all"
        ? allServices.length
        : allServices.filter((s) => s.type === t.type).length;
    return acc;
  }, {});

  // FE filter theo currentType
  let filteredServices = allServices;
  if (currentType !== "all") {
    filteredServices = filteredServices.filter((s) => s.type === currentType);
  }

  const totalItems = filteredServices.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Phân trang FE
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const services = filteredServices.slice(startIdx, endIdx);

  return (
    <div className="space-y-6 p-4 md:p-8 pt-6  min-h-[calc(100vh-700px)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2  items-center">
          <div className="flex justify-end">
            <Button onClick={() => setModalOpen(true)} size="lg">
              + Thêm dịch vụ
            </Button>
          </div>
          <AddServiceModal
            open={modalOpen}
            onOpenChange={setModalOpen}
            onSuccess={() => window.location.reload()}
          />
        </div>
        {/* Bộ lọc */}
        <div className="flex flex-wrap gap-2">
          {/* <Input
            className="rounded-lg px-4 py-2 text-base shadow-sm transition w-full md:w-[300px]"
            placeholder="Tìm kiếm theo tên dịch vụ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
          {/* Loại dịch vụ có badge đếm số */}
          {SERVICE_TYPES.map((t) => (
            <Button
              key={t.type}
              variant={currentType === t.type ? "default" : "outline"}
              onClick={() => setCurrentType(t.type)}
              className="flex items-center gap-1 "
            >
              {t.label}
              <Badge className="bg-emerald-50 text-green-700 font-bold">
                {typeCounts[t.type]}
              </Badge>
            </Button>
          ))}
          {/* Trạng thái */}
          <select
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
            className="rounded px-2 py-1 border"
          >
            {STATUS_FILTERS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {isLoading && (
          <p className="text-muted-foreground">Đang tải dữ liệu...</p>
        )}
        {isError && (
          <p className="text-destructive">Lỗi khi tải danh sách dịch vụ.</p>
        )}
        {!isLoading && !isError && services.length === 0 && (
          <p className="text-muted-foreground col-span-full">
            Không có dịch vụ nào được hiển thị.
          </p>
        )}

        {services.map((service) => (
          <div
            key={service.id}
            className="flex items-center gap-5 bg-white/90 rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition group"
          >
            <Image
              src={getImageSrc(service.imageUrl)}
              alt={service.serviceName || ""}
              width={120}
              height={140}
              className="rounded-xl object-cover border aspect-square bg-gray-100 flex-shrink-0 shadow group-hover:scale-105 transition"
            />
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className={
                    "px-2 py-1 rounded-2xl text-sm font-bold " +
                    (service.isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-200 text-gray-400")
                  }
                >
                  {service.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
                </span>
                <span className="px-3 py-1 rounded-2xl bg-indigo-100 text-indigo-700 text-sm font-bold">
                  {renderType(service.type)}
                </span>
                <span className="text-xs text-gray-400 font-semibold ml-2">
                  {formatDate(service.createdAt)}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-green-900 truncate leading-tight">
                {service.serviceName}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 mb-2 line-clamp-2 font-medium">
                {service.description}
              </p>
              <div className="flex items-center gap-2 mt-auto">
                <span className="text-xl font-bold text-green-700">
                  {service.price?.toLocaleString()}{" "}
                  <span className="text-base">VND</span>
                </span>
                <span className="text-base text-gray-500 font-semibold">
                  / {service.unit || "lần"}
                </span>
              </div>
            </div>
            <Button
              onClick={() => {
                setEditingServiceId(service.id);
                setEditModalOpen(true);
              }}
              size="icon"
              variant="outline"
              className="ml-4 rounded-xl border-emerald-100 group-hover:border-emerald-400 transition"
              aria-label="Chỉnh sửa"
            >
              <Edit className="w-6 h-6 text-emerald-700" />
            </Button>
          </div>
        ))}
      </CardContent>
      <EditServiceModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        serviceId={editingServiceId}
        onSuccess={() => {
          setEditModalOpen(false);
          setEditingServiceId(null);
          window.location.reload();
        }}
      />
      <PaginationControls
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItems={totalItems}
        pageSizeOptions={[9, 12, 24, 36, 48]}
      />
    </div>
  );
}

function renderType(type: string) {
  switch (type) {
    case "kham":
      return "Khám & Tư vấn";
    case "dieutri":
      return "Điều trị";
    case "phuchoi":
      return "Phục hồi";
    case "khac":
      return "Khác";
    default:
      return "Không rõ";
  }
}

function formatDate(dateStr: any) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  // VD: 25/09/2025
  return d.toLocaleDateString("vi-VN");
}
