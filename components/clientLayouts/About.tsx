"use client";
import {
  Phone,
  Calendar,
  Shield,
  Award,
  Heart,
  Users,
  Clock,
  Stethoscope,
  Leaf,
  Star,
  Gift,
  Sparkles,
  Crown,
} from "lucide-react";
import { MotionSection, MotionFadeIn, MotionItem } from "../MotionWrappers";

export default function About() {
  const achievements = [
    {
      icon: Users,
      number: "50,000+",
      label: "Bệnh nhân đã điều trị",
      color: "text-blue-600",
    },
    {
      icon: Award,
      number: "25+",
      label: "Năm kinh nghiệm",
      color: "text-amber-600",
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Đánh giá Google",
      color: "text-yellow-500",
    },
    {
      icon: Shield,
      number: "100%",
      label: "An toàn & hiệu quả",
      color: "text-emerald-600",
    },
  ];
  const features = [
    {
      icon: Stethoscope,
      title: "Chẩn đoán chính xác",
      desc: "Kết hợp mạch cổ truyền & công nghệ hiện đại",
    },
    {
      icon: Leaf,
      title: "Thảo dược thiên nhiên",
      desc: "Nguồn gốc rõ ràng, không tác dụng phụ",
    },
    {
      icon: Heart,
      title: "Điều trị toàn diện",
      desc: "Chữa gốc bệnh, tăng cường thể trạng",
    },
    {
      icon: Clock,
      title: "Hỗ trợ 24/7",
      desc: "Tư vấn & theo dõi sức khỏe liên tục",
    },
  ];

  return (
    <div
      id="about"
      className="w-full bg-gradient-to-br from-white via-emerald-50 to-green-50 min-h-[100vh] overflow-hidden"
    >
      <MotionSection
        className="relative flex items-center justify-center min-h-[60vh] sm:min-h-[70vh] lg:min-h-[90vh] py-10 md:py-16 px-0"
        style={{ fontFamily: "InterVariable, Inter, Arial, sans-serif" }}
      >
        {/* BG */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-[10%] left-[10%] w-[350px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[350px] lg:h-[400px] bg-white/50 blur-3xl rounded-full opacity-40"></div>
          <div className="absolute bottom-[-8%] right-[5%] w-[300px] sm:w-[400px] lg:w-[500px] h-[250px] sm:h-[350px] lg:h-[400px] bg-emerald-100/40 blur-2xl rounded-full opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white/60 to-green-50/40"></div>
          <div className="absolute top-0 left-0 w-full h-[5px] sm:h-[6px] bg-gradient-to-r from-emerald-400 via-green-300 to-white blur-lg opacity-60"></div>
        </div>

        {/* MAIN HERO */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-3 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center">
          <MotionFadeIn>
            {/* HEADING */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight text-center drop-shadow">
              <span className="block">Chữa lành</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-400 to-teal-400 animate-gradient-move">
                Sức khỏe toàn diện
              </span>
            </h1>
            <div className="text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-700 font-light mt-3 flex flex-wrap items-center justify-center gap-2 italic">
              <Leaf className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-emerald-500" />
              <span>
                Tinh hoa y học cổ truyền 5000 năm & công nghệ mới nhất
              </span>
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl md:max-w-4xl mx-auto mt-8 mb-10 sm:mb-12 leading-relaxed text-center">
              <span className="font-semibold text-emerald-700">
                Phòng khám chuẩn quốc tế
              </span>
              , cam kết{" "}
              <span className="text-blue-700 font-semibold">
                an toàn – hiệu quả – tận tâm
              </span>{" "}
              cho mọi khách hàng.
              <br />
              Điều trị tận gốc, nâng cao thể trạng, không lo tái phát!
            </p>
            {/* CTA */}
            <div className=" flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center mb-10 sm:mb-14 w-full">
              <a
                href="tel:0989861548"
                className="group inline-flex items-center gap-3 sm:gap-4 px-6 py-3 sm:px-10 sm:py-5 bg-gradient-to-r from-emerald-600 via-emerald-400 to-green-500 text-white font-extrabold text-base sm:text-xl rounded-full shadow-2xl hover:scale-105 hover:shadow-emerald-500/25 transition-all duration-300 border-2 border-emerald-200 w-full sm:w-auto justify-center"
              >
                <Phone className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse" />
                Hotline: 0989.861.548
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-bounce" />
              </a>
              <a
                href="/dat-lich"
                className="inline-flex items-center gap-3 sm:gap-4 px-6 py-3 sm:px-10 sm:py-5 bg-white text-emerald-700 font-extrabold text-base sm:text-xl rounded-full border-2 border-emerald-200 hover:border-emerald-400 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 transition-all duration-300 shadow-xl w-full sm:w-auto justify-center"
              >
                <Calendar className="w-5 h-5 sm:w-7 sm:h-7" />
                Đặt lịch ngay
                <span className="text-xs sm:text-base bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full ml-2 shadow">
                  Miễn phí
                </span>
              </a>
            </div>

            {/* ACHIEVEMENTS: ANIMATION + GLASS CARD */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full max-w-screen-xl mx-auto mb-6 sm:mb-10">
              {achievements.map((item, index) => (
                <MotionItem key={index} delay={index * 0.13}>
                  <div className="group bg-white/80 backdrop-blur-xl rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl hover:shadow-emerald-200 border border-gray-100 flex flex-col items-center transition-all duration-300 hover:scale-105 relative overflow-hidden">
                    <item.icon
                      className={`w-7 h-7 sm:w-10 sm:h-10 ${item.color} mb-2 drop-shadow`}
                    />
                    <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight group-hover:text-emerald-600 transition">
                      {item.number}
                    </div>
                    <div className="text-xs sm:text-base text-gray-500 font-semibold mt-1 text-center">
                      {item.label}
                    </div>
                    <Sparkles className="absolute top-3 right-3 w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 opacity-60 animate-spin" />
                  </div>
                </MotionItem>
              ))}
            </div>

            {/* FEATURES: FLOATING CARD, BLUR BG */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full max-w-screen-xl mx-auto">
              {features.map((item, i) => (
                <MotionItem key={i} delay={i * 0.16}>
                  <div className="flex flex-col items-center gap-2 md:gap-4 bg-gradient-to-b from-emerald-50 via-white/80 to-green-50/80 rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg border-2 border-emerald-100 hover:shadow-emerald-200 hover:scale-105 transition relative overflow-hidden">
                    <item.icon className="w-7 h-7 sm:w-10 sm:h-10 text-emerald-600 flex-shrink-0 drop-shadow" />
                    <div className="font-bold text-emerald-900 text-base sm:text-xl text-center">
                      {item.title}
                    </div>
                    <div className="text-xs sm:text-base text-gray-600 text-center">
                      {item.desc}
                    </div>
                    <div className="absolute -top-3 -right-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-200/50 blur-2xl opacity-50"></div>
                  </div>
                </MotionItem>
              ))}
            </div>
          </MotionFadeIn>
        </div>
      </MotionSection>
      {/* Gradient heading animation */}
      <style jsx global>{`
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradientMove 3s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
