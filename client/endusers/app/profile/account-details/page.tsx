"use client";

import { useAuth } from "@/app/context/AuthProvider";
import usePostReq from "@/app/hooks/usePostReq";
import withAuth from "@/app/utils/PrivateRoutes";
import { Spinner } from "@material-tailwind/react";
import { FormEvent, useRef } from "react";
import { toast } from "react-toastify";

function Page() {
  const { currentUser } = useAuth();
  const { error, execute, loading, setError } = usePostReq("/register");

  const fnameRef = useRef<HTMLInputElement>(null);
  const lnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const currPassRef = useRef<HTMLInputElement>(null);
  const newPassRef = useRef<HTMLInputElement>(null);
  const conNewPassRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    setError("");
    e.preventDefault();

    if (newPassRef.current?.value !== conNewPassRef.current?.value) {
      return toast.error("Password don't match!", {
        position: "top-right",
      });
    }

    try {
      const res = await execute({
        _id: currentUser?._id,
        fname: fnameRef.current?.value,
        lname: lnameRef.current?.value,
        email: emailRef.current?.value,
        phone: phoneRef.current?.value,
        currPass: currPassRef.current?.value,
        newPass: newPassRef.current?.value,
        conNewPass: conNewPassRef.current?.value,
        editing: true,
      });

      if (error) {
        return toast.error(error, {
          position: "top-right",
        });
      }

      if (res?.success) {
        toast.success("Changes saved!", {
          position: "top-right",
        });
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="flex flex-col gap-2 text-sm uppercase">
        <label className="font-bold" htmlFor="fname">
          first name
        </label>
        <input
          id="fname"
          ref={fnameRef}
          defaultValue={currentUser?.fname}
          type="text"
          required
          className="border-b-2 border-black outline-none"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm uppercase">
        <label className="font-bold" htmlFor="lname">
          last name
        </label>
        <input
          defaultValue={currentUser?.lname}
          type="text"
          ref={lnameRef}
          id="lname"
          required
          className="border-b-2 border-black outline-none"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm uppercase">
        <label className="font-bold" htmlFor="email">
          email
        </label>
        <input
          id="email"
          ref={emailRef}
          defaultValue={currentUser?.email}
          type="text"
          required
          className="border-b-2 border-black outline-none"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm uppercase">
        <label className="font-bold" htmlFor="phone">
          phone number
        </label>
        <input
          defaultValue={currentUser?.phone}
          required
          ref={phoneRef}
          id="phone"
          type="text"
          className="border-b-2 border-black outline-none"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm uppercase">
        <label className="font-bold" htmlFor="curr-pass">
          current password (LEAVE BLANK TO LEAVE UNCHANGED)
        </label>
        <input
          type="password"
          ref={currPassRef}
          id="curr-pass"
          className="border-b-2 border-black outline-none"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm uppercase">
        <label className="font-bold" htmlFor="new-pass">
          new password (LEAVE BLANK TO LEAVE UNCHANGED)
        </label>
        <input
          ref={newPassRef}
          type="password"
          id="new-pass"
          className="border-b-2 border-black outline-none"
        />
      </div>
      <div className="flex flex-col gap-2 text-sm uppercase">
        <label className="font-bold" htmlFor="con-new-pass">
          confirm new password
        </label>
        <input
          ref={conNewPassRef}
          id="con-new-password"
          type="password"
          className="border-b-2 border-black outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-transparent px-5 border border-black uppercase  font-bold hover:bg-black hover:text-white py-4"
      >
        {loading ? <Spinner className="w-6 h-6 mx-auto" /> : "save changes"}
      </button>
    </form>
  );
}

export default withAuth(Page);
