// Sử dụng biến môi trường nếu có, không thì fallback localhost
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Xử lý mọi dạng url trả về từ BE (hoặc CDN) về ảnh chuẩn dùng cho NextJS <Image />
 * @param url Đường dẫn ảnh trả về từ BE hoặc CDN
 * @returns url đầy đủ cho FE
 */
export function getImageSrc(url?: string): string {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return "/placeholder-service.png";
  }
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/assets/images")) return `${API_URL}${url}`;
  if (url.startsWith("assets/images")) return `${API_URL}/${url}`;
  return `${API_URL}/assets/images/${url.replace(/^\/+/, "")}`;
}
