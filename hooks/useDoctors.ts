"use client";

import { fetcher } from "@/app/utils/utils";
import { useQuery } from "@tanstack/react-query";

export type Doctor = {
  id: number;
  name: string;
  specialization: string;
  imageUrl: string;
  description: string;
  isActive: boolean;
};

export function useDoctors() {
  return useQuery<Doctor[]>({
    queryKey: ["doctors"],
    queryFn: () => fetcher("/doctors"),
    staleTime: 1000 * 60 * 5, // cache 5 phút
  });
}
