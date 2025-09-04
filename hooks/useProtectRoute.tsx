"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useProtectRoute() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
}
