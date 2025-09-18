"use-client";
import {
  Phone,
  Mail,
  Globe,
  Clock4,
  MapPin,
  Facebook,
  MessageSquare,
  Globe2,
} from "lucide-react";
import Image from "next/image";
import zalo_icon from "@/assets/images/zalo.png";

export default function Header() {
  return (
    <div className="w-full bg-gradient-to-r from-green-50 via-white to-green-100 border-b border-green-100 text-green-700 text-xs font-medium select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-3 py-1.5">
        {/* Left: Info */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <Clock4 className="w-4 h-4 text-green-400" /> T2–CN: 7h–20h
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <Mail className="w-4 h-4 text-green-400" /> lienhe@dongycantho.vn
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <Globe className="w-4 h-4 text-green-400" /> www.dongycantho.vn
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-green-400" />
            <span className="hidden sm:inline">85 Nguyễn Trãi, Ninh Kiều</span>
            <a
              href="https://maps.google.com/?q=85+Nguyễn+Trãi,+Ninh+Kiều,+Cần+Thơ"
              className="text-green-700 underline ml-1 hover:text-green-800 transition"
              target="_blank"
              rel="noopener"
              title="Chỉ đường Google Maps"
            >
              [Bản đồ]
            </a>
          </span>
        </div>
        {/* Right: Action */}
        <div className="flex items-center gap-3 mt-1 md:mt-0">
          {/* Zalo */}
          <a
            href="https://zalo.me/0989861548"
            className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-blue-50 hover:shadow text-blue-500 font-semibold transition"
            target="_blank"
            rel="noopener"
            title="Chat Zalo"
          >
            <Image
              src={zalo_icon}
              alt="Zalo"
              width={17}
              height={17}
              className="rounded-full"
            />
            <span className="hidden sm:inline">Zalo</span>
          </a>
          {/* Facebook */}
          <a
            href="https://facebook.com/dongycantho"
            className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-blue-50 hover:shadow text-blue-700 font-semibold transition"
            target="_blank"
            rel="noopener"
            title="Facebook"
          >
            <Facebook className="w-4 h-4" />
            <span className="hidden sm:inline">Facebook</span>
          </a>
          {/* Hotline */}
          <a
            href="tel:0989861548"
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold shadow hover:scale-105 transition"
            title="Gọi ngay"
          >
            <Phone className="w-4 h-4" /> 0989 861 548
          </a>
          {/* Đặt lịch nhanh (nổi bật) */}
          <a
            href="/dat-lich"
            className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-tr from-emerald-500 to-green-400 text-white font-bold shadow hover:scale-105 transition"
            title="Đặt lịch khám"
          >
            <MessageSquare className="w-4 h-4" />
            Đặt lịch
          </a>
          {/* Đổi ngôn ngữ */}
          <button
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-green-200 hover:bg-green-100 transition text-green-700 font-semibold"
            // onClick={() => ...}
            title="Chuyển ngôn ngữ"
          >
            <Globe2 className="w-4 h-4" /> EN / VI
          </button>
        </div>
      </div>
    </div>
  );
}
