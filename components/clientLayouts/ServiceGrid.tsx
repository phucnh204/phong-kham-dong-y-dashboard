"use client";
import { useState } from "react";
import { useServices, Service } from "@/hooks/useServices";
import Image from "next/image";
import {
  MotionFadeIn,
  MotionItem,
  MotionSection,
  MotionStaggerContainer,
} from "../MotionWrappers";

export default function ServiceGrid() {
  const { data, isLoading, error } = useServices();
  const [showAll, setShowAll] = useState(false);

  if (isLoading)
    return (
      <div className="text-center text-emerald-600 py-10">
        Đang tải dịch vụ...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 py-10">Lỗi tải dịch vụ!</div>
    );

  const services = data || [];
  const displayed = showAll ? services : services.slice(0, 8);

  return (
    <section
      id="service"
      className="py-12 px-2 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50 via-white to-white"
    >
      {/* HEADER */}
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-3 drop-shadow">
          Dịch vụ <span className="text-emerald-600">Chuyên Khoa</span>
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Dẫn đầu về đa dạng dịch vụ Y học cổ truyền – hiện đại. Chăm sóc sức
          khỏe toàn diện, hiệu quả, an toàn cho mọi gia đình.
        </p>
        <div className="border-b-2 border-yellow-300 w-16 mx-auto mt-6"></div>
      </div>

      {/* SERVICES API GRID */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayed.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white/90 rounded-2xl shadow-lg hover:shadow-emerald-200 transition-all duration-300 hover:-translate-y-1 hover:scale-105 border border-gray-100 cursor-pointer flex flex-col h-full"
              tabIndex={0}
              aria-label={`Khám phá dịch vụ ${service.serviceName}`}
              onClick={() => {}}
            >
              <div className="relative w-full h-40 rounded-t-2xl overflow-hidden">
                <Image
                  src={`/${service.imageUrl}`}
                  alt={service.serviceName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col gap-3 p-5 flex-1">
                <h4 className="font-semibold text-gray-900 text-base md:text-lg group-hover:text-emerald-700 transition line-clamp-2 min-h-[48px]">
                  {service.serviceName}
                </h4>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed group-hover:text-gray-800 transition line-clamp-3 min-h-[60px]">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <button className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 transition-all duration-300 hover:shadow-md focus:outline-none">
                    Khám phá
                    <svg
                      className="ml-1 w-4 h-4"
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
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button xem thêm & ẩn bớt */}
        <div className="text-center mt-10 ">
          {!showAll && services.length > 8 && (
            <button
              className="px-6 py-3 cursor-pointer rounded-full font-bold text-white bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 shadow-lg hover:shadow-xl transition-all duration-300 tracking-widest"
              onClick={() => setShowAll(true)}
            >
              Xem Thêm
            </button>
          )}
          {showAll && services.length > 8 && (
            <button
              className="px-6 py-3 cursor-pointer rounded-full font-bold text-emerald-600 bg-white border border-emerald-200 shadow hover:bg-emerald-50 transition-all duration-300 tracking-widest"
              onClick={() => setShowAll(false)}
            >
              Ẩn Bớt
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
