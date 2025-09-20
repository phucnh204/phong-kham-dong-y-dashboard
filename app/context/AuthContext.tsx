import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

// Định nghĩa type cho user
type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  // avatar?: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Khởi tạo context với giá trị mặc định
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Lấy lại user từ cookie khi app khởi động (chạy 1 lần duy nhất)
  useEffect(() => {
    const cookieUser = Cookies.get("user");
    if (cookieUser) {
      try {
        setUser(JSON.parse(cookieUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Cập nhật cookie khi user thay đổi (login/logout)
  useEffect(() => {
    if (user) Cookies.set("user", JSON.stringify(user), { expires: 1 });
    else Cookies.remove("user");
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook sử dụng context
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
