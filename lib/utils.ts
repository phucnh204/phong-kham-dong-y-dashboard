import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_BASE_URL = "http://localhost:8080";

export async function fetcher<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error(`Lỗi API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
