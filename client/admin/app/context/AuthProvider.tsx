"use client";

import {
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
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    (async () => {
      await fetch(
        process.env.NEXT_PUBLIC_BACKEND_HOSTNAME +
          `/check-auth?${new URLSearchParams(`isAdmin=${true}`)}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then(async (res) => {
          const data = await res.json();
          console.log(data.user);

          return setCurrentUser(data.user);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    })();
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingSkeleton /> : children}
    </AuthContext.Provider>
  );
}
