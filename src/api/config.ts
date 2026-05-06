export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL!,
  headers: {
    "X-Device-Type": process.env.NEXT_PUBLIC_API_DEVICE_TYPE!,
    "X-Language": process.env.NEXT_PUBLIC_API_LANGUAGE!,
    "X-Client-Token": process.env.NEXT_PUBLIC_API_CLIENT_TOKEN!,
    "X-User-Token": process.env.NEXT_PUBLIC_API_USER_TOKEN!,
  },
};
