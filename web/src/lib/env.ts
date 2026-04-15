function getBoolean(value: string | undefined, defaultValue = false) {
  if (value === undefined) return defaultValue;
  return value === "true";
}

export const env = {
  useMockApi: getBoolean(process.env.NEXT_PUBLIC_USE_MOCK_API, false),
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
};