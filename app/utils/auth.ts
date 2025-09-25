// lib/auth.ts
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8080";

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorRes = await res.json().catch(() => ({}));
    // throw new Error(errorRes.message || "Sai tài khoản hoặc mật khẩu");
  }

  const data = await res.json();

  Cookies.set("access_token", data.access_token, { expires: 1 });
  Cookies.set("refresh_token", data.refresh_token, { expires: 7 });
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  // console.log("Login response data:", data);
  return data;
}

export async function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  const res = await fetch("http://localhost:8080/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Lỗi khi đăng xuất");
  }
}
