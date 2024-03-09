import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

export default function usePostReq(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function execute(payload: any) {
    setLoading(true);
    setError("");

    const headers = payload.toString().includes("FormData")
      ? {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin":
            process.env.NEXT_PUBLIC_BACKEND_HOSTNAME,
        }
      : {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":
            process.env.NEXT_PUBLIC_BACKEND_HOSTNAME,
        };

    return await axios
      .post(
        process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + url,
        payload.toString().includes("FormData")
          ? payload
          : JSON.stringify(payload),
        { withCredentials: true, headers }
      )
      .then((res) => {
        setLoading(true);
        return res.data;
      })
      .catch((err) => {
        const errString: string = err.response.data;

        return setError(() =>
          errString.slice(errString.indexOf(":"), errString.indexOf("<br>"))
        );
      })
      .finally(() => setLoading(false));
  }

  return { execute, loading, error, setError };
}
