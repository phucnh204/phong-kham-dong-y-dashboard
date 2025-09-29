"use client";
import { useState } from "react";
import { usePatients } from "@/hooks/usePatients";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Search, Plus } from "lucide-react";
import { PaginationControls } from "@/components/PaginationControls";
import { PatientDetailModal } from "@/components/Modal/Patient/PatientDetailModal";

export default function PatientsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Các bộ lọc nâng cao
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [address, setAddress] = useState("");

  const [openDetail, setOpenDetail] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const {
    data: patients,
    total,
    loading,
    error,
  } = usePatients({
    page,
    pageSize,
    search,
    gender,
    dobYear,
    address,
  });

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Quản lý Bệnh nhân</h2>
        <Button>
          <Plus className="mr-2 w-4 h-4" /> Thêm mới
        </Button>
      </div>

      {/* BỘ LỌC NÂNG CAO */}
      <div className="flex flex-wrap gap-2 items-end mb-2">
        <Input
          placeholder="Tìm tên, SĐT..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-[180px]"
        />
        <select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
            setPage(1);
          }}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="">Tất cả giới tính</option>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
          <option value="other">Khác</option>
        </select>

        <Input
          placeholder="Địa chỉ"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setPage(1);
          }}
          className="w-[150px]"
        />
        <Button
          variant="outline"
          onClick={() => {
            setSearch("");
            setGender("");
            setDobYear("");
            setAddress("");
            setPage(1);
          }}
        >
          Xoá lọc
        </Button>
      </div>

      {/* Bảng danh sách bệnh nhân */}
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-left font-medium">#</th>
                <th className="px-4 py-2 text-left font-medium">Họ tên</th>
                <th className="px-4 py-2 text-left font-medium">Ngày sinh</th>
                <th className="px-4 py-2 text-left font-medium">Giới tính</th>
                <th className="px-4 py-2 text-left font-medium">SĐT</th>
                <th className="px-4 py-2 text-left font-medium">Email</th>
                <th className="px-4 py-2 text-left font-medium">Địa chỉ</th>
                <th className="px-4 py-2 text-left font-medium"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-400">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : patients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-500">
                    Không tìm thấy bệnh nhân nào
                  </td>
                </tr>
              ) : (
                patients.map((p, idx) => (
                  <tr
                    key={p.id}
                    className="hover:bg-emerald-50 transition border-b last:border-none"
                  >
                    <td className="px-4 py-2 text-sm">
                      {(page - 1) * pageSize + idx + 1}
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-400" />
                      {p.fullName}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {p.dob
                        ? new Date(p.dob).toLocaleDateString("vi-VN")
                        : "-"}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <Badge
                        variant={p.gender === "male" ? "default" : "secondary"}
                      >
                        {p.gender === "male"
                          ? "Nam"
                          : p.gender === "female"
                          ? "Nữ"
                          : "Khác"}
                      </Badge>
                    </td>
                    <td className="px-4 py-2 text-sm">{p.phone || "-"}</td>
                    <td className="px-4 py-2 text-sm">{p.email || "-"}</td>
                    <td className="px-4 py-2 text-sm">{p.address || "-"}</td>
                    <td className="px-4 py-2 text-right">
                      <Button
                        onClick={() => {
                          setSelectedPatient(p);
                          setOpenDetail(true);
                        }}
                        size="sm"
                        variant="outline"
                      >
                        Chi tiết
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Phân trang */}
      <PaginationControls
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItems={total}
      />

      <PatientDetailModal
        open={openDetail}
        onOpenChange={setOpenDetail}
        patient={selectedPatient}
      />
    </div>
  );
}
