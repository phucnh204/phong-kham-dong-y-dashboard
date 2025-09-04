"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function GlobalPageLoading() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Bắt đầu loading khi pathname thay đổi
    setLoading(true);

    // Tắt loading sau 500ms (hoặc sau khi nội dung load xong)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] backdrop-blur-sm bg-white/50 flex flex-col items-center justify-center space-y-4 transition-all duration-300">
      <svg
        className="animate-spin h-10 w-10 text-green-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <p className="text-green-700 text-lg font-semibold tracking-wide animate-pulse">
        Đang tải trang, vui lòng chờ...
      </p>
    </div>
  );
}
