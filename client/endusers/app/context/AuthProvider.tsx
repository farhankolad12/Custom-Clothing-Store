"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthValue } from "../definations";
import LoadingSkeleton from "../loading";

const AuthContext = createContext<AuthValue>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/check-auth", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
        .then(async (res) => {
          const data = await res.json();
          return setCurrentUser(data.user);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    })();
  }, []);

  const value: AuthValue = {
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingSkeleton /> : children}
    </AuthContext.Provider>
  );
}
