import { useContext } from "react";
import { AuthContext } from "../contex/AuthContext";

export function useAuth() {
  const value = useContext(AuthContext)
  return value
}