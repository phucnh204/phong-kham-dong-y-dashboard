export default function Footer() {
  return (
    <div id="footer">
      {" "}
      <footer className="bg-green-500 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* <!-- Thông tin liên hệ & Mạng xã hội --> */}
          <div className="space-y-5">
            <h3 className="text-3xl font-bold text-yellow-400">
              PHÒNG KHÁM ĐÔNG Y
            </h3>

            <div className="flex items-start gap-3 text-lg">
              <span className="text-yellow-300 text-xl">📍</span>
              <p>Số 282 đường Nguyễn Trãi, thành phố Cần Thơ, Việt Nam</p>
            </div>

            <div className="flex items-start gap-3 text-lg">
              <span className="text-yellow-300 text-xl">📞</span>
              <p>
                Hotline: <span className="font-semibold">084 666 2995</span>
              </p>
            </div>
          </div>

          {/* <!-- Lịch làm việc --> */}
          <div className="space-y-3 text-left md:text-right">
            <h3 className="text-2xl font-semibold text-yellow-300">
              Lịch làm việc
            </h3>

            <div className="flex justify-start md:justify-end items-center gap-3 text-lg">
              <span className="text-yellow-300 text-xl">🗓</span>
              <p>Làm việc tất cả các ngày trong tuần</p>
            </div>

            <div className="flex justify-start md:justify-end items-center gap-3 text-lg">
              <span className="text-yellow-300 text-xl">🌤</span>
              <p>Sáng: 8h - 12h</p>
            </div>

            <div className="flex justify-start md:justify-end items-center gap-3 text-lg">
              <span className="text-yellow-300 text-xl">🌆</span>
              <p>Chiều: 13h30 - 17h30</p>
            </div>

            <p className="text-sm text-gray-300 italic mt-2">
              Nếu cần sau 17h30, vui lòng liên hệ trước để bác sĩ sắp xếp.
            </p>
          </div>
        </div>

        {/* <!-- Bản quyền --> */}
        <div className="mt-12 pt-6 border-t border-yellow-500 text-center text-sm text-gray-300">
          &copy; 2025 Phòng Khám Đông Y. Tất cả quyền được bảo vệ.
        </div>
      </footer>
    </div>
  );
}
