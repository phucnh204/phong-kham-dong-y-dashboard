"use client";

import { useEffect, useMemo, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill } from "lucide-react";
import { useServices } from "@/hooks/useServices";
import Image from "next/image";
import { PaginationControls } from "@/components/PaginationControls";
import { Input } from "@/components/ui/input";
import { AddServiceModal } from "@/components/Modal/Service/AddServiceModal";

export default function ServicePage() {
  const { data: services = [], isLoading, isError } = useServices();
  const [modalOpen, setModalOpen] = useState(false);
  // console.log(services);

  // SEARCH STATE
  const [search, setSearch] = useState("");
  // PAGINATION STATE
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  // FILTER + SEARCH
  const filteredServices = useMemo(() => {
    if (!search.trim()) return services;
    const s = search.trim().toLowerCase();
    return services.filter((sv) => sv.serviceName?.toLowerCase().includes(s));
  }, [services, search]);

  // PAGINATION
  const totalItems = filteredServices.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pagedServices = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredServices.slice(start, start + pageSize);
  }, [filteredServices, page, pageSize]);

  // RESET PAGE khi search/filter
  useEffect(() => {
    setPage(1);
  }, [search, pageSize, services]);

  function getImageSrc(url?: string) {
    if (!url || typeof url !== "string" || url.trim() === "") {
      return "/placeholder-service.png";
    }

    if (url.startsWith("http://") || url.startsWith("https://")) return url;

    if (url.startsWith("/")) return url;

    return "/" + url;
  }

  return (
    <div className="space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="ml-auto text-muted-foreground text-sm">
          Tổng: <span className="font-bold text-green-700">{totalItems}</span>{" "}
          dịch vụ
        </span>
        <div className="flex flex-wrap gap-2 mb-3 items-center">
          <Input
            className=" rounded-lg px-4 py-2 text-base shadow-sm   transition w-full md:w-[300px]"
            placeholder="Tìm kiếm theo tên dịch vụ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex justify-end mb-4">
            <Button onClick={() => setModalOpen(true)} size="lg">
              + Thêm dịch vụ
            </Button>
          </div>
          <AddServiceModal
            open={modalOpen}
            onOpenChange={setModalOpen}
            onSuccess={() => {
              // refetch lại hoặc reload page nếu cần
              window.location.reload();
            }}
          />
        </div>
      </div>

      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading && (
          <p className="text-muted-foreground">Đang tải dữ liệu...</p>
        )}
        {isError && (
          <p className="text-destructive">Lỗi khi tải danh sách dịch vụ.</p>
        )}
        {!isLoading && !isError && totalItems === 0 && (
          <p className="text-muted-foreground col-span-full">
            Không có dịch vụ nào được hiển thị.
          </p>
        )}

        {pagedServices.map((service) => (
          <div
            key={service.id}
            className="flex items-start gap-4 bg-white/80 rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl transition"
          >
            <Image
              src={getImageSrc(service.imageUrl)}
              alt={service.serviceName || ""}
              width={80}
              height={80}
              className="rounded-lg object-cover border aspect-square bg-gray-50"
            />

            <div className="flex-1 space-y-1 min-w-0">
              <h3 className="text-lg font-semibold text-green-900 truncate">
                {service.serviceName}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {service.description}
              </p>
              <p className="text-sm font-medium text-green-700">
                Giá: {service.price?.toLocaleString()} VND
              </p>
            </div>

            <Button size="sm" variant="outline" className="mt-1">
              Chọn dịch vụ
            </Button>
          </div>
        ))}
      </CardContent>

      {/* Pagination Controls */}
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
