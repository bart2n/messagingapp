import { type ClassValue, clsx } from "clsx";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSessionToken() {
  return localStorage.getItem("sessionToken");
}

export function signOut() {
  const navigate = useNavigate();
  localStorage.removeItem("sessionToken");
  navigate("/login");
}
