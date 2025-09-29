"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Home,
  Info,
  Stethoscope,
  Users,
  Phone,
  Mail,
  Globe,
  Clock4,
  MoreHorizontal,
  ChevronDown,
  Newspaper,
  EllipsisVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";

const MENU_ITEMS = [
  {
    href: "#header",
    icon: Home,
    label: { vi: "Trang chủ", en: "Home" },
  },
  {
    href: "#about",
    icon: Info,
    label: { vi: "Giới thiệu", en: "About" },
  },
  {
    href: "/san-pham",
    icon: Newspaper,
    label: { vi: "Sản phẩm", en: "Product" },
    isRoute: true,
  },
  {
    href: "#service",
    icon: Stethoscope,
    label: { vi: "Dịch vụ", en: "Services" },
  },
  {
    href: "#card-doctor",
    icon: Users,
    label: { vi: "Đội ngũ", en: "Doctors" },
  },

  {
    href: "/dat-lich",
    icon: Phone,
    label: { vi: "Liên hệ", en: "Contact" },
    isRoute: true,
  },
];

const SUBMENU = [
  // { href: "#new", label: { vi: "Tin tức", en: "News" } },
  { href: "#blog", label: { vi: "Bài viết", en: "Articles" } },
  {
    href: "/dat-lich",
    label: { vi: "Đặt lịch", en: "Booking" },
    isRoute: true,
  },
  // { href: "#", label: { vi: "Tư vấn", en: "Consultation" } },
];

