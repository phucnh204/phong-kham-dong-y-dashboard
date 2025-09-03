"use client";

import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export interface Service {
  id: number;
  serviceName: string;
  description: string;
  imageUrl: string;
  price: number;
  isActive: boolean;
}

export function useServices() {
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: () => fetcher("/services"),
    staleTime: 1000 * 60 * 5,
  });
}
