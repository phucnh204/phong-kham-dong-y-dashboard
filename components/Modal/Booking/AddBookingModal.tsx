// "use client";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { Plus, Loader2 } from "lucide-react";
// import { useState, useRef } from "react";
// import { fetcher } from "@/app/utils/utils";
// import { cn } from "@/app/utils/utils";

// // ====== IMPORT ANTD + DAYJS =======
// import { DatePicker, ConfigProvider } from "antd";
// import viVN from "antd/locale/vi_VN";
// import dayjs from "dayjs";
// import "dayjs/locale/vi";
// import "antd/dist/reset.css"; // (tùy dự án, có thể đã import rồi)

// export function AddBookingModal({ onSuccess }: { onSuccess?: () => void }) {
//   const [form, setForm] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     appointmentDate: "",
//     appointmentTime: "",
//     message: "",
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const cancelBtnRef = useRef<HTMLButtonElement>(null);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setSubmitting(true);
//     setError("");
//     try {
//       await fetcher("/bookings", {
//         method: "POST",
//         body: JSON.stringify(form),
//       });
//       setSubmitting(false);
//       onSuccess?.();
//       setForm({
//         fullName: "",
//         phone: "",
//         email: "",
//         appointmentDate: "",
//         appointmentTime: "",
//         message: "",
//       });
//       setTimeout(() => cancelBtnRef.current?.click(), 150);
//     } catch (err: any) {
//       setError(err?.message || "Đã xảy ra lỗi.");
//       setSubmitting(false);
//     }
//   }

//   // ======= Date format hỗ trợ BE (yyyy-MM-dd) =========
//   const dateFormat = "YYYY-MM-DD";

//   return (
//     <ConfigProvider locale={viVN}>
//       <AlertDialog>
//         <AlertDialogTrigger asChild>
//           <Button className="rounded-full shadow-sm" size="lg">
//             <Plus className="mr-2 w-4 h-4" />
//             Đặt lịch mới
//           </Button>
//         </AlertDialogTrigger>
//         <AlertDialogContent className="sm:max-w-[430px] w-full">
//           <AlertDialogHeader>
//             <AlertDialogTitle className="text-xl text-emerald-700">
//               Đặt lịch khám mới
//             </AlertDialogTitle>
//           </AlertDialogHeader>
//           <AlertDialogDescription asChild>
//             <form className="space-y-3 pt-1" onSubmit={handleSubmit}>
//               {/* Họ tên */}
//               <div>
//                 <label className="block font-semibold mb-1 text-sm">
//                   Họ và tên <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   disabled={submitting}
//                   className={cn(
//                     "block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none transition placeholder:text-gray-400 text-base",
//                     "disabled:bg-gray-100"
//                   )}
//                   placeholder="Nguyễn Văn A"
//                   value={form.fullName}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, fullName: e.target.value }))
//                   }
//                 />
//               </div>
//               {/* Số điện thoại */}
//               <div>
//                 <label className="block font-semibold mb-1 text-sm">
//                   Số điện thoại <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   disabled={submitting}
//                   className={cn(
//                     "block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none transition placeholder:text-gray-400 text-base",
//                     "disabled:bg-gray-100"
//                   )}
//                   placeholder="0988123123"
//                   value={form.phone}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, phone: e.target.value }))
//                   }
//                 />
//               </div>
//               {/* Email */}
//               <div>
//                 <label className="block font-semibold mb-1 text-sm">Email</label>
//                 <input
//                   type="email"
//                   disabled={submitting}
//                   className={cn(
//                     "block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none transition placeholder:text-gray-400 text-base",
//                     "disabled:bg-gray-100"
//                   )}
//                   placeholder="mail@gmail.com"
//                   value={form.email}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, email: e.target.value }))
//                   }
//                 />
//               </div>
//               {/* Ngày khám (Antd DatePicker) + Giờ khám */}
//               <div className="flex gap-2">
//                 <div className="flex-1">
//                   <label className="block font-semibold mb-1 text-sm">
//                     Ngày khám <span className="text-red-500">*</span>
//                   </label>
//                   <DatePicker
//                     allowClear={false}
//                     required
//                     locale={viVN.DatePicker}
//                     inputReadOnly // ngăn nhập tay
//                     format="DD/MM/YYYY"
//                     placeholder="Chọn ngày"
//                     className={cn(
//                       "block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none transition text-base !border-gray-300",
//                       "disabled:bg-gray-100"
//                     )}
//                     disabled={submitting}
//                     value={form.appointmentDate ? dayjs(form.appointmentDate, dateFormat) : null}
//                     onChange={(date) =>
//                       setForm((f) => ({
//                         ...f,
//                         appointmentDate: date ? date.format(dateFormat) : "",
//                       }))
//                     }
//                     // Cấm chọn ngày quá khứ
//                     disabledDate={(current) =>
//                       current && current < dayjs().startOf("day")
//                     }
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block font-semibold mb-1 text-sm">
//                     Giờ khám
//                   </label>
//                   <input
//                     type="time"
//                     disabled={submitting}
//                     className={cn(
//                       "block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none transition text-base",
//                       "disabled:bg-gray-100"
//                     )}
//                     value={form.appointmentTime}
//                     onChange={(e) =>
//                       setForm((f) => ({
//                         ...f,
//                         appointmentTime: e.target.value,
//                       }))
//                     }
//                   />
//                 </div>
//               </div>
//               {/* Ghi chú */}
//               <div>
//                 <label className="block font-semibold mb-1 text-sm">
//                   Ghi chú
//                 </label>
//                 <textarea
//                   disabled={submitting}
//                   className={cn(
//                     "block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-emerald-400 outline-none transition placeholder:text-gray-400 text-base resize-none",
//                     "disabled:bg-gray-100"
//                   )}
//                   placeholder="Ghi chú thêm..."
//                   rows={2}
//                   value={form.message}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, message: e.target.value }))
//                   }
//                 />
//               </div>
//               {error && <div className="text-red-500 text-sm">{error}</div>}
//               {/* Actions */}
//               <div className="flex justify-end gap-2 pt-1">
//                 <AlertDialogCancel
//                   ref={cancelBtnRef}
//                   type="button"
//                   className="bg-gray-100 text-gray-700 rounded-lg px-4 py-2"
//                   disabled={submitting}
//                 >
//                   Huỷ
//                 </AlertDialogCancel>
//                 <Button
//                   type="submit"
//                   size="lg"
//                   disabled={submitting}
//                   className="bg-emerald-700 text-white rounded-lg min-w-[108px] flex gap-2 items-center justify-center"
//                 >
//                   {submitting ? (
//                     <Loader2 className="animate-spin w-5 h-5" />
//                   ) : null}
//                   {submitting ? "Đang gửi..." : "Đặt lịch"}
//                 </Button>
//               </div>
//             </form>
//           </AlertDialogDescription>
//         </AlertDialogContent>
//       </AlertDialog>
//     </ConfigProvider>
//   );
// }
