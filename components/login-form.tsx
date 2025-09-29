"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "@/app/utils/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/app/context/AuthContext";
import { User, Lock } from "lucide-react";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const loginMutation = useMutation({
    mutationFn: () => login(username, password),
    onSuccess: (data) => {
      setUser(data.user);
      Cookies.set("user", JSON.stringify(data.user), { expires: 1 });

      // Chuyển hướng theo vai trò
      const role = data.user?.role;
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "doctor") {
        router.push("/doctor/dashboard");
      } else if (role === "nurse") {
        router.push("/nurse/dashboard");
      } else if (role === "pharmacist") {
        router.push("/pharma/dashboard");
      } else if (role === "staff") {
        router.push("/staff/dashboard");
      } else {
        router.push("/not-found");
      }
    },
    onError: (error: any) => {
      setError(error.message || "Đăng nhập thất bại");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate();
  };

  return (
    <div className="flex items-center justify-center  bg-gradient-to-br from-green-50 to-white px-4">
      <Card className="w-full max-w-xl shadow-lg border border-green-100">
        <CardHeader className="text-center space-y-2 pb-1">
          <CardTitle className="text-2xl font-extrabold text-green-700 tracking-tight">
            PHÒNG KHÁM ĐÔNG Y CẦN THƠ
          </CardTitle>
          <div className="text-lg font-medium text-emerald-600">
            <span className="block">
              Trải nghiệm sự khác biệt trong chăm sóc sức khỏe!
            </span>
          </div>
          <CardDescription className="text-gray-500 text-sm">
            Nơi hội tụ đội ngũ chuyên gia hàng đầu và công nghệ y học cổ truyền
            hiện đại.
            <br />
            <span className="text-emerald-700 font-semibold">
              Đăng nhập để khám phá dịch vụ tận tâm, chuyên nghiệp!
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label
                htmlFor="username"
                className="text-sm font-semibold text-gray-700 flex gap-1 items-center"
              >
                <User className="w-4 h-4 text-green-700" /> Tài khoản
              </Label>
              <Input
                id="username"
                placeholder="Nhập tài khoản..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="focus-visible:ring-green-600"
                autoComplete="username"
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700 flex gap-1 items-center"
              >
                <Lock className="w-4 h-4 text-green-700" /> Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus-visible:ring-green-600"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-green-600 hover:bg-green-700 font-semibold text-base"
            >
              {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập ngay"}
            </Button>

            <div className="text-center text-sm text-gray-500 pt-2">
              <span>Bạn chưa có tài khoản? </span>
              {/* <a
                href="#"
                className="text-green-700 font-semibold hover:underline"
              >
                Đăng ký miễn phí
              </a> */}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
