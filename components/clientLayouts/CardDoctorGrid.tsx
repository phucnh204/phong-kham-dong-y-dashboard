"use client";

import Image from "next/image";
import { useState } from "react";
import { useDoctors } from "@/hooks/useDoctors";
import { BadgeCheck } from "lucide-react";

// List icon và style có thể mở rộng thêm

export default function CardDoctorGrid() {
  const { data: doctors = [], isLoading, error } = useDoctors();
  const [showAll, setShowAll] = useState(false);
  const [imgErr, setImgErr] = useState({});
  const VISIBLE = 8;
  const displayed = showAll ? doctors : doctors.slice(0, VISIBLE);

  const getExtras = (doctor: any) => ({
    position: doctor.position || "Bác sĩ chuyên khoa",
    experience: doctor.experience || "15+ năm kinh nghiệm",
    phone: doctor.phone || "0989 861 548",
    org: doctor.affiliation || "Phòng khám Đông Y Cần Thơ",
    // degree: doctor.degree || "CKI",
    field: doctor.specialization || "Đa khoa",
    achievements: doctor.achievements || [],
    // Bullet points: truyền qua API hoặc mock ở đây cho đẹp
    bullets: doctor.bullets || [
      "Khám & điều trị  cá nhân hóa cho từng bệnh nhân",
      "Chứng chỉ hành nghề, đào tạo chuyên sâu nhiều năm",
      "Kinh nghiệm hợp tác tại các bệnh viện lớn",
    ],
  });

  return (
    <section className="mb-14" id="card-doctor">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="text-center mb-2">
          <h2 className="font-extrabold text-[2.5rem] md:text-[3.3rem] leading-[1.07] text-gray-900 mb-2 drop-shadow-sm">
            <span className="block">Đội Ngũ</span>
            <span className="block text-emerald-600">Bác Sĩ Hàng Đầu</span>
          </h2>
        </div>

        {/* Subheadline style hiện đại */}
        <div className="text-center text-base md:text-xl font-semibold text-emerald-700 flex items-center justify-center gap-2 mb-2">
          <BadgeCheck className="text-emerald-500" size={22} />
          Chuẩn quốc tế – Chuyên môn cao – Tận tâm & trách nhiệm
        </div>

        {/* Gạch chân hiệu ứng */}
        <div className="w-24 border-b-4 border-yellow-300 my-3" />

        {/* Đoạn mô tả ngắn, rõ cam kết */}
        <div className="text-center text-[1.08rem] md:text-lg text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
          Tự hào quy tụ các{" "}
          <b className="text-emerald-600">bác sĩ giàu kinh nghiệm</b>, được đào
          tạo bài bản trong nước & quốc tế, cam kết{" "}
          <span className="text-blue-700 font-bold">
            chẩn đoán chính xác, điều trị tối ưu
          </span>
          , đặt sức khỏe & sự hài lòng của khách hàng lên hàng đầu.
        </div>
      </div>

      {/* Loading/Error */}
      {isLoading && (
        <div className="text-center text-emerald-500 py-10 text-lg animate-pulse">
          Đang tải dữ liệu bác sĩ...
        </div>
      )}
      {error && (
        <div className="text-center text-red-500 py-10 font-semibold">
          Không tải được dữ liệu bác sĩ.
        </div>
      )}

      {/* Doctor Grid Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-10 py-14 bg-gradient-to-b from-white via-green-50/40 to-white">
        {displayed.map((doctor) => {
          const ext = getExtras(doctor);
          return (
            <div
              key={doctor.id}
              className="group relative flex flex-col items-center text-center bg-white rounded border border-green-100 shadow-md hover:shadow-2xl hover:border-green-300/70 transition-all duration-500 ease-out overflow-hidden"
            >
              {/* Glow halo on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-50/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Avatar */}
              <div className="relative mt-8 mb-3">
                <div className="w-28 h-28 rounded-full border-[3px] border-green-100 shadow-lg overflow-hidden mx-auto bg-white ring-1 ring-emerald-50 group-hover:ring-green-300 transition-all duration-500">
                  <Image
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    width={120}
                    height={120}
                    className="object-cover w-full h-full scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                    draggable={false}
                    onError={() =>
                      setImgErr((prev) => ({ ...prev, [doctor.id]: true }))
                    }
                    unoptimized={doctor.imageUrl?.startsWith("http")}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="px-5 flex flex-col flex-1 items-center">
                <h3 className="text-lg md:text-xl font-extrabold text-green-700 mb-1 flex items-center gap-2 leading-tight">
                  {doctor.name}
                  <BadgeCheck
                    className="text-amber-400 group-hover:scale-125 transition-transform duration-300"
                    size={18}
                  />
                </h3>

                <span className="text-[13px] md:text-sm font-semibold text-green-600 uppercase tracking-wide">
                  {ext.position}
                </span>
                <span className="text-gray-500 text-sm mt-0.5">
                  {ext.field}
                </span>

                {/* Divider */}
                <div className="w-10 h-[2px] bg-green-200 my-4 rounded-full group-hover:w-16 group-hover:bg-green-400 transition-all duration-500"></div>

                {/* Contact Button */}
                <a
                  href={`tel:${ext.phone.replace(/\D/g, "")}`}
                  className="mt-auto mb-8"
                >
                  <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold uppercase shadow-md hover:shadow-lg hover:scale-105 transition-all duration-500 tracking-wide">
                    Liên hệ
                  </button>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show more/hide */}
      {doctors.length > VISIBLE && (
        <div className="text-center mt-7 flex gap-2 justify-center">
          {!showAll && (
            <button
              className="bg-gradient-to-br from-emerald-500 to-green-500 hover:from-green-600 hover:to-emerald-600 shadow-lg text-white px-7 py-2 rounded-xl text-base font-bold uppercase tracking-wide transition hover:scale-105"
              onClick={() => setShowAll(true)}
            >
              Xem Thêm
            </button>
          )}
          {showAll && (
            <button
              className="bg-gradient-to-br from-gray-400 to-gray-600 shadow-lg text-white px-7 py-2 rounded-xl text-base font-bold uppercase tracking-wide transition hover:scale-105"
              onClick={() => setShowAll(false)}
            >
              Ẩn Bớt
            </button>
          )}
        </div>
      )}
    </section>
  );
}
