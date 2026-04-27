function getBoolean(value: string | undefined, defaultValue = false) {
  if (value === undefined) return defaultValue;
  return value === "true";
}

const baseUrlDev = process.env.NEXT_PUBLIC_BASE_URL_DEV ?? "http://localhost:5001";
const baseUrlProd = process.env.NEXT_PUBLIC_BASE_URL_PROD ?? "";
const baseUrlOverride = process.env.NEXT_PUBLIC_API_URL ?? "";

export const API_BASE_URL = (baseUrlOverride || baseUrlProd || baseUrlDev).replace(/\/$/, "");

export const env = {
  useMockApi: getBoolean(process.env.NEXT_PUBLIC_USE_MOCK_API, false),
  apiUrl: API_BASE_URL,
};