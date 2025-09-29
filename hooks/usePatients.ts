import { fetcher } from "@/app/utils/utils";
import { useEffect, useState } from "react";

export interface Patient {
  id: number;
  fullName: string;
  dob?: string;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
}

interface UsePatientsParams {
  page: number;
  pageSize: number;
  search?: string;
  gender?: string;
  dobYear?: string;
  address?: string;
}

export function usePatients({
  page,
  pageSize,
  search,
  gender,
  dobYear,
  address,
}: UsePatientsParams) {
  const [data, setData] = useState<Patient[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(pageSize));
    if (search) params.append("fullName", search);
    if (gender) params.append("gender", gender);
    if (dobYear) params.append("dobYear", dobYear);
    if (address) params.append("address", address);

    fetcher<{ data: Patient[]; total: number }>(
      `/patients?${params.toString()}`
    )
      .then((res) => {
        setData(res.data || []);
        setTotal(res.total ?? 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Lỗi không xác định");
        setLoading(false);
      });
  }, [page, pageSize, search, gender, dobYear, address]);

  return { data, total, loading, error };
}
