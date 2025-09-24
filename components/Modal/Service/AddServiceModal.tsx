"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function AddServiceModal({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess?: () => void;
}) {
  const [form, setForm] = useState({
    serviceName: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      // Thay /services thành endpoint thật của bạn
      const res = await fetch("http://localhost:8080/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      if (!res.ok) throw new Error("Lỗi khi thêm dịch vụ");
      setForm({ serviceName: "", description: "", price: "", imageUrl: "" });
      onSuccess?.();
      onOpenChange(false);
    } catch (err: any) {
      setError(err?.message || "Đã xảy ra lỗi.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm dịch vụ mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Tên dịch vụ"
            value={form.serviceName}
            required
            onChange={(e) =>
              setForm((f) => ({ ...f, serviceName: e.target.value }))
            }
            disabled={submitting}
          />
          <Input
            placeholder="Mô tả"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            disabled={submitting}
          />
          <Input
            placeholder="Giá (VND)"
            type="number"
            min={0}
            value={form.price}
            required
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            disabled={submitting}
          />
          <Input
            placeholder="Ảnh (URL hoặc /assets/...)"
            value={form.imageUrl}
            onChange={(e) =>
              setForm((f) => ({ ...f, imageUrl: e.target.value }))
            }
            disabled={submitting}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={submitting}>
                Huỷ
              </Button>
            </DialogClose>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Đang thêm..." : "Thêm dịch vụ"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
