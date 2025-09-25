import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_BASE_URL = "http://localhost:8080";

export async function fetcher<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // const token = Cookies.get("access_token");
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Lỗi API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
