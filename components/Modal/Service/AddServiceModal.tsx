"use client";

import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Loader2,
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { uploadImage } from "@/app/utils/uploadImage";
import { fetcher } from "@/app/utils/utils";

const SERVICE_TYPES = [
  { label: "Khám", value: "kham" },
  { label: "Điều trị", value: "dieutri" },
  { label: "Phục hồi", value: "phuchoi" },
  { label: "Khác", value: "khac" },
];

export function AddServiceModal({ open, onOpenChange, onSuccess }: any) {
  const [form, setForm] = useState({
    serviceName: "",
    description: "",
    price: "",
    imageUrl: "",
    type: SERVICE_TYPES[0].value,
    unit: "",
    duration: "",
    discount: "",
    originalPrice: "",
    isActive: true,
    note: "",
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleImageChange(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((prev) => ({ ...prev, imageUrl: url }));
    } catch (err) {
      setError("Lỗi upload ảnh. Hãy thử lại!");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
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
      // Dùng fetcher, endpoint truyền đầy đủ path BE (bắt đầu bằng '/')
      await fetcher("/services", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      setError("Lỗi khi gửi form!");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="px-5  shadow      space-y-4">
        <DialogHeader>
          <div className="text-gray-500 text-sm">
            Các trường <span className="text-red-500">*</span> là bắt buộc.
          </div>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6   "
          autoComplete="off"
        >
          {/* Grid thông tin chính */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Tên dịch vụ + Loại dịch vụ */}
            <div className="space-y-4">
              <div>
                <Label className="font-semibold flex items-center gap-1">
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
              <div>
                <Label className="font-semibold flex items-center gap-1">
                  Loại dịch vụ <span className="text-red-500">*</span>
                </Label>
                <Combobox
                  options={SERVICE_TYPES}
                  value={form.type}
                  onChange={(v) => setForm({ ...form, type: v })}
                  placeholder="Chọn loại dịch vụ"
                  searchable
                  className="w-full"
                />
              </div>
            </div>

            {/* Upload ảnh + preview */}
            <div className="flex flex-col items-center justify-center gap-2">
              <Label className="font-semibold flex items-center gap-1">
                Ảnh minh họa <span className="text-red-500">*</span>
              </Label>
              <label className="relative group flex flex-col items-center gap-1 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={uploading}
                />
                <Avatar className="w-20 h-20 ring-2 ring-primary/40 bg-muted mb-1">
                  {form.imageUrl ? (
                    <AvatarImage
                      src={`http://localhost:8080/${form.imageUrl}`}
                      alt="Ảnh dịch vụ"
                    />
                  ) : (
                    <AvatarFallback>
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute left-0 right-0 -bottom-3 flex justify-center">
                  {uploading ? (
                    <Loader2 className="w-5 h-5 text-yellow-600 animate-spin" />
                  ) : (
                    <span className="bg-white bg-opacity-80 rounded px-2 py-0.5 text-xs font-semibold shadow group-hover:bg-primary/90 group-hover:text-white transition-all">
                      {form.imageUrl ? "Đổi ảnh" : "Chọn ảnh"}
                    </span>
                  )}
                </div>
                {form.imageUrl && (
                  <CheckCircle2 className="w-5 h-5 text-green-500 absolute top-0 right-0" />
                )}
              </label>
              <div className="text-xs text-muted-foreground text-center">
                JPG, PNG, JPEG. Tối đa 5MB.
              </div>
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <Label className="font-semibold">Mô tả</Label>
            <Textarea
              className="mt-1"
              placeholder="Mô tả ngắn về dịch vụ, lợi ích, điểm nổi bật..."
              value={form.description}
              rows={2}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* Giá, đơn vị, thời lượng, giảm giá, giá gốc */}
          <div className="flex gap-3">
            <div>
              <Label className="font-semibold flex items-center gap-1">
                Giá <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                min={0}
                placeholder="VD: 300000"
                value={form.price}
                required
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
            <div>
              <Label className="font-semibold">Đơn vị</Label>
              <Input
                placeholder="Lần, buổi, gói..."
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
              />
            </div>
          </div>

          {/* Thông báo lỗi */}
          {error && (
            <div className="text-red-500 font-medium text-sm px-2 py-1 bg-red-50 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={submitting || uploading}
            className="mt-4 font-bold flex gap-2 items-center text-base h-12 rounded-xl shadow-sm transition-all"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Đang lưu...
              </>
            ) : (
              "Thêm dịch vụ"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
