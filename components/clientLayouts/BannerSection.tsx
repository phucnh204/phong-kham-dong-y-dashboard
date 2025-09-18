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
import { MotionFadeIn, MotionItem, MotionSection } from "../MotionWrappers";
import { CheckCircle, MapPin, TrendingUp } from "lucide-react";

// Dữ liệu danh mục
const EVENT_CARDS = [
  {
    title: "Ưu đãi tháng 9",
    desc: "Giảm 20% tất cả dịch vụ khám chữa bệnh!",
    image: "/images/discount-event.png", // Icon demo hoặc dùng lucide-react
    href: "#event1",
  },
  {
    title: "Miễn phí tư vấn",
    desc: "Đặt lịch tư vấn sức khỏe miễn phí tuần này.",
    image: "/images/consult-event.png",
    href: "#event2",
  },
  {
    title: "Hoạt động cộng đồng",
    desc: "Chương trình tặng thuốc miễn phí cho hộ nghèo.",
    image: "/images/social-event.png",
    href: "#event3",
  },
  {
    title: "Nhận voucher 100K",
    desc: "Tặng ngay 100K cho khách hàng đầu tiên mỗi ngày.",
    image: "/images/voucher-event.png",
    href: "#event4",
  },
];

export default function BannerSection() {
  return (
    <section className="w-full  flex flex-col bg-white">
      {/* Facility Gallery Section */}
      <MotionSection className=" bg-gradient-to-b from-white to-emerald-50/30">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 mt-1">
          <MotionFadeIn>
            {/* <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                <MapPin className="w-5 h-5" />
                Cơ sở vật chất
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Không gian điều trị{" "}
                <span className="text-blue-600">hiện đại & xanh</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Phòng khám chuẩn quốc tế với không gian xanh, thân thiện môi
                trường, trang thiết bị y tế tiên tiến nhất hiện nay
              </p>
            </div> */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
              {/* Main Gallery Slider */}
              <div className="lg:col-span-2 relative overflow-hidden rounded-3xl shadow-2xl h-full group">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  loop
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
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
                  className="w-full h-full"
                >
                  {[
                    {
                      img: banner_mau_to_roi_phong_kham,
                      title: "Phòng khám hiện đại",
                    },
                    { img: banner_doi_tac, title: "Đối tác uy tín" },
                    { img: banner_1, title: "Không gian xanh" },
                  ].map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="relative w-full h-full">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(min-width: 1024px) 66vw, 100vw"
                          priority={idx === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                          <h3 className="text-2xl font-bold mb-2">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                            <span className="text-emerald-200">
                              Chứng nhận quốc tế
                            </span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}

                  {/* Enhanced Navigation */}
                  <div className="hero-swiper-pagination absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10"></div>
                  <div className="hero-swiper-button-next absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 bg-white/95 hover:bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer z-10 group/btn">
                    <svg
                      className="w-6 h-6 text-emerald-600 group-hover/btn:text-emerald-700"
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
                  <div className="hero-swiper-button-prev absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 bg-white/95 hover:bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer z-10 group/btn">
                    <svg
                      className="w-6 h-6 text-emerald-600 group-hover/btn:text-emerald-700"
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

              {/* Side Images with Enhanced Design */}
              <div className="space-y-6">
                {[
                  {
                    img: banner_tinh_2,
                    title: "Đội ngũ bác sĩ",
                    subtitle: "Chuyên gia hàng đầu",
                  },
                  {
                    img: banner_tinh_1,
                    title: "Phòng khám",
                    subtitle: "Không gian xanh",
                  },
                ].map((item, i) => (
                  <MotionItem key={i} delay={i * 0.15}>
                    <div className="relative overflow-hidden rounded-2xl shadow-xl h-[185px] group cursor-pointer">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(min-width: 1024px) 33vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="text-lg font-bold">{item.title}</h4>
                        <p className="text-sm text-gray-200">{item.subtitle}</p>
                      </div>
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </MotionItem>
                ))}
              </div>
            </div>
          </MotionFadeIn>
        </div>
      </MotionSection>
    </section>
  );
}
