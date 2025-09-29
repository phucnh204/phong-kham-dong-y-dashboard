import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function EditStaffModal({ open, onOpenChange, staff, onSuccess }: any) {
  const [form, setForm] = useState(staff || {});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(staff || {});
  }, [staff]);

  async function handleSave() {
    try {
      setSaving(true);
      const res = await fetch(`http://localhost:8080/persons/${staff.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Update failed");
      onSuccess();
      onOpenChange(false);
    } catch (err) {
      console.error("Lỗi cập nhật", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-emerald-600">
            Sửa thông tin nhân sự
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <Label>Họ tên</Label>
            <Input
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nhập họ tên"
            />
          </div>

          <div className="space-y-2">
            <Label>Chuyên môn</Label>
            <Input
              value={form.specialization || ""}
              onChange={(e) =>
                setForm({ ...form, specialization: e.target.value })
              }
              placeholder="Nhập chuyên môn/vị trí"
            />
          </div>

          <div className="space-y-2">
            <Label>Mô tả</Label>
            <Input
              value={form.description || ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Mô tả ngắn gọn"
            />
          </div>

          <div className="flex items-center gap-3 border rounded-lg p-3">
            <Switch
              id="isActive"
              checked={!!form.isActive}
              onCheckedChange={(val) => setForm({ ...form, isActive: val })}
            />
            <Label htmlFor="isActive" className="font-medium">
              {form.isActive ? (
                <span className="text-emerald-600">Đang làm việc</span>
              ) : (
                <span className="text-gray-500">Tạm nghỉ</span>
              )}
            </Label>
          </div>

          <div className="flex gap-3 pt-3">
            <Button
              variant="outline"
              className="flex-1"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleSave}
              disabled={saving}
            >
              {saving && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
