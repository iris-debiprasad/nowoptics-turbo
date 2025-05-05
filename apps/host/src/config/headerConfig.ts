import { AxiosRequestConfig } from "axios";

export function HeaderConfig() {
  let token;

  if (typeof window !== "undefined" && localStorage && localStorage.getItem) {
    const session = localStorage.getItem("session")
      ? JSON.parse(localStorage.getItem("session") as string)
      : "";
    token = session?.user?.accessToken;
  }
  const config: AxiosRequestConfig | any = {
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
  return config;
}
