import { type ClassValue, clsx } from "clsx";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

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

export function isUserAuthenticate() {
  const token = Cookies.get("access_token");
  return token ? true : false;
}
