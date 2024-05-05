import React from "react";
import usePostReq from "../hooks/usePostReq";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";

export default function LogoutButton({ setOpenNav }: { setOpenNav: Function }) {
  const { setCurrentUser } = useAuth();
  const { error, execute, loading } = usePostReq("/logout");

  async function handleClick() {
    try {
      const res = await execute({});

      if (res?.success) {
        setCurrentUser(undefined);
        return setOpenNav(false);
      }

      return toast.error(res.message);
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleClick}
      className="btn btn-success rounded-2 w-100"
    >
      {loading ? (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <i className="bi bi-box-arrow-right fs-5 fw-bold" /> Logout
        </>
      )}
    </button>
  );
}
