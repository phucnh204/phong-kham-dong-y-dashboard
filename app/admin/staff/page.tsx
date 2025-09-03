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
import { Plus, Settings } from "lucide-react";
import { useDoctors } from "@/hooks/useDoctors";

export default function StaffPage() {
  const { data: doctors, isLoading, isError } = useDoctors();
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-balance">
          Quản lý Nhân sự
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Cài đặt
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Thêm nhân viên
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors?.map((staff, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src={staff.imageUrl || "/placeholder.svg"}
                    alt={staff.name}
                  />
                  <AvatarFallback>
                    {staff.name
                      .split(" ")
                      .slice(-2)
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{staff.name}</CardTitle>
                  <CardDescription>{staff.specialization}</CardDescription>
                </div>
                <Badge variant={staff.isActive ? "default" : "secondary"}>
                  {staff.isActive ? "Đang làm việc" : "Tạm nghỉ"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">
                {staff.description}
              </div>
              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  Xem hồ sơ
                </Button>
                <Button size="sm" className="flex-1">
                  Chỉnh sửa
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
