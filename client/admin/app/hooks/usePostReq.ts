import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

export default function usePostReq(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function execute(payload: any) {
    setLoading(true);
    setError("");

    const headers = new Headers();

    headers.append(
      "Access-Control-Allow-Origin",
      process.env.NEXT_PUBLIC_BACKEND_HOSTNAME || ""
    );

    if (!payload.toString().includes("FormData")) {
      headers.append("Content-Type", "application/json");
    }

    return await fetch(
      process.env.NEXT_PUBLIC_BACKEND_HOSTNAME +
        url +
        "?" +
        new URLSearchParams(`isAdmin=${true}`),
      {
        method: "POST",
        body: payload.toString().includes("FormData")
          ? payload
          : JSON.stringify(payload),
        credentials: "include",
        headers,
      }
    )
      .then(async (res1) => {
        setLoading(true);
        const res = await res1.json();
        return res;
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }

  return { execute, loading, error, setError };
}
