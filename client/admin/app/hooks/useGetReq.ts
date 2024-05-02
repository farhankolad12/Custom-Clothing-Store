"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetReq(url: string, params: any) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setData(undefined);
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_BACKEND_HOSTNAME,
      };

      return await axios
        .get(
          `${
            process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + url
          }?${new URLSearchParams(
            params /* .searchParams ? params.searchParams : params */
          )}`,
          { withCredentials: true, headers }
        )
        .then((res) => {
          setLoading(true);
          return setData(res.data);
        })
        .catch((err) => {
          const errString: string = err.response.data;

          return setError(() =>
            errString.slice(errString.indexOf(":"), errString.indexOf("<br>"))
          );
        })
        .finally(() => setLoading(false));
    })();
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [params.searchParams]);

  return { loading, error, data, setData };
}
