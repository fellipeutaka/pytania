import { endpoint } from "~/config/api";

export const isDev = process.env.NODE_ENV === "development";

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function getApiUrl() {
  return `${getBaseUrl()}${endpoint}`;
}
