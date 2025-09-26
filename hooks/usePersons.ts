export type Person = {
  id: number;
  name: string;
  specialization?: string | null;
  imageUrl: string;
  description?: string | null;
  isActive: boolean;
  role: string; // 'doctor', 'nurse', 'pharmacist', staff.
};

import { fetcher } from "@/app/utils/utils";
import { useQuery } from "@tanstack/react-query";

export function usePersons(params?: { role?: string; isActive?: string }) {
  let qs = "";
  if (params && (params.role || params.isActive)) {
    const q = [];
    if (params.role) q.push(`role=${params.role}`);
    if (params.isActive) q.push(`isActive=${params.isActive}`);
    qs = "?" + q.join("&");
  }
  return useQuery<Person[]>({
    queryKey: ["persons", params],
    queryFn: () => fetcher(`/persons${qs}`),
    staleTime: 1000 * 60 * 5, // cache 5 phút
  });
}
