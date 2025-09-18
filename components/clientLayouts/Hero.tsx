"use client";
import Image from "next/image";
import { Phone, CalendarCheck, Star } from "lucide-react";
import anh_hero from "@/assets/images/anh-bac-si-11.png";
import anh_hero_bg from "@/assets/images/anh-bac-si-hero-bg.png";
import gg_review from "@/assets/images/gg_review.png";
import { motion } from "framer-motion";

// Import motion wrapper tái sử dụng
import {
  MotionSection,
  MotionFadeIn,
  MotionStaggerContainer,
  MotionItem,
} from "@/components/MotionWrappers";

export default function HeroSection() {
  return (
    <MotionSection
      id="hero"
      className="relative w-full flex flex-col-reverse lg:flex-row bg-gradient-to-br from-[#e7faf3] via-white to-white overflow-hidden shadow-xl min-h-[600px] max-h-[750px]"
      style={{
        backgroundImage: `url(${anh_hero_bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "InterVariable, Inter, Arial, sans-serif",
      }}
    >
      {/* LEFT: TEXT */}
      <div className="flex-1 flex items-center justify-center z-10 px-4 lg:px-24 py-10">
        <MotionStaggerContainer className="max-w-xl w-full space-y-7">
          <MotionItem>
            <span className="inline-flex items-center gap-2 px-5 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold shadow relative">
              <span className="absolute left-2 w-2 h-2 bg-green-400 rounded-full animate-pulse top-1/2 -translate-y-1/2"></span>
              <span className="pl-4">Được Sở Y Tế Cần Thơ cấp phép</span>
            </span>
          </MotionItem>
          <MotionItem>
            <h1 className="text-4xl lg:text-5xl font-black text-green-900 leading-tight tracking-tight">
              <span className="block">Giải pháp Đông Y</span>
              <span className="text-green-700 block">
                An toàn, hiệu quả sau 14 ngày*
              </span>
            </h1>
          </MotionItem>
          <MotionItem>
            <blockquote className="italic text-green-600 font-medium border-l-4 border-green-400 pl-4 mt-1">
              "Chẩn đoán cá nhân hóa, chăm sóc tận tâm, phục hồi trọn vẹn"
            </blockquote>
          </MotionItem>
          <MotionItem>
            <p className="text-base text-gray-700 mt-1">
              Kết hợp y học cổ truyền & công nghệ hiện đại.
              <br />
              <span className="font-semibold text-green-900">
                Bác sĩ chuyên môn cao, cam kết phục hồi tối ưu cho từng bệnh
                nhân.
              </span>
            </p>
          </MotionItem>
          <MotionItem>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href="tel:0989861548"
                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-400 text-white font-extrabold text-base shadow-xl hover:scale-105 transition-all duration-200"
                aria-label="Gọi ngay"
              >
                <Phone className="w-5 h-5" /> Gọi ngay: 0989 861 548
              </a>
              <a
                href="/dat-lich"
                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-white border border-green-400 text-green-700 font-extrabold text-base shadow-md hover:bg-green-50 transition-all duration-200"
                aria-label="Đặt lịch khám"
              >
                <CalendarCheck className="w-5 h-5" /> Đặt lịch khám
              </a>
            </div>
          </MotionItem>
          <MotionItem>
            <div className="flex flex-col sm:flex-row gap-2 items-start mt-2">
              <span className="text-xs text-gray-400">
                *Hiệu quả tùy cơ địa & mức độ bệnh
              </span>
              <span className="text-xs text-green-600 hidden sm:inline">
                | Cam kết hoàn tiền 100% nếu không hài lòng!
              </span>
            </div>
          </MotionItem>
        </MotionStaggerContainer>
      </div>

      {/* RIGHT: IMAGE + FEEDBACK */}
      <div className="hidden flex-1 relative h-96 lg:h-auto lg:flex items-start ">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-white/95 via-white/70 to-transparent pointer-events-none z-10" />
        <div className="relative w-full h-96 lg:h-[90vh] flex items-end justify-end">
          <div className="absolute w-[96%] left-2 top-3 bg-white/60 rounded-3xl blur-xl z-0"></div>
          <Image
            src={anh_hero}
            alt="Đội ngũ bác sĩ Đông y"
            fill
            className="object-contain w-full min-h-[500px] z-10"
            priority
            // quality={98}
            sizes="50vw"
          />
          {/* FEEDBACK CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
            className="absolute bottom-30 right-8 backdrop-blur-md rounded-2xl shadow-xl px-7 py-5 flex items-center gap-3 z-20"
          >
            {" "}
            <span className="text-green-600 font-extrabold text-xl flex gap-x-1 items-center">
              {" "}
              4.9/5{" "}
              <Star className="text-yellow-500 fill-yellow-400 w-6 h-6 animate-pulse" />{" "}
            </span>{" "}
            <span className="text-gray-700 font-semibold">
              {" "}
              | 1.200+ đánh giá thực tế{" "}
            </span>{" "}
            <Image
              src={gg_review}
              alt="Google Review"
              width={80}
              height={28}
              className="ml-2 rounded-full shadow"
            />{" "}
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
}