const LANGUAGES = [
  { code: "vi", name: "Tiếng Việt" },
  { code: "en", name: "English" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("header");
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [showLang, setShowLang] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();
  // Scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const ids = [
        "header",
        "banner",
        "about",
        "service",
        "card-doctor",
        "blog",
        "footer",
      ];
      let current = "header";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120;
          const h = el.offsetHeight;
          if (window.scrollY >= top && window.scrollY < top + h) current = id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fixed nav
  useEffect(() => {
    const handleFixed = () => {
      if (!navRef.current) return;
      if (window.scrollY > 0) {
        navRef.current.classList.add(
          "fixed",
          "top-0",
          "left-0",
          "right-0",
          "w-full",
          "shadow-2xl",
          "backdrop-blur-xl",
          "border-b",
          "border-green-100"
        );
        navRef.current.classList.remove("relative");
      } else {
        navRef.current.classList.remove(
          "fixed",
          "top-0",
          "left-0",
          "right-0",
          "w-full",
          "shadow-2xl",
          "backdrop-blur-xl",
          "border-b",
          "border-green-100"
        );
        navRef.current.classList.add("relative");
      }
    };
    window.addEventListener("scroll", handleFixed);
    return () => window.removeEventListener("scroll", handleFixed);
  }, []);

  // Close menu when resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock scroll when menu open
  // useEffect(() => {
  //   document.body.style.overflow = menuOpen ? "hidden" : "";
  // }, [menuOpen]);
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick =
    (href: string, isRoute = false) =>
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (isRoute || href.startsWith("/")) {
        setMenuOpen(false);
        setTimeout(() => router.push(href), 200); // delay cho menu đóng mượt
      } else {
        setActive(href.replace("#", ""));
        const el = document.getElementById(href.replace("#", ""));
        const navbar = navRef.current;
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const top = el ? el.offsetTop - navbarHeight - 20 : 0;
        if (window.innerWidth < 1024) {
          setMenuOpen(false);
          setTimeout(
            () =>
              window.scrollTo({ top: Math.max(0, top), behavior: "instant" }),
            400
          );
        } else {
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }
      }
    };

  return (
    <>
      {/* HEADER + NAVBAR */}
      <header className="shadow-md py-3 bg-white/95">
        <div className="w-[calc(100vw-64px)] mx-auto flex flex-col md:flex-row items-center justify-between px-3">
          {/* LOGO + TÊN */}
          <div className="flex items-center gap-3 flex-1 justify-start mb-2 md:mb-0 select-none">
            <Image
              alt="Logo Phòng khám"
              src="/logo.png"
              className="h-14 w-14 rounded-full shadow-xl border-2 border-gray-200 bg-white"
              width={56}
              height={56}
              priority
            />
            <div>
              <h1 className="text-green-700 text-2xl font-extrabold tracking-wider leading-tight drop-shadow">
                TÊN PHÒNG KHÁM
              </h1>
              <p className="text-xs text-green-600 font-medium uppercase tracking-wider">
                Mo tả
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center text-center mb-4 md:mb-0">
            <p className="text-xs sm:text-sm text-green-600 font-medium uppercase">
              Sở Y Tế Thành Phố Cần Thơ
            </p>
            <h1 className="text-green-700 text-2xl sm:text-3xl font-bold">
              PHÒNG KHÁM ĐÔNG Y
            </h1>
            <p className="text-xs sm:text-sm text-green-600">
              ORIENTAL MEDICINE CLINIC
            </p>
          </div>
          {/* SLOGAN + HOTLINE */}
          <div className="flex-1 flex flex-col items-center md:items-end">
            <p className="text-sm md:text-base font-medium text-green-900 italic">
              "Chẩn đoán cá nhân hóa, phục hồi tối ưu, tận tâm trọn vẹn."
            </p>
            <a
              href="tel:0989861548"
              className="mt-2 inline-flex bg-green-500 hover:bg-green-600 text-white font-bold rounded-full items-center gap-2 px-6 py-2 shadow-md hover:shadow-lg transition"
            >
              <Phone className="w-5 h-5" />
              Hotline: 0989 861 548
            </a>
          </div>
        </div>
      </header>

      {/* NAVBAR luxury */}
      <nav
        ref={navRef}
        className="relative w-full z-[100] bg-white shadow font-inter"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex items-center justify-between px-4 lg:px-10 py-3 min-h-[70px] max-w-7xl">
          {/* LOGO MINI trên Navbar (mobile/scroll có thể ẩn hiện tùy ý) */}
          <div className="flex items-center gap-3 select-none lg:hidden">
            <Image
              alt="Logo Mini"
              src="/logo.png"
              className="h-10 w-10 rounded-full shadow bg-white border"
              width={40}
              height={40}
              priority
            />
            <span className="font-bold text-green-700 text-lg">
              PHÒNG KHÁM ĐÔNG Y
            </span>
          </div>
          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-3">
            {MENU_ITEMS.map(({ href, icon: Icon, label, comingSoon }) => (
              <li key={href} className="relative">
                <motion.a
                  href={comingSoon ? "#" : href}
                  className={`
        flex flex-col items-center px-5 py-2.5 rounded-full font-semibold text-green-700 transition
        hover:bg-gradient-to-tr hover:from-green-50 hover:to-green-200 hover:text-green-900 hover:scale-[1.06] hover:shadow
        ${
          active === href.replace("#", "")
            ? "bg-gradient-to-br from-green-500  to-green-200 text-white shadow-2xl font-bold scale-[1.09] border-2 border-green-300"
            : ""
        }
        ${comingSoon ? "opacity-60 cursor-not-allowed" : ""}
      `}
                  style={{ fontSize: "1.08rem", letterSpacing: 0.12 }}
                  onClick={
                    comingSoon
                      ? (e) => e.preventDefault()
                      : handleNavClick(href)
                  }
                  whileHover={{ scale: 1.07 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  aria-disabled={comingSoon}
                  tabIndex={comingSoon ? -1 : 0}
                >
                  <div className="flex items-center gap-2 relative">
                    <Icon className="w-5 h-5" />
                    <span>{label[lang]}</span>
                    {comingSoon && (
                      <span className="absolute ml-1 px-1 left-20 bottom-5 py-0.5 text-xs rounded-full bg-yellow-300 text-yellow-900 font-bold  shadow-sm select-none animate-pulse">
                        {lang === "vi" ? "Sắp " : "Soon"}
                      </span>
                    )}
                  </div>
                </motion.a>
              </li>
            ))}

            {/* Submenu */}
            <li className="relative group">
              <a
                href="#"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-green-900 hover:bg-green-100 hover:scale-[1.04] hover:shadow transition"
                onClick={(e) => e.preventDefault()}
              >
                <EllipsisVertical className="w-5 h-5" />
                {lang === "vi" ? "Mục khác" : "More"}
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </a>
              <ul
                className="
                  absolute left-0 mt-3 py-3 w-64 bg-white/95 rounded-2xl shadow-2xl z-50 border border-green-100
                  opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                  transition-all duration-250 pointer-events-none group-hover:pointer-events-auto
                "
              >
                {SUBMENU.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="flex items-center gap-2 px-4 py-3 text-base text-gray-700 hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 hover:text-green-800 transition-all rounded-xl"
                      tabIndex={0}
                    >
                      <span>{label[lang]}</span>
                      <span className="text-xs text-green-500 ml-2">
                        {lang === "vi" ? label.en : label.vi}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden flex items-center justify-center rounded-full bg-gradient-to-tr from-green-50 to-green-100 border border-green-200 h-12 w-12 shadow hover:bg-green-100 active:scale-95 transition"
            onClick={() => setMenuOpen(true)}
            aria-label="Mở menu"
          >
            <svg
              width={26}
              height={26}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M4 8h18M4 16h18" />
            </svg>
          </button>
        </div>

        {/* MOBILE FULL MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu-overlay"
              className="fixed inset-0 bg-black/40 z-[2000] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            >
              <motion.div
                key="mobile-menu"
                className="
    fixed top-0 right-0 w-[84vw] max-w-[370px] h-full bg-white/98 shadow-2xl flex flex-col
    rounded-l-3xl border-l border-green-100 z-[2010]
  "
                initial={{ x: 400 }}
                animate={{ x: 0 }}
                exit={{ x: 400 }}
                transition={{ type: "spring", stiffness: 240, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* HEADER (Logo + Close) */}
                <div className="flex items-center justify-between px-7 py-5 border-b border-green-50 shrink-0">
                  {/* Logo */}
                  <div className="flex items-center gap-3 select-none">
                    <Image
                      alt="Logo"
                      src="/logo.png"
                      className="h-10 w-10 rounded-full bg-white border border-gray-200 shadow"
                      width={40}
                      height={40}
                      priority
                    />
                    <span className="font-bold text-green-700 text-lg whitespace-nowrap">
                      PHÒNG KHÁM ĐÔNG Y
                    </span>
                  </div>
                  {/* Close */}
                  <button
                    className="flex items-center justify-center rounded-full bg-green-50 h-11 w-11 shadow hover:bg-green-100 active:scale-95 transition"
                    onClick={closeMenu}
                    aria-label="Đóng menu"
                  >
                    <svg
                      width={22}
                      height={22}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {/* NAVIGATION */}
                <div className="flex-1 flex flex-col gap-1 px-6 py-7 ">
                  {MENU_ITEMS.map(({ href, icon: Icon, label }) => (
                    <a
                      key={href}
                      href={href}
                      className={`
                flex items-center gap-3 px-3 py-4 rounded-2xl text-green-900 font-semibold text-lg
                hover:bg-green-100 transition
                ${
                  active === href.replace("#", "")
                    ? "bg-gradient-to-r from-green-400 via-teal-300 to-green-200 text-white font-bold shadow"
                    : ""
                }
              `}
                      onClick={handleNavClick(href)}
                    >
                      <Icon className="w-6 h-6" />
                      <span>{label[lang]}</span>
                    </a>
                  ))}
                  {/* Lang select + hotline nếu muốn */}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
