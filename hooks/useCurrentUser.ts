import { AuthContext } from "@/app/context/AuthContext";
import { useContext } from "react";

export function useCurrentUser() {
  return useContext(AuthContext);
}
