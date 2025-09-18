import { Calendar, Phone, Shield } from "lucide-react";
import { MotionFadeIn, MotionSection } from "../MotionWrappers";

export default function Footer() {
  return (
    <div
      id="footer"
      className="bg-gradient-to-br from-emerald-700 via-green-600 to-emerald-500 text-white"
    >
      {/* CTA Section - blend màu, đồng bộ với phần dưới */}
      <MotionSection className="py-16">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-8">
          <MotionFadeIn>
            <h2 className="text-3xl lg:text-5xl font-black mb-5 drop-shadow">
              Sẵn sàng bắt đầu hành trình chăm sóc sức khỏe?
            </h2>
            <p className="text-lg lg:text-xl mb-8 text-emerald-50 font-medium">
              Hãy để chúng tôi đồng hành cùng bạn trên con đường phục hồi và duy
              trì sức khỏe tự nhiên, bền vững.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-2">
              <a
                href="tel:0989861548"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-700 font-bold text-lg rounded-full hover:bg-emerald-50 hover:text-emerald-800 transition-all duration-300 shadow-xl border-2 border-emerald-100"
              >
                <Phone className="w-6 h-6" />
                Gọi ngay: 0989.861.548
              </a>
              <a
                href="/dat-lich"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 font-bold text-lg rounded-full border-2 border-white hover:bg-white hover:text-emerald-700 transition-all duration-300 shadow-xl"
              >
                <Calendar className="w-6 h-6" />
                Đặt lịch online
              </a>
            </div>
            <div className="mt-6 text-base text-emerald-100 flex justify-center items-center gap-2">
              <Shield className="w-5 h-5 text-yellow-300" />
              Cam kết hoàn tiền 100% nếu không hài lòng
            </div>
          </MotionFadeIn>
        </div>
      </MotionSection>

      {/* Info + Time */}
      <footer className="w-full pt-10 pb-0">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4 sm:px-8">
          {/* Thông tin liên hệ */}
          <div className="space-y-5 text-lg">
            <h3 className="text-2xl lg:text-3xl font-bold text-yellow-300 mb-3 drop-shadow">
              PHÒNG KHÁM ĐÔNG Y
            </h3>
            <div className="flex items-start gap-3">
              <span className="text-yellow-200 text-xl">📍</span>
              <p>Số 282 đường Nguyễn Trãi, thành phố Cần Thơ, Việt Nam</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-200 text-xl">📞</span>
              <p>
                Hotline: <span className="font-bold">084 666 2995</span>
              </p>
            </div>
          </div>

          {/* Lịch làm việc */}
          <div className="space-y-3 text-lg md:text-right">
            <h3 className="text-xl lg:text-2xl font-semibold text-yellow-200 mb-3">
              Lịch làm việc
            </h3>
            <div className="flex justify-start md:justify-end items-center gap-3">
              <span className="text-yellow-200 text-xl">🗓</span>
              <p>Làm việc tất cả các ngày trong tuần</p>
            </div>
            <div className="flex justify-start md:justify-end items-center gap-3">
              <span className="text-yellow-200 text-xl">🌤</span>
              <p>Sáng: 8h - 12h</p>
            </div>
            <div className="flex justify-start md:justify-end items-center gap-3">
              <span className="text-yellow-200 text-xl">🌆</span>
              <p>Chiều: 13h30 - 17h30</p>
            </div>
            <p className="text-base text-emerald-50 italic mt-2 opacity-80">
              Nếu cần sau 17h30, vui lòng liên hệ trước để bác sĩ sắp xếp.
            </p>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="mt-12 pt-8 border-t border-emerald-200/60 text-center text-base text-emerald-100">
          &copy; 2025 Phòng Khám Đông Y. Tất cả quyền được bảo vệ.
        </div>
      </footer>
    </div>
  );
}
