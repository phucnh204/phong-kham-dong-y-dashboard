import { fetcher } from "./utils";

export async function updateBookingStatus(id: number, status: string) {
  return await fetcher(`/bookings/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
