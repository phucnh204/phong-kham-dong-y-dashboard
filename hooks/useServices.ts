import { fetcher } from "@/app/utils/utils";
import { useQuery } from "@tanstack/react-query";
import qs from "query-string";

export interface Service {
  id: number;
  serviceName: string;
  description: string;
  imageUrl: string;
  price: number;
  isActive: boolean;
  //
}

//
type ServiceFilter = {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean | string;
  search?: string;
  page?: number;
  pageSize?: number;
};

export function useServices(filters: ServiceFilter = {}) {
  const queryString = qs.stringify(filters, {
    skipEmptyString: true,
    skipNull: true,
  });
  return useQuery<{ data: Service[]; total: number }>({
    queryKey: ["services", filters],
    queryFn: () => fetcher(`/services${queryString ? "?" + queryString : ""}`),
    staleTime: 1000 * 60 * 5,
  });
}
