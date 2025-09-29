import { useEffect, useState } from "react";

export function useRoleFromToken() {
  const [role, setRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("access_token");
    if (!token) return;
    try {
      const base64Payload = token.split(".")[1];
      const base64 = base64Payload.padEnd(
        base64Payload.length + ((4 - (base64Payload.length % 4)) % 4),
        "="
      );
      const payload = JSON.parse(atob(base64));

      setRole(payload.role || payload.user?.role);
    } catch (err) {
      setRole(undefined);
    }
  }, []);

  return role;
}
