import { MapPin, HelpCircle, ReceiptText, Info } from "lucide-react";

const PRICE_LIST = [
  {
    name: "Khám & tư vấn",
    price: "120.000đ",
    note: "Miễn phí cho người ≥ 65 tuổi vào Thứ 4.",
  },
  {
    name: "Châm cứu",
    price: "150.000–250.000đ",
    note: "Tùy phác đồ & số huyệt.",
  },
  { name: "Xoa bóp – bấm huyệt", price: "180.000đ/buổi", note: "" },
  { name: "Điều trị da liễu Đông y", price: "Từ 200.000đ", note: "" },
];

const FAQS = [
  {
    question: "Sau bao lâu thì thấy hiệu quả?",
    answer: "Thường 7–14 ngày với phác đồ phù hợp và tuân thủ kiêng kị.",
  },
  {
    question: "Có cần kiêng gì khi dùng thuốc Đông y?",
    answer:
      "Hạn chế rượu, đồ cay nóng, hải sản tanh; tuân thủ dặn dò của bác sĩ.",
  },
  {
    question: "Phụ nữ mang thai có dùng được không?",
    answer: "Có thể, nhưng toa phải được chỉnh chuyên biệt theo tam cá nguyệt.",
  },
  {
    question: "Người cao huyết áp có châm cứu được không?",
    answer:
      "Được, nhưng sẽ sàng lọc và theo dõi huyết áp trước – trong điều trị.",
  },
  {
    question: "Có khám online không?",
    answer: "Có. Bác sĩ tư vấn qua video/Zalo và gửi thuốc sắc sẵn.",
  },
  {
    question: "Thuốc Đông y có tác dụng phụ không?",
    answer:
      "Nếu dùng đúng toa và nguồn dược liệu sạch, hầu như an toàn. Tuy nhiên, cần tuân thủ chỉ định, không tự ý kết hợp thêm thuốc Tây hoặc thực phẩm chức năng.",
  },
];

function ServicePrices({ data }) {
  return (
    <div className="bg-gradient-to-br from-white via-emerald-50 to-green-50 rounded-3xl shadow-lg p-7 border border-green-100 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <ReceiptText className="text-emerald-500" size={24} />
        <h3 className="text-lg md:text-2xl font-bold text-emerald-800">
          Bảng giá tham khảo
        </h3>
      </div>
      <div className="mt-3 grid gap-3">
        {data.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl px-4 py-3 bg-white/70 hover:bg-emerald-50 transition shadow border border-green-50"
          >
            <h4 className="font-semibold">{item.name}</h4>
            <p className="text-lg md:text-2xl font-bold text-green-700 mt-1">
              {item.price}
            </p>
            {item.note && (
              <p className="text-xs text-gray-500 mt-1">{item.note}</p>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-5">
        Giá có thể thay đổi; BHYT áp dụng theo quy định hiện hành (hỏi quầy).
      </p>
    </div>
  );
}

function FAQSection({ data }) {
  return (
    <div className="bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-3xl shadow-lg p-7 border border-green-100 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="text-green-500" size={24} />
        <h3 className="text-lg md:text-2xl font-bold text-green-900">
          Hỏi đáp nhanh
        </h3>
      </div>
      <div className="mt-2">
        {data.map((faq, idx) => (
          <details
            key={idx}
            className="rounded-xl bg-white/70 my-2 px-3 py-2 border border-green-50 shadow-sm group transition"
            open={idx === 0}
          >
            <summary className="cursor-pointer font-semibold outline-none focus:ring-2 focus:ring-emerald-300 group-open:text-emerald-600 transition">
              {faq.question}
            </summary>
            <div className="pt-1 text-gray-700 text-sm leading-normal">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function MapSection() {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-emerald-50 rounded-3xl shadow-lg p-7 border border-green-100 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="text-blue-600" size={24} />
        <h3 className="text-lg md:text-2xl font-bold text-blue-900">Bản đồ</h3>
      </div>
      <div className="w-full h-[240px] md:h-[290px] lg:h-[350px] my-3 rounded-xl overflow-hidden border-2 border-green-300 shadow">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2607403734376!2d105.77094997575796!3d10.791365089363327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0882c9539b6e7%3A0x15ea153a21edb403!2zMjgyIE5ndXnhu4VuIFRyw6NpLCBQaMaw4budbmcgMywgQ2FuIFRo4buLLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1691926782841!5m2!1svi!2s"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="text-xs text-gray-600 pt-1">
        <b>Địa chỉ:</b> 282 Nguyễn Tri Phương, Q. Ninh Kiều, TP. Cần Thơ
      </div>
    </div>
  );
}

export default function InfoSection() {
  return (
    <section className="bg-gradient-to-br from-white to-green-50 py-16">
      {/* SECTION TITLE luxury */}
      <div className="mb-14 flex flex-col items-center">
        <div className="flex items-center gap-2 justify-center mb-2">
          <Info className="text-emerald-500" size={28} />
          <h2 className="text-2xl md:text-4xl font-extrabold text-emerald-700 tracking-tight text-center drop-shadow">
            Tiện ích & Thông Tin Nhanh
          </h2>
        </div>
        <div className="w-24 border-b-4 border-yellow-300 my-3" />
        <div className="text-gray-700 text-center max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
          <span className="inline-flex items-center gap-2 text-emerald-700 font-semibold">
            <ReceiptText size={20} /> Giá dịch vụ
          </span>
          <span className="mx-2 text-gray-400 font-bold text-xl">·</span>
          <span className="inline-flex items-center gap-2 text-green-700 font-semibold">
            <HelpCircle size={20} /> Giải đáp nhanh
          </span>
          <span className="mx-2 text-gray-400 font-bold text-xl">·</span>
          <span className="inline-flex items-center gap-2 text-blue-700 font-semibold">
            <MapPin size={20} /> Địa chỉ & chỉ đường
          </span>
        </div>
      </div>
      <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
        <ServicePrices data={PRICE_LIST} />
        <FAQSection data={FAQS} />
        <MapSection />
      </div>
    </section>
  );
}
