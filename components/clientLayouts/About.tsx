"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner_doi_tac from "@/assets/images/banner-doi-tac.png";
import banner_mau_to_roi_phong_kham from "@/assets/images/banner-mau-to-roi-phong-kham.png";
import banner_1 from "@/assets/images/banner-1.png";
import banner_tinh_1 from "@/assets/images/pktmngocanh.png";
import banner_tinh_2 from "@/assets/images/banner-doi-ngu-bac-si-4.png";
import bacsi from "@/assets/images/anh-bac-si.png";
import bapthuoc from "@/assets/images/bap-thuoc-dongy-cach-dung.png";
import vatly from "@/assets/images/vat-ly-tri-lieu.png";
import nghiencuu from "@/assets/images/nghien-cuu.png";
import gg_review from "@/assets/images/gg_review.png";
import { Star } from "lucide-react";

import {
  MotionSection,
  MotionFadeIn,
  MotionStaggerContainer,
  MotionItem,
} from "../MotionWrappers";

export default function About() {
  return (
    <MotionSection
      id="about"
      className="w-full min-h-screen bg-gradient-to-br from-[#e8fdf4] via-white to-white px-0 py-0 flex flex-col items-center justify-start"
      style={{ fontFamily: "InterVariable, Inter, Arial, sans-serif" }}
    >
      {/* BANNER SLIDER + TĨNH */}
      <MotionFadeIn>
        <div className="w-full max-w-[1600px] mx-auto mb-4 pt-8 px-2">
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch gap-4">
            {/* SWIPER BANNER */}
            <div className="col-span-7 relative overflow-hidden rounded-3xl shadow-xl min-h-[280px] md:min-h-[340px] lg:min-h-[420px] xl:min-h-[520px]">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                loop
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true, el: ".swiper-pagination" }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                slidesPerView={1}
                spaceBetween={0}
                className="w-full h-full"
              >
                {[banner_mau_to_roi_phong_kham, banner_doi_tac, banner_1].map(
                  (img, idx) => (
                    <SwiperSlide key={idx}>
                      <Image
                        src={img}
                        alt={`Banner ${idx + 1}`}
                        fill
                        className="object-cover w-full h-full"
                        sizes="(min-width: 1024px) 65vw, 100vw"
                        priority={idx === 0}
                      />
                    </SwiperSlide>
                  )
                )}
                {/* Pagination & Navigation */}
                <div className="swiper-pagination absolute bottom-2 left-0 right-0 flex justify-center z-10" />
                <div className="swiper-button-next text-white text-2xl absolute top-1/2 -translate-y-1/2 right-3 rounded-full p-3 opacity-90 hover:opacity-100 z-10 bg-emerald-500/80 shadow-lg" />
                <div className="swiper-button-prev text-white text-2xl absolute top-1/2 -translate-y-1/2 left-3 rounded-full p-3 opacity-90 hover:opacity-100 z-10 bg-emerald-500/80 shadow-lg" />
              </Swiper>
            </div>
            {/* 2 Banner Tĩnh */}
            <MotionStaggerContainer className="col-span-5 flex flex-col gap-4 h-full">
              {[banner_tinh_2, banner_tinh_1].map((img, i) => (
                <MotionItem key={i} delay={i * 0.15}>
                  <div className="relative overflow-hidden rounded-3xl shadow-xl flex-1 min-h-[140px] md:min-h-[180px] xl:min-h-[240px]">
                    <Image
                      src={img}
                      alt={`Right Banner ${i + 1}`}
                      fill
                      className="w-full h-full object-cover"
                      sizes="(min-width: 1024px) 30vw, 100vw"
                    />
                  </div>
                </MotionItem>
              ))}
            </MotionStaggerContainer>
          </div>
        </div>
      </MotionFadeIn>

      {/* SECTION GIỚI THIỆU + GIÁ TRỊ + DỊCH VỤ + FEEDBACK */}
      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-20 px-2 md:px-10 py-8 md:py-16">
        {/* LEFT: GIỚI THIỆU + CTA + FEEDBACK */}
        <MotionFadeIn className="flex-1 flex flex-col justify-center items-start max-w-[540px] w-full">
          <h1 className="text-4xl md:text-5xl font-black text-green-800 mb-4 leading-tight tracking-tighter drop-shadow-md">
            Đông Y Cần Thơ
            <br />
            <span className="text-emerald-700">
              An toàn, hiệu quả, <br /> phục hồi tối ưu
            </span>
          </h1>
          <div className="text-green-900 text-lg font-semibold mb-3">
            Kết hợp tinh hoa y học cổ truyền & công nghệ hiện đại.
          </div>
          <div className="text-gray-700 text-base mb-4">
            Giải pháp toàn diện, bác sĩ chuyên môn cao, thiết bị chuẩn quốc tế.
          </div>
          <ul className="text-emerald-800 text-base space-y-2 mb-6 font-medium">
            <li>✓ Chẩn đoán & điều trị cá nhân hóa</li>
            <li>✓ Hồi phục nhanh, cam kết kết quả</li>
            <li>✓ Hoàn tiền nếu không hài lòng*</li>
          </ul>
          <div className="flex gap-4 mb-4 w-full">
            <a
              href="tel:0989861548"
              className="flex-1 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-green-400 text-white font-bold text-lg shadow-xl hover:scale-105 transition text-center"
            >
              Gọi tư vấn miễn phí
            </a>
            <a
              href="/dat-lich"
              className="flex-1 py-4 rounded-full bg-white border-2 border-emerald-400 text-emerald-700 font-bold text-lg shadow hover:bg-green-50 transition text-center"
            >
              Đặt lịch khám
            </a>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            *Hoàn tiền 100% nếu không hài lòng (áp dụng điều kiện)
          </div>
          {/* Feedback thực tế */}
          <MotionFadeIn className="mt-6">
            <div className="flex items-center gap-4 px-6 py-4 bg-white/95 rounded-2xl shadow-lg">
              <span className="text-emerald-600 font-extrabold text-2xl flex gap-x-2 items-center">
                4.9/5
                <Star className="text-yellow-500 fill-yellow-400 w-8 h-8 animate-pulse" />
              </span>
              <span className="text-gray-700 font-bold text-base">
                | 1.200+ đánh giá thực tế
              </span>
              <Image
                src={gg_review}
                alt="Google Review"
                width={84}
                height={28}
                className="ml-3 rounded-full shadow"
              />
            </div>
          </MotionFadeIn>
        </MotionFadeIn>
        {/* RIGHT: GRID GIÁ TRỊ + DỊCH VỤ */}
        <div className="flex-1 flex flex-col gap-8 items-center w-full">
          {/* Giá trị nổi bật */}
          <MotionStaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full">
            {[
              {
                img: bacsi,
                title: "Bác sĩ chuyên sâu",
                desc: "Chứng chỉ, kinh nghiệm, tận tâm.",
              },
              {
                img: bapthuoc,
                title: "Bài thuốc chọn lọc",
                desc: "Gia truyền, nghiên cứu mới.",
              },
              {
                img: vatly,
                title: "Trị liệu không dùng thuốc",
                desc: "Châm cứu, bấm huyệt, phục hồi.",
              },
              {
                img: nghiencuu,
                title: "Ứng dụng khoa học",
                desc: "Cập nhật phác đồ quốc tế.",
              },
            ].map((item, idx) => (
              <MotionItem key={item.title} delay={0.08 * idx}>
                <div className="bg-white p-6 rounded-2xl border border-green-100 shadow-xl flex flex-col items-center text-center hover:shadow-2xl transition min-h-[160px]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={58}
                    height={58}
                    className="mb-3 mx-auto"
                  />
                  <div className="font-bold text-emerald-700 text-lg mb-1">
                    {item.title}
                  </div>
                  <div className="text-gray-700 text-sm">{item.desc}</div>
                </div>
              </MotionItem>
            ))}
          </MotionStaggerContainer>
          {/* Dịch vụ nổi bật */}
          <MotionStaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-2">
            {[
              {
                title: "Khám & điều trị chuyên khoa",
                desc: "Nội khoa, cơ xương khớp, thần kinh, tiêu hóa, mất ngủ...",
              },
              {
                title: "Châm cứu, bấm huyệt, thủy châm",
                desc: "Phục hồi chức năng, giảm đau, phòng bệnh mãn tính.",
              },
              {
                title: "Thảo dược & dưỡng sinh",
                desc: "Bài thuốc gia truyền, trà dưỡng sinh, chăm sóc sức khỏe.",
              },
            ].map((item, idx) => (
              <MotionItem key={item.title} delay={0.09 * idx}>
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-md flex flex-col items-center text-center hover:shadow-xl transition min-h-[130px]">
                  <div className="font-bold text-emerald-800 mb-2 text-lg">
                    {item.title}
                  </div>
                  <div className="text-green-800 text-base">{item.desc}</div>
                </div>
              </MotionItem>
            ))}
          </MotionStaggerContainer>
        </div>
      </div>
    </MotionSection>
  );
}
