"use client";

import { useEffect, useState } from "react";

export function useGetReq(url: string, params: any) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetch(
        process.env.NEXT_PUBLIC_BACKEND_HOSTNAME +
          url +
          "?" +
          new URLSearchParams(params),
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":
              process.env.NEXT_PUBLIC_BACKEND_HOSTNAME || "",
            // "Access-Control-Allow-Headers": "Content-Type, Authorization",
            // "Access-Control-Allow-Methods": "*",
          },

          method: "GET",
        }
      )
        .then(async (res) => {
          const resData = await res.json();
          return setData(resData);
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.selectedVariants, params.productId, params.searchParams]);

  return { error, data, loading, setData };
}
