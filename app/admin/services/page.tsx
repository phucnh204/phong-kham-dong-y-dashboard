"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill } from "lucide-react";
import { useServices } from "@/hooks/useServices";
import Image from "next/image";

export default function ServicePage() {
  const { data: services, isLoading, isError } = useServices();

  return (
    <div className="  space-y-6 p-4 md:p-8 pt-6">
      <div className="space-y-2 mb-4">
        <h1 className="text-3xl font-bold text-green-800 flex items-center gap-2">
          <Pill className="w-6 h-6" />
          Danh sách dịch vụ điều trị
        </h1>
        <p className="text-muted-foreground text-base">
          Quý khách vui lòng lựa chọn các dịch vụ điều trị phù hợp. Tất cả dịch
          vụ được thực hiện bởi đội ngũ bác sĩ YHCT giàu kinh nghiệm, kết hợp
          các bài thuốc và phương pháp Đông y cổ truyền hiệu quả.
        </p>
      </div>

      <CardContent className="grid grid-cols-3 gap-4">
        {isLoading && (
          <p className="text-muted-foreground">Đang tải dữ liệu...</p>
        )}
        {isError && (
          <p className="text-destructive">Lỗi khi tải danh sách dịch vụ.</p>
        )}
        {!isLoading && !isError && services?.length === 0 && (
          <p className="text-muted-foreground">
            Không có dịch vụ nào được hiển thị.
          </p>
        )}

        {services?.map((service) => (
          <div
            key={service.id}
            className="flex items-start gap-4  rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <Image
              // src={`/${service.imageUrl}`}
              src=""
              alt={service.serviceName}
              width={80}
              height={80}
              className="rounded-md object-cover border"
            />

            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-semibold text-green-900">
                {service.serviceName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
              <p className="text-sm font-medium text-green-700">
                Giá: {service.price.toLocaleString()} VND
              </p>
            </div>

            <Button size="sm" variant="outline" className="mt-1">
              Chọn dịch vụ
            </Button>
          </div>
        ))}
      </CardContent>
    </div>
  );
}
