"use client";

import { useEffect, useState } from "react";

export default function useGetReq(url: string, params: any) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setData(undefined);

      return await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + url
        }?${new URLSearchParams(
          params /* .searchParams ? params.searchParams : params */
        )}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":
              process.env.NEXT_PUBLIC_BACKEND_HOSTNAME || "",
          },
          method: "GET",
        }
      )
        .then(async (res1) => {
          setLoading(true);
          const res = await res1.json();
          return setData(res);
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    })();
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [params.searchParams]);

  return { loading, error, data, setData };
}
