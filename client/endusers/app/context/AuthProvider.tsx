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
import { useGetReq } from "../hooks/useGetReq";
import { toast } from "react-toastify";

const AuthContext = createContext<AuthValue>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const {
    data,
    error,
    loading: _loading,
    setData,
  } = useGetReq("/home-page", {});

  const {
    data: cartItems,
    setData: setCartItems,
    error: _error,
    loading: __loading,
  } = useGetReq("/get-cart", {});

  if (error) {
    toast.error(error || "Something went wrong!");
  }

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
    data,
    setData,
    cartItems,
    setCartItems,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading || _loading || __loading ? <LoadingSkeleton /> : children}
    </AuthContext.Provider>
  );
}
