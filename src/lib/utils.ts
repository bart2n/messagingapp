import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSessionToken() {
  const token = Cookies.get("access_token");
  return token ? token : "";
}

export function signOut() {
  Cookies.remove("access_token");
  window.location.href = "/login";
}

export function isUserAuthenticate() {
  const token = Cookies.get("access_token");
  return token ? true : false;
}

