"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Edit, Image as ImageIcon } from "lucide-react";
import { uploadImage } from "@/app/utils/uploadImage";
import { fetcher } from "@/app/utils/utils";
import { Switch } from "@/components/ui/switch";
// import { Combobox } from "@/components/ui/combobox"; // Nếu muốn combo đẹp hơn select truyền thống
// import { uploadImage } from "@/app/utils/uploadImage";

const SERVICE_TYPES = [
  { label: "Khám", value: "kham" },
  { label: "Điều trị", value: "dieutri" },
  { label: "Phục hồi", value: "phuchoi" },
  { label: "Khác", value: "khac" },
];

export default function EditServiceModal({
  open,
  onOpenChange,
  serviceId,
  onSuccess,
}: any) {
  const [form, setForm] = useState({
    serviceName: "",
    description: "",
    price: "",
    imageUrl: "",
    type: "",
    unit: "",
    duration: "",
    discount: "",
    originalPrice: "",
    isActive: true,
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && serviceId) {
      setLoading(true);
      fetch(`http://localhost:8080/services/${serviceId}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            ...data,
            price: data.price?.toString() ?? "",
            originalPrice: data.originalPrice?.toString() ?? "",
            discount: data.discount?.toString() ?? "",
            duration: data.duration?.toString() ?? "",
          });
          setError("");
        })
        .catch(() => setError("Không lấy được dữ liệu dịch vụ!"))
        .finally(() => setLoading(false));
    }
  }, [open, serviceId]);

  async function handleImageChange(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const url = await uploadImage(file);
      setForm((prev) => ({ ...prev, imageUrl: url }));
    } catch (err) {
      setError("Lỗi upload ảnh. Hãy thử lại!");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        originalPrice: form.originalPrice
          ? Number(form.originalPrice)
          : undefined,
        discount: form.discount ? Number(form.discount) : undefined,
        duration: form.duration ? Number(form.duration) : undefined,
      };
      // D
      await fetcher(`/services/${serviceId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      onSuccess?.();
    } catch (err) {
      setError("Lỗi khi cập nhật!");
    } finally {
      setSubmitting(false);
    }
  }

  function getImageSrc(url: any) {
    if (!url || typeof url !== "string" || url.trim() === "") {
      return "/placeholder-service.png";
    }
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `http://localhost:8080/${url.replace(/^\/+/, "")}`;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg sm:rounded-2xl px-3 sm:px-8 py-6">
        {loading ? (
          <div className="flex items-center gap-2 justify-center py-8 text-lg">
            {/* <Loader2 className="animate-spin w-6 h-6 text-primary" />{" "} */}
            <Loader2 className="animate-spin w-10 h-10 text-green-700" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 sm:gap-6"
            autoComplete="off"
          >
            {/* Tên dịch vụ */}
            <div>
              <Label className="font-semibold mb-1">
                Tên dịch vụ <span className="text-red-500">*</span>
              </Label>
              <Input
                className="mt-1"
                placeholder="VD: Khám tổng quát"
                value={form.serviceName}
                onChange={(e) =>
                  setForm({ ...form, serviceName: e.target.value })
                }
                required
                autoFocus
              />
            </div>
            {/* Mô tả */}
            <div>
              <Label className="font-semibold">Mô tả</Label>
              <Textarea
                placeholder="Mô tả ngắn về dịch vụ, lợi ích, điểm nổi bật..."
                value={form.description}
                rows={3}
                className="mt-1"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            {/* Giá, Đơn vị, Thời lượng */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label>
                  Giá (VNĐ) <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  placeholder="VD: 300000"
                  value={form.price}
                  min={0}
                  required
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <div>
                <Label>Đơn vị</Label>
                <Input
                  placeholder="Lần, buổi, gói, tháng..."
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                />
              </div>
              {/* <div>
                <Label>Thời lượng (phút)</Label>
                <Input
                  type="number"
                  placeholder="VD: 30"
                  value={form.duration}
                  min={0}
                  onChange={(e) =>
                    setForm({ ...form, duration: e.target.value })
                  }
                />
              </div> */}
            </div>
            {/* Loại dịch vụ */}
            <div>
              <Label>
                Loại dịch vụ <span className="text-red-500">*</span>
              </Label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded p-2 border mt-1"
                required
              >
                {SERVICE_TYPES.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Ảnh minh họa */}
            <div>
              <Label>
                Ảnh minh họa <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-5 mt-2">
                <label className="cursor-pointer group relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={loading}
                  />
                  <Avatar className="w-20 h-20 ring-2 ring-primary/40 bg-muted shadow-lg transition-all">
                    {form.imageUrl ? (
                      <AvatarImage
                        src={getImageSrc(form.imageUrl)}
                        alt="Ảnh dịch vụ"
                        className="object-cover"
                      />
                    ) : (
                      <AvatarFallback>
                        <ImageIcon className="w-9 h-9 text-gray-400" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute left-0 right-0 bottom-0 flex justify-center">
                    <span className="bg-white bg-opacity-90 rounded px-2 py-1 text-xs font-semibold shadow group-hover:bg-primary/90 group-hover:text-white transition-all">
                      Đổi ảnh
                    </span>
                  </div>
                </label>
                <span className="text-xs text-muted-foreground">
                  Định dạng: jpg, png, jpeg.
                  <br />
                  Tối đa 5MB.
                </span>
              </div>
            </div>

            {/* <div>
              <Label>Ghi chú</Label>
              <Textarea
                placeholder="Ghi chú thêm, điều kiện sử dụng, thông tin đặc biệt..."
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                rows={2}
                className="mt-1"
              />
            </div> */}
            {/* Trạng thái hoạt động */}
            <div className="flex items-center gap-2 mt-2 mb-1">
              <Switch
                checked={form.isActive}
                onCheckedChange={(v) => setForm({ ...form, isActive: v })}
              />
              <Label className="text-base font-semibold">
                Dịch vụ đang hoạt động
              </Label>
            </div>
            {/* Thông báo lỗi */}
            {error && (
              <div className="text-sm text-red-500 font-semibold mt-1">
                {error}
              </div>
            )}
            {/* Nút cập nhật */}
            <Button
              type="submit"
              disabled={submitting || loading}
              className="mt-4 font-bold text-lg h-12 bg-green-600 hover:bg-green-700 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" /> Đang lưu...
                </>
              ) : (
                "Cập nhật"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
