"use client";

import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

export default function usePostReq(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function execute(payload: any) {
    setLoading(true);

    const headers = new Headers();

    headers.append(
      "Access-Control-Allow-Origin",
      process.env.NEXT_PUBLIC_BACKEND_HOSTNAME || ""
    );
    headers.append(
      "Content-Type",
      payload.toString().includes("FormData")
        ? "application/x-www-form-urlencoded"
        : "application/json"
    );

    return await fetch(process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + url, {
      method: "POST",
      body: payload.toString().includes("FormData")
        ? payload
        : JSON.stringify(payload),
      credentials: "include",
      headers,
    })
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
