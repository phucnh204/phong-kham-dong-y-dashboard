"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import banner_doi_tac from "@/assets/images/banner-doi-tac.png";
import banner_mau_to_roi_phong_kham from "@/assets/images/banner-mau-to-roi-phong-kham.png";
import banner_1 from "@/assets/images/banner-1.png";
import banner_tinh_1 from "@/assets/images/pktmngocanh.png";
import banner_tinh_2 from "@/assets/images/banner-doi-ngu-bac-si-4.png";
import { MotionFadeIn, MotionItem, MotionSection } from "../MotionWrappers";
import { CheckCircle, TrendingUp } from "lucide-react";

export default function BannerSection() {
  return (
    <div className="w-[800px] h-full flex flex-col">
      <MotionSection className="relative w-full">
        <MotionFadeIn>
          <div className="flex flex-col gap-1   py-8">
            {/* LEFT: MAIN SLIDER */}
            <div className="relative  rounded overflow-hidden shadow-[0_10px_40px_-10px_rgba(16,185,129,0.3)] group">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                loop
                effect="fade"
                speed={1200}
                autoplay={{ delay: 8000, disableOnInteraction: false }}
                pagination={{
                  clickable: true,
                  el: ".hero-swiper-pagination",
                  bulletActiveClass: "!bg-emerald-500",
                }}
                navigation={{
                  nextEl: ".hero-swiper-button-next",
                  prevEl: ".hero-swiper-button-prev",
                }}
                slidesPerView={1}
              >
                {[
                  {
                    img: banner_mau_to_roi_phong_kham,
                    title: "Phòng khám hiện đại",
                    subtitle: "Trang thiết bị chuẩn quốc tế",
                  },
                  {
                    img: banner_doi_tac,
                    title: "Đối tác y tế uy tín",
                    subtitle: "Hợp tác cùng các tổ chức hàng đầu",
                  },
                  {
                    img: banner_1,
                    title: "Không gian xanh & an lành",
                    subtitle: "Thư giãn – phục hồi – tái tạo năng lượng",
                  },
                ].map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="relative w-full h-[400px]  overflow-hidden">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                        sizes="(min-width: 1024px) 66vw, 100vw"
                        priority={idx === 0}
                      />
                      {/* Overlay ánh sáng gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-emerald-800/20 to-transparent mix-blend-overlay" />
                      {/* Caption */}
                      <div className="absolute bottom-10 left-8">
                        <h3 className="text-3xl md:text-5xl font-black text-white drop-shadow-xl tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-emerald-100 text-sm md:text-base mt-1 font-medium">
                          {item.subtitle}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span className="text-emerald-200 font-medium">
                            Chuẩn quốc tế • ISO 15189:2022
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                {/* Pagination */}
                <div className="hero-swiper-pagination absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10" />
                {/* Navigation */}
                <div className="hero-swiper-button-next absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 bg-white/90 hover:bg-emerald-100 rounded-full shadow-lg flex items-center justify-center cursor-pointer z-10 transition">
                  <svg
                    className="w-6 h-6 text-emerald-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <div className="hero-swiper-button-prev absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 bg-white/90 hover:bg-emerald-100 rounded-full shadow-lg flex items-center justify-center cursor-pointer z-10 transition">
                  <svg
                    className="w-6 h-6 text-emerald-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </div>
              </Swiper>
            </div>

            {/* RIGHT: MINI BANNERS */}
            <div className="flex items-center gap-1">
              {[
                {
                  img: banner_tinh_2,
                  title: "Đội ngũ bác sĩ chuyên khoa",
                  subtitle: "Hơn 15 năm kinh nghiệm điều trị",
                },
                {
                  img: banner_tinh_1,
                  title: "Không gian xanh chuẩn spa",
                  subtitle: "Thư giãn & tái tạo năng lượng tích cực",
                },
                {
                  img: banner_tinh_1,
                  title: "Không gian xanh chuẩn spa",
                  subtitle: "Thư giãn & tái tạo năng lượng tích cực",
                },
              ].map((item, i) => (
                <MotionItem key={i} delay={i * 0.2}>
                  <div className="relative rounded overflow-hidden shadow-[0_10px_30px_-8px_rgba(16,185,129,0.25)] group h-[200px] lg:h-[200px] cursor-pointer transition-all hover:shadow-emerald-500/30">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition duration-500"></div>
                    <div className="absolute bottom-5 left-6 text-white">
                      <h4 className="text-xl lg:text-2xl font-bold mb-1 drop-shadow-md">
                        {item.title}
                      </h4>
                      <p className="text-sm text-emerald-100">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </MotionItem>
              ))}
            </div>
          </div>

          {/* TRUSTED BY SECTION */}
          {/* <div className="flex flex-col items-center justify-center mt-1">
            <div className="flex items-center justify-center gap-8 opacity-80 hover:opacity-100 transition">
              <Image
                src="/assets/images/logo-byt.png"
                alt="Sở Y Tế"
                width={90}
                height={40}
                className="object-contain"
              />
              <Image
                src="/assets/images/logo-iso.png"
                alt="ISO 15189"
                width={90}
                height={30}
                className="object-contain"
              />
              <Image
                src="/assets/images/logo-who.png"
                alt="WHO"
                width={70}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-gray-500 text-sm text-center">
              Được chứng nhận & hợp tác bởi các tổ chức y tế uy tín
            </p>
          </div> */}
        </MotionFadeIn>
      </MotionSection>
    </div>
  );
}
