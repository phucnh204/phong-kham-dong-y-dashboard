"use client";
import { useRef, useState } from "react";
import { Loader, CheckCircle, AlertCircle, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

// Time slot options
const TIME_OPTIONS = [
  { value: "", label: "Chọn thời gian" },
  { value: "08:00", label: "08:00 - 09:00" },
  { value: "09:00", label: "09:00 - 10:00" },
  { value: "10:00", label: "10:00 - 11:00" },
  { value: "14:00", label: "14:00 - 15:00" },
  { value: "15:00", label: "15:00 - 16:00" },
  { value: "16:00", label: "16:00 - 17:00" },
];

export function DatLichForm({ onSuccess }: { onSuccess?: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 60);
  const [fields, setFields] = useState({
    fullName: "",
    phone: "",
    email: "",
    appointmentDate: today as Date | null, // ngày hôm nay
    appointmentTime: "",
    message: "",
    address: "",
  });
  const [fieldErrors, setFieldErrors] = useState<{ [k: string]: string }>({});

  // Validate
  const validate = () => {
    const errors: { [k: string]: string } = {};
    if (!fields.fullName.trim()) errors.fullName = "Vui lòng nhập họ tên";
    if (!fields.phone.trim()) errors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^0\d{9,10}$/.test(fields.phone.trim()))
      errors.phone = "Số điện thoại phải 10–11 số, bắt đầu bằng 0";
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      errors.email = "Email không hợp lệ";
    if (!fields.appointmentDate) errors.appointmentDate = "Chọn ngày khám";
    return errors;
  };

  // Change input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setError("");
  };

  // Change date
  const handleDateChange = (date: Date | null) => {
    setFields({ ...fields, appointmentDate: date });
    setFieldErrors((prev) => ({ ...prev, appointmentDate: "" }));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstError = Object.keys(errors)[0];
      const el = formRef.current?.querySelector(`[name="${firstError}"]`);
      if (el && typeof (el as any).focus === "function") (el as any).focus();
      return;
    }

    setLoading(true);
    try {
      await fetch("http://localhost:8080/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          appointmentDate: fields.appointmentDate
            ? fields.appointmentDate.toISOString().slice(0, 10)
            : "",
        }),
      });

      if (onSuccess) {
        onSuccess();
        // setTimeout(() => onSuccess(false), 2500);
      }
    } catch (err) {
      // setError("Không kết nối được máy chủ! Chi tiết: " + err.message);
      console.error("Network error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Reset form đăng ký mới
  const handleNew = () => {
    setSuccess(false);
    setFields({
      fullName: "",
      phone: "",
      email: "",
      appointmentDate: today,
      appointmentTime: "",
      message: "",
      address: "",
    });
    setFieldErrors({});
    setTimeout(() => {
      (formRef.current?.querySelector('[name="fullName"]') as any)?.focus?.();
    }, 200);
  };

  return (
    <motion.div
      className="
        relative mx-auto w-full 
        
        p-6 sm:p-4
        font-inter
      "
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
    >
      {/* <AnimatePresence>
        {success && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/90 max-w-sm w-full mx-auto p-8 rounded-2xl border border-green-100 shadow-xl flex flex-col items-center"
              initial={{ scale: 0.94, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 70 }}
            >
              <CheckCircle className="w-12 h-12 text-green-600 mb-2" />
              <div className="z-10 text-center">
                <div className="text-green-900 font-bold text-xl mb-1">
                  Gửi thành công!
                </div>
                <div className="text-green-700 text-sm mb-3">
                  Chúng tôi sẽ gọi/xác nhận sớm nhất.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}

      <div className="relative z-10">
        {error && (
          <motion.div
            className="flex items-center mb-3 bg-red-50 border border-red-200 rounded px-3 py-2"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
          >
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-700 text-sm">{error}</span>
          </motion.div>
        )}

        <form
          ref={formRef}
          className="space-y-0"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Họ tên */}
            <FormField
              label="Họ và tên"
              required
              name="fullName"
              value={fields.fullName}
              onChange={handleChange}
              error={fieldErrors.fullName}
              maxLength={60}
              hint="Ghi đầy đủ họ tên"
            />
            {/* Số điện thoại */}
            <FormField
              label="Số điện thoại"
              required
              name="phone"
              value={fields.phone}
              onChange={handleChange}
              error={fieldErrors.phone}
              maxLength={11}
              pattern="^0\d{9,10}$"
              hint="10–11 số, bắt đầu bằng 0"
            />
            {/* Email */}
            <FormField
              label="Email"
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              name="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              error={fieldErrors.email}
              maxLength={80}
              placeholder="you@email.com"
              required={false}
              hint="Nhập thông tin qua email (nếu có)"
            />
            {/* Địa chỉ */}
            <FormField
              label="Địa chỉ"
              name="address"
              value={fields.address}
              onChange={handleChange}
              maxLength={120}
              required={false}
              hint="Bạn ở đâu?"
            />
            {/* Date Picker */}
            <div className="w-full">
              <label className="block mb-1 font-semibold text-green-800 text-base">
                Ngày khám <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={fields.appointmentDate}
                onChange={handleDateChange}
                minDate={today}
                maxDate={maxDate}
                className="w-full rounded border border-green-100 shadow shadow-green-100 px-4 py-3 text-green-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                dateFormat="dd/MM/yyyy"
                name="appointmentDate"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                disabledKeyboardNavigation
              />
              {fieldErrors.appointmentDate && (
                <p className="text-xs text-red-500 mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />{" "}
                  {fieldErrors.appointmentDate}
                </p>
              )}
            </div>

            {/* Thời gian */}
            <div>
              <label className="block mb-1 font-semibold text-green-800 text-base">
                Thời gian
              </label>
              <select
                name="appointmentTime"
                value={fields.appointmentTime}
                onChange={handleChange}
                className="w-full rounded border border-green-100 bg-white px-4 py-3 text-green-900 focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                {TIME_OPTIONS.map((t) => (
                  <option value={t.value} key={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Lý do khám */}
          <div className="mt-6">
            <label className="block mb-1 font-semibold text-green-800 text-base">
              Lý do khám / Triệu chứng
            </label>
            <textarea
              name="message"
              value={fields.message}
              onChange={handleChange}
              rows={3}
              placeholder="Mô tả triệu chứng hoặc lý do khám..."
              className="w-full rounded border border-green-200 bg-white px-4 py-3 text-green-900 focus:outline-none focus:ring-1 focus:ring-green-500"
              maxLength={300}
              autoComplete="off"
            ></textarea>
          </div>

          <button
            type="submit"
            className={`
              w-full mt-9
              bg-gradient-to-r from-green-500 to-emerald-400 text-white
              rounded-2xl px-6 py-3 sm:px-8 sm:py-4 text-lg font-bold
              hover:from-green-600 hover:to-emerald-500 shadow-xl
              flex items-center justify-center gap-2
              transition-all
              ${loading ? "opacity-70 pointer-events-none" : ""}
            `}
            disabled={loading}
          >
            {loading && <Loader className="animate-spin w-6 h-6" />}
            {loading ? "Đang gửi..." : "Gửi đặt lịch hẹn"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

// Input chuẩn quốc tế, spacing lớn, icon rõ, hint nhỏ, lỗi đỏ đậm
function FormField({ label, required, icon, hint, error, ...props }: any) {
  return (
    <div>
      <label className="block mb-1 font-semibold text-green-800 text-base">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={`w-full ${
            icon ? "pl-12" : ""
          } rounded border px-4 py-3 text-green-900 bg-white focus:outline-none focus:ring-1 focus:ring-green-500 transition ${
            error ? "border-red-300" : "border-green-100"
          }`}
        />
      </div>
      {hint && <p className="text-xs text-green-700/70 mt-0.5">{hint}</p>}
      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" /> {error}
        </p>
      )}
    </div>
  );
}
