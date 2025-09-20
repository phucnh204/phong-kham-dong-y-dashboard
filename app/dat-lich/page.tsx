"use client";
import { DatLichForm } from "@/components/ui/DatLichForm";
import { AnimatePresence, motion } from "framer-motion";
import {
  HeartPulse,
  Stethoscope,
  Leaf,
  Phone,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DatLichPage() {
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Hàm xử lý thành công
  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      router.push("./");
    }, 2000);
  };
  return (
    <div className="relative  w-full flex items-center justify-center bg-gradient-to-br from-[#ffffff] via-[#cfebaf] to-[#e4f7f9] font-inter overflow-x-hidden">
      {/* BG Blur + Light */}
      {/* <div className="absolute inset-0 -z-20 pointer-events-none bg-gradient-to-br from-[#d8f3f7]/80 to-[#f4fffd]/70" />
      <div className="absolute inset-0 -z-10 pointer-events-none backdrop-blur-[2px]" /> */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30"
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
                <button
                  className="mt-2 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700"
                  onClick={() => setSuccess(false)}
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className=" min-h-screen
        relative z-10 w-full max-w-7xl 
        flex flex-col-reverse lg:flex-row 
        items-center lg:items-stretch 
        gap-10 lg:gap-20 
        px-3 sm:px-8 py-8 
      "
      >
        {/* LEFT: CLINIC INFO */}
        <section className="w-full lg:w-1/2 flex flex-col justify-center gap-8">
          <header className="mb-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-cyan-900 mb-4 tracking-tight leading-tight drop-shadow-lg">
              PHÒNG KHÁM ĐÔNG Y <span className="text-[#16b6a6]">CẦN THƠ</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl leading-relaxed mb-4">
              <span className="font-semibold text-[#0ea37b]">
                Hơn 10 năm chăm sóc sức khỏe cộng đồng
              </span>
              <br />
              Đội ngũ{" "}
              <span className="text-emerald-600 font-semibold">
                bác sĩ dày dạn kinh nghiệm
              </span>{" "}
              ứng dụng Đông - Tây y kết hợp,
              <span className="font-medium">
                {" "}
                an toàn & tối ưu hiệu quả lâu dài
              </span>
              .
            </p>
          </header>
          {/* Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ServiceBox
              icon={
                <Stethoscope className="w-8 h-8 text-[#10b4c6] drop-shadow" />
              }
              title="Khám & Chẩn đoán"
              desc="Tư vấn cá nhân hóa, chẩn đoán chuyên sâu, bảo mật tuyệt đối."
            />
            <ServiceBox
              icon={<Leaf className="w-8 h-8 text-[#1cb45c] drop-shadow" />}
              title="Điều trị cổ truyền"
              desc="Bốc thuốc, châm cứu, vật lý trị liệu chuyên nghiệp."
            />
            <ServiceBox
              icon={
                <HeartPulse className="w-8 h-8 text-[#ed1762] drop-shadow" />
              }
              title="Chăm sóc phục hồi"
              desc="Phục hồi chức năng, tăng cường thể lực & sức khỏe tổng quát."
            />
            <ServiceBox
              icon={
                <Phone className="w-8 h-8 text-[#16b6a6] drop-shadow animate-pulse" />
              }
              title="Hotline tư vấn"
              desc={
                <a
                  href="tel:0988 123 456"
                  className="underline font-semibold text-lg text-[#16b6a6] hover:text-[#128477] transition"
                >
                  0989 861 548
                </a>
              }
            />
          </div>
        </section>

        {/* RIGHT: FORM */}
        <main className="w-full lg:w-1/2 flex flex-col items-center mt-5">
          <div
            className="
            w-full max-w-lg 
             shadow
             backdrop-blur-md 
            px-4 py-10 md:py-14 
            bg-white/70
            transition hover:ring-[#16b6a6b0]
          "
          >
            <div className="mb-8">
              <h2 className=" text-3xl sm:text-4xl text-green-600 font-extrabold text-center mb-2 tracking-tight">
                Đặt lịch khám bệnh
              </h2>
              <p className="text-gray-600 text-center text-lg leading-relaxed">
                Vui lòng điền đủ thông tin để đăng ký lịch khám với bác sĩ.
                <br />
                <span className="font-semibold text-[#4a8a5a]">
                  Lễ tân sẽ liên hệ xác nhận ngay trong giờ làm việc.
                </span>
              </p>
            </div>
            <DatLichForm onSuccess={handleSuccess} />
          </div>
        </main>
      </div>
    </div>
  );
}

// ServiceBox:
function ServiceBox({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: any;
}) {
  return (
    <div
      className="
      bg-white/80 rounded-2xl shadow-lg 
      px-6 py-6 flex flex-col items-center text-center border border-cyan-50 
      min-h-[140px] transition duration-200 
      hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-[#16b6a6]/40
    "
    >
      <div className="mb-3">{icon}</div>
      <div className="font-extrabold text-[#6dc078] text-lg mb-1 drop-shadow">
        {title}
      </div>
      <div className="text-gray-600 text-base">{desc}</div>
    </div>
  );
}
