"use client";
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { fetcher } from "@/app/utils/utils";
import { Loader2, UploadCloud } from "lucide-react";
import Image from "next/image";

const ROLES = [
  { value: "doctor", label: "Bác sĩ" },
  { value: "nurse", label: "Điều dưỡng" },
  { value: "pharmacist", label: "Dược sĩ" },
  { value: "receptionist", label: "Lễ tân" },
  { value: "staff", label: "Nhân viên" },
];

export function AddPersonModal({ open, onOpenChange, onSuccess }: any) {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    imageUrl: "",
    description: "",
    role: "",
    isActive: true,
    // Tài khoản user
    username: "",
    email: "",
    password: "",
    createUser: true,
    userId: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Upload avatar API (call /upload)
  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/upload", {
        // Chuyển sang route API của bạn, hoặc dùng API_BASE_URL
        method: "POST",
        body: formData,
        // Đừng set Content-Type, browser sẽ tự set multipart
      });
      const data = await res.json();
      setForm((f) => ({ ...f, imageUrl: data.url }));
      setAvatarPreview(URL.createObjectURL(file));
    } catch {
      alert("Lỗi upload ảnh!");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: any = {
        name: form.name,
        specialization: form.specialization,
        imageUrl: form.imageUrl?.trim() ? form.imageUrl : null,
        description: form.description,
        role: form.role,
        isActive: form.isActive, // Nếu có
      };

      if (form.createUser) {
        payload.username = form.username;
        payload.email = form.email;
        payload.password = form.password;
        payload.userRole = form.role;
      } else {
        payload.userId = form.userId;
      }

      await fetcher("/persons", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      onSuccess?.();
      onOpenChange(false);
    } catch (e: any) {
      alert("Lỗi tạo nhân viên: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg px-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border shadow">
                {avatarPreview || form.imageUrl ? (
                  <Image
                    src={avatarPreview || form.imageUrl}
                    alt="Avatar"
                    width={80}
                    height={80}
                    className="object-cover w-20 h-20"
                  />
                ) : (
                  <div className="w-20 h-20 bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <UploadCloud size={32} />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={uploading}
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="absolute bottom-0 left-0 text-xs"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Đổi ảnh"
                )}
              </Button>
            </div>
            <div className="flex-1">
              <Input
                placeholder="Tên nhân viên"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                required
              />
              <div className="flex gap-3 mt-2 items-center">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isActive: v }))
                  }
                />
                <span
                  className={
                    form.isActive
                      ? "text-emerald-600 font-semibold"
                      : "text-gray-500"
                  }
                >
                  {form.isActive ? "Đang làm việc" : "Tạm nghỉ"}
                </span>
              </div>
            </div>
          </div>

          {/* Chuyên môn, vị trí, role */}
          <div className="flex gap-4">
            <Input
              placeholder="Chuyên môn/vị trí"
              value={form.specialization}
              onChange={(e) =>
                setForm((f) => ({ ...f, specialization: e.target.value }))
              }
              className="flex-1"
            />
            <Select
              value={form.role}
              onValueChange={(v) => setForm((f) => ({ ...f, role: v }))}
              required
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            placeholder="Mô tả"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
          />

          {/* Tài khoản đăng nhập */}
          <div className="bg-gray-50 p-3 rounded-xl border">
            <label className="flex items-center gap-2 mb-2 font-medium">
              <Switch
                checked={form.createUser}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, createUser: v }))
                }
              />
              Tạo tài khoản đăng nhập cho nhân viên này
            </label>
            {form.createUser ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, username: e.target.value }))
                  }
                  required
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  required
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  required
                />
              </div>
            ) : (
              <Input
                placeholder="userId đã có (nếu liên kết user cũ)"
                value={form.userId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, userId: e.target.value }))
                }
                required
              />
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold mt-2"
          >
            {loading ? <Loader2 className="animate-spin mr-2 w-5 h-5" /> : null}
            {loading ? "Đang tạo..." : "Thêm nhân viên"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
