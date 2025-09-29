"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-emerald-50 to-white">
      <div className="flex flex-col items-center gap-4">
        <AlertTriangle className="w-16 h-16 text-emerald-600 mb-1" />
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-800">404</h1>
        <div className="text-xl md:text-2xl font-semibold text-gray-700 mb-1">
          Không tìm thấy trang / Page not found
        </div>

        <Button
          className="mt-4 bg-emerald-600 hover:bg-emerald-700"
          onClick={() => router.push("/")}
        >
          Về trang chủ / Go Home
        </Button>
      </div>
    </div>
  );
}
