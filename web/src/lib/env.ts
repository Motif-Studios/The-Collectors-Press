function getBoolean(value: string | undefined, defaultValue = false) {
  if (value === undefined) return defaultValue;
  return value === "true";
}

const baseUrlOverride = process.env.NEXT_PUBLIC_API_URL ?? "";

// Browser-side API base (relative)
export const API_BASE_URL = (baseUrlOverride || "/api").replace(/\/$/, "");

// Server-side API base (absolute URL needed for server-side fetches)
const serverBaseUrlDev = process.env.NEXT_PUBLIC_BASE_URL_DEV ?? "https://the-collectors-press-sglw.onrender.com";
console.log("Using URL:",  serverBaseUrlDev);
const serverBaseUrlProd = process.env.NEXT_PUBLIC_BASE_URL_PROD ?? "";
export const API_BASE_URL_SERVER = (baseUrlOverride || serverBaseUrlProd || serverBaseUrlDev).replace(/\/$/, "");

export const env = {
  useMockApi: getBoolean(process.env.NEXT_PUBLIC_USE_MOCK_API, false),
  apiUrl: API_BASE_URL,
};