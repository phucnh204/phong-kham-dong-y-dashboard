"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "@/app/utils/auth";
import { useContext, useState } from "react";
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
import { AuthContext, useAuth } from "@/app/context/AuthContext";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, setUser } = useAuth();
  const loginMutation = useMutation({
    mutationFn: () => login(username, password),
    onSuccess: (data) => {
      setUser(data.user); // context
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
    <div className=" flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <Card className="w-full max-w-md shadow-md border border-gray-200">
        <CardHeader className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-green-700">
            PHÒNG KHÁM ĐÔNG Y
          </h1>
          <CardDescription className="text-gray-500">
            Vui lòng đăng nhập để tiếp tục
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Tài khoản
              </Label>
              <Input
                id="username"
                placeholder="Nhập tài khoản..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="focus-visible:ring-green-600"
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus-visible:ring-green-600"
                autoComplete="current-password"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>

            <div className="text-center text-sm text-gray-500 pt-2">
              Bạn chưa có tài khoản?{" "}
              <a href="#" className="text-green-700 hover:underline">
                Đăng ký
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
