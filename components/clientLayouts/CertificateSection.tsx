"use-client";
import Image from "next/image";
import {
  MotionSection,
  MotionItem,
  MotionStaggerContainer,
} from "../MotionWrappers";

// Dữ liệu chứng nhận & dược liệu
const certificates = [
  {
    img: "/assets/images/giay-phep-hoat-dong.png",
    title: "Giấy Phép Hoạt Động",
    desc: "Phòng khám được Sở Y Tế Thanh Hóa cấp phép, hoạt động theo đúng quy định pháp luật.",
  },
  {
    img: "/assets/images/chung-chi-hanh-nghe.png",
    title: "Chứng Chỉ Hành Nghề",
    desc: "Đội ngũ bác sĩ, lương y đều có chứng chỉ hành nghề do Bộ Y Tế cấp và hơn 10 năm kinh nghiệm.",
  },
  {
    img: "/assets/images/duoc-lieu-sach.png",
    title: "Dược Liệu Sạch",
    desc: "100% dược liệu chuẩn GACP – WHO, được nhập từ các vùng trồng dược an toàn và kiểm nghiệm đầy đủ.",
  },
  {
    img: "/assets/images/kiem-nghiem-chat-luong.png",
    title: "Kiểm Nghiệm Chất Lượng",
    desc: "Mỗi lô thuốc đều được kiểm nghiệm kỹ tại các phòng thí nghiệm đạt chuẩn quốc gia, đảm bảo an toàn cho người dùng.",
  },
  {
    img: "/assets/images/hop-tac-vien-y-hoc.png",
    title: "Hợp Tác Viện Y Học",
    desc: "Đông Y Phục Sinh hợp tác với nhiều viện y học cổ truyền, đảm bảo cập nhật kỹ thuật điều trị tiên tiến nhất.",
  },
];

export default function CertificateSection() {
  return (
    <MotionSection className="py-20 bg-gradient-to-br from-green-50 to-[#f6fff8]">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-center text-2xl md:text-4xl font-extrabold text-green-800 uppercase tracking-widest  px-10 py-5 max-w-3xl mx-auto">
          <span className="block text-green-900 font-black drop-shadow">
            CHỨNG NHẬN & DƯỢC LIỆU
          </span>
          <span className="block text-base md:text-lg font-medium text-emerald-700 mt-2 tracking-normal not-italic">
            Đạt chuẩn Bộ Y Tế · Kiểm nghiệm{" "}
            <span className="font-bold text-emerald-800">GACP – WHO</span> · Hợp
            tác chuyên sâu
          </span>
        </h2>
        <div className="w-24 border-b-4 border-yellow-300 mt-4 mb-2" />
      </div>

      <div className=" mx-auto px-2 sm:px-4 lg:px-6 py-2">
        <MotionStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {certificates.map((item, idx) => (
            <MotionItem key={item.title} delay={0.1 * idx}>
              <div className="group bg-white  shadow-xl hover:shadow-emerald-200 hover:shadow-2xl hover:border-green-600 transition-all duration-300 text-center p-7 border border-green-100 flex flex-col h-full">
                <div className="overflow-hidden rounded-xl mb-6 bg-green-50 flex items-center justify-center min-h-[180px] border-2 border-green-50 group-hover:border-green-200 transition-all">
                  <Image
                    src={`${item.img}`}
                    alt={item.title}
                    width={480}
                    height={220}
                    className="w-full object-cover h-52  mx-auto group-hover:scale-[1.08] transition-transform duration-500 ease-in-out"
                    draggable={false}
                    loading="lazy"
                    // quality={85}
                  />
                </div>
                <h3 className="text-xl font-bold text-[#1E7C46] mb-2 drop-shadow">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base font-medium">
                  {item.desc}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionStaggerContainer>
      </div>
    </MotionSection>
  );
}
