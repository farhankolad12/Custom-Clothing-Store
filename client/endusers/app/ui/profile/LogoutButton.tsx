"use client";

import { useAuth } from "@/app/context/AuthProvider";
import usePostReq from "@/app/hooks/usePostReq";
import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LogoutButton() {
  const router = useRouter();
  const { setCurrentUser } = useAuth();
  const { error, execute, loading } = usePostReq("/logout");

  if (error) {
    toast.error(error, {
      position: "top-right",
    });
  }

  async function handleLogout() {
    try {
      const res = await execute({});

      if (res?.success) {
        setCurrentUser(undefined);
        router.replace("/");
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <button
      onClick={handleLogout}
      type="button"
      className="bg-transparent uppercase font-bold text-xs "
    >
      {loading ? <Spinner className="w-4 h-4 mx-auto" /> : "logout"}
    </button>
  );
}
