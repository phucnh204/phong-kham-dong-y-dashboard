import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  Mail,
  MapPin,
  IdCard,
  Briefcase,
  Hospital,
  Calendar,
  Flag,
  Ruler,
  Weight,
  Droplet,
  ShieldAlert,
} from "lucide-react";

export function PatientDetailModal({ open, onOpenChange, patient }: any) {
  if (!patient) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">
            Patient Details / Thông tin bệnh nhân
          </DialogTitle>
        </DialogHeader>

        {/* 1. Thông tin cơ bản */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4 mb-4">
          <Field label="Full name / Họ tên" icon={<User className="w-4 h-4" />}>
            {patient.fullName}
          </Field>
          <Field
            label="Date of Birth / Ngày sinh"
            icon={<Calendar className="w-4 h-4" />}
          >
            {patient.dob
              ? new Date(patient.dob).toLocaleDateString("vi-VN")
              : "-"}
          </Field>
          <Field
            label="Gender / Giới tính"
            icon={<Droplet className="w-4 h-4" />}
          >
            <Badge>
              {patient.gender === "male"
                ? "Nam"
                : patient.gender === "female"
                ? "Nữ"
                : "Khác"}
            </Badge>
          </Field>
          <Field label="Phone / Số ĐT" icon={<Phone className="w-4 h-4" />}>
            {patient.phone || "-"}
          </Field>
          <Field label="Email" icon={<Mail className="w-4 h-4" />}>
            {patient.email || "-"}
          </Field>
          <Field
            label="Address / Địa chỉ"
            icon={<MapPin className="w-4 h-4" />}
          >
            {patient.address || "-"}
          </Field>
        </div>

        {/* 2. Thông tin giấy tờ + liên hệ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4 mb-4">
          {patient.cmnd && (
            <Field label="CMND/CCCD" icon={<IdCard className="w-4 h-4" />}>
              {patient.cmnd}
            </Field>
          )}
          {patient.insuranceNumber && (
            <Field
              label="Insurance / BHYT"
              icon={<ShieldAlert className="w-4 h-4" />}
            >
              {patient.insuranceNumber}
            </Field>
          )}
          {patient.job && (
            <Field
              label="Job / Nghề nghiệp"
              icon={<Briefcase className="w-4 h-4" />}
            >
              {patient.job}
            </Field>
          )}
          {patient.workplace && (
            <Field
              label="Workplace / Nơi làm việc"
              icon={<Hospital className="w-4 h-4" />}
            >
              {patient.workplace}
            </Field>
          )}
          {patient.ethnic && (
            <Field label="Ethnic / Dân tộc" icon={<Flag className="w-4 h-4" />}>
              {patient.ethnic}
            </Field>
          )}
          {patient.nationality && (
            <Field
              label="Nationality / Quốc tịch"
              icon={<Flag className="w-4 h-4" />}
            >
              {patient.nationality}
            </Field>
          )}
        </div>

        {/* 3. Thông số thể chất */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4 mb-4">
          {patient.bloodType && (
            <Field
              label="Blood type / Nhóm máu"
              icon={<Droplet className="w-4 h-4" />}
            >
              {patient.bloodType}
            </Field>
          )}
          {patient.height && (
            <Field
              label="Height / Chiều cao"
              icon={<Ruler className="w-4 h-4" />}
            >
              {patient.height} cm
            </Field>
          )}
          {patient.weight && (
            <Field
              label="Weight / Cân nặng"
              icon={<Weight className="w-4 h-4" />}
            >
              {patient.weight} kg
            </Field>
          )}
        </div>

        {/* 4. Tiền sử bệnh, dị ứng, bệnh mãn tính */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {patient.allergies && (
            <Field label="Allergies / Dị ứng">{patient.allergies}</Field>
          )}
          {patient.chronicDiseases && (
            <Field label="Chronic diseases / Bệnh mãn tính">
              {patient.chronicDiseases}
            </Field>
          )}
          {patient.pastDiseases && (
            <Field label="Past diseases / Tiền sử bệnh">
              {patient.pastDiseases}
            </Field>
          )}
          {patient.familyHistory && (
            <Field label="Family history / Tiền sử gia đình">
              {patient.familyHistory}
            </Field>
          )}
          {patient.surgeryHistory && (
            <Field label="Surgery history / Phẫu thuật">
              {patient.surgeryHistory}
            </Field>
          )}
          {patient.note && <Field label="Note / Ghi chú">{patient.note}</Field>}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Component nhỏ hiển thị từng trường
function Field({ label, children, icon }: any) {
  return (
    <div className="flex items-start gap-2">
      {icon && <span className="mt-1 text-emerald-600">{icon}</span>}
      <div>
        <div className="text-xs font-semibold text-muted-foreground">
          {label}
        </div>
        <div className="text-base font-medium text-foreground">{children}</div>
      </div>
    </div>
  );
}
