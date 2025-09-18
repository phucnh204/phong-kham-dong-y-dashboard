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
    <section className="w-full min-h-screen flex flex-col bg-white">
      {/* BANNER (trên cùng) */}
      <div className="flex-shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* SWIPER */}
          <div className="col-span-8 relative overflow-hidden shadow-md min-h-[180px] md:min-h-[260px] lg:min-h-[230px] xl:min-h-[350px]">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              loop={true}
              autoplay={{ delay: 5500, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              slidesPerView={1}
              spaceBetween={10}
              className="w-full h-full"
            >
              <SwiperSlide>
                <Image
                  src={banner_mau_to_roi_phong_kham}
                  alt="Image 1"
                  fill
                  className="object-cover w-full h-full"
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  priority
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={banner_doi_tac}
                  alt="Image 2"
                  fill
                  className="object-cover w-full h-full"
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  priority
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={banner_1}
                  alt="Image 3"
                  fill
                  className="object-cover w-full h-full"
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  priority
                />
              </SwiperSlide>
              <div className="swiper-pagination absolute bottom-2 left-0 right-0 flex justify-center space-x-2 z-10" />
              <div className="swiper-button-next text-white text-xl absolute top-1/2 -translate-y-1/2 right-2 rounded-full p-2 opacity-70 hover:opacity-100 transition-all z-10" />
              <div className="swiper-button-prev text-white text-xl absolute top-1/2 -translate-y-1/2 left-2 rounded-full p-2 opacity-70 hover:opacity-100 transition-all z-10" />
            </Swiper>
          </div>
          {/* BANNER TĨNH */}
          <div className="col-span-4 flex flex-col">
            <div className="relative overflow-hidden shadow-md flex-1 min-h-[80px] md:min-h-[130px] xl:min-h-[170px]">
              <Image
                src={banner_tinh_2}
                alt="Right Banner 1"
                fill
                className="w-full h-full object-cover"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            </div>
            <div className="relative overflow-hidden shadow-md flex-1 min-h-[80px] md:min-h-[130px] xl:min-h-[170px]">
              <Image
                src={banner_tinh_1}
                alt="Right Banner 2"
                fill
                className="w-full h-full object-cover"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
      {/* DANH MỤC DƯỚI, LUÔN ĐẦY PHẦN CÒN LẠI */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full max-w-7xl mx-auto px-2 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {EVENT_CARDS.map((ev) => (
              <a
                href={ev.href}
                key={ev.title}
                className="group bg-gradient-to-br from-green-50 via-white to-emerald-50 hover:from-green-100 hover:to-green-200 rounded-2xl shadow-md flex flex-col items-center justify-center p-5 text-center border border-green-100 transition hover:-translate-y-1 hover:shadow-lg h-full"
                style={{ minHeight: 190 }}
              >
                <div className="w-14 h-14 mb-2 flex items-center justify-center rounded-full bg-white border border-green-200 shadow group-hover:scale-110 transition">
                  <Image
                    src={ev.image}
                    alt={ev.title}
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                </div>
                <div className="font-bold text-green-800 text-lg">
                  {ev.title}
                </div>
                <div className="text-green-700 text-sm mt-1">{ev.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
