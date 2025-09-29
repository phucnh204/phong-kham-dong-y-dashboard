"use client";

import Image from "next/image";
import { useState } from "react";
import { useDoctors } from "@/hooks/useDoctors";
import { Phone, BadgeCheck, UserRound } from "lucide-react";

// List icon và style có thể mở rộng thêm

export default function CardDoctorGrid() {
  const { data: doctors = [], isLoading, error } = useDoctors();
  const [showAll, setShowAll] = useState(false);
  const [imgErr, setImgErr] = useState({});
  const VISIBLE = 4;
  const displayed = showAll ? doctors : doctors.slice(0, VISIBLE);

  const getExtras = (doctor) => ({
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2 px-2 md:px-0 lg:mx-6">
        {displayed.map((doctor) => {
          const ext = getExtras(doctor);
          return (
            <div
              key={doctor.id}
              className="bg-white rounded shadow-xl border border-emerald-100 hover:shadow-emerald-200 hover:border-emerald-400 hover:scale-[1.037] transition-all duration-300 flex flex-col items-center px-6 py-8 relative overflow-hidden min-h-[440px]"
            >
              {/* Avatar */}
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-emerald-200 shadow-lg mb-4 bg-white flex items-center justify-center">
                {!imgErr[doctor.id] ? (
                  <Image
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    width={120}
                    height={120}
                    className="object-cover w-full h-full"
                    onError={() =>
                      setImgErr((prev) => ({ ...prev, [doctor.id]: true }))
                    }
                    draggable={false}
                    unoptimized={doctor.imageUrl?.startsWith("http")}
                  />
                ) : (
                  <UserRound className="text-emerald-300 text-7xl" />
                )}
              </div>

              {/* Name & position */}
              <div className="flex flex-col items-center text-center mb-2">
                <h3 className="font-bold text-emerald-800 text-lg uppercase leading-tight flex items-center gap-2">
                  {ext.degree && (
                    <span className="font-bold text-green-600 text-base">
                      {ext.degree}.
                    </span>
                  )}{" "}
                  <span className="text-xl md:text-2xl font-extrabold text-green-700">
                    {doctor.name}
                  </span>
                  <BadgeCheck className="text-yellow-400" size={20} />
                </h3>
                <span className="font-semibold text-green-700 text-sm mt-1">
                  {ext.position}
                </span>
                <span className="text-gray-500 font-medium text-sm">
                  {ext.field}
                </span>
              </div>

              {/* Bullet chuyên môn – kinh nghiệm */}
              <ul className="text-left w-full text-gray-700 text-[15px] mt-4 mb-2 px-1 list-disc list-inside">
                {ext.bullets.map((b, i) => (
                  <li key={i} className="mb-1">
                    {b}
                  </li>
                ))}
                {/* Có thể thêm giải thưởng/kinh nghiệm nếu muốn */}
              </ul>

              {/* Extra info: kinh nghiệm, tổ chức, sđt */}
              <div className="w-full flex flex-col gap-2 mt-2 mb-4 text-[14px]">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="text-emerald-500" size={15} />
                  <b>Kinh nghiệm:</b> <span>{ext.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-green-600" size={15} />
                  <b>Hotline:</b> <span>{ext.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserRound className="text-green-600" size={15} />
                  <b>Tổ chức:</b> <span>{ext.org}</span>
                </div>
              </div>

              {/* Nút liên hệ/tư vấn */}
              <a
                href={`tel:${ext.phone.replace(/\D/g, "")}`}
                className="mt-auto w-full flex justify-center"
                tabIndex={0}
              >
                <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold uppercase shadow hover:scale-105 hover:from-green-600 hover:to-emerald-500 transition duration-200 text-base tracking-wide outline-none w-full max-w-[210px]">
                  Liên hệ tư vấn
                </button>
              </a>
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
