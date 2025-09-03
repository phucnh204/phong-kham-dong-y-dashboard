import { fetcher } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export interface Booking {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  message: string;
  createdAt: string;
}

export const useBookings = () =>
  useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: () => fetcher("/bookings"),
    staleTime: 1000 * 60 * 5, // 5 phút
  });
