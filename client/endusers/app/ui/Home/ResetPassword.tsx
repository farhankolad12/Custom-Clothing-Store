import usePostReq from "@/app/hooks/usePostReq";
import { Spinner } from "@material-tailwind/react";
import React, { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [success, setSuccess] = useState("");

  const { execute, loading, error, setError } = usePostReq("/reset-password");

  const emailRef = useRef<HTMLInputElement>(null!);

  async function handleClick(e: FormEvent) {
    e.preventDefault();
    try {
      const email = emailRef.current.value;

      const res = await execute({ email });

      if (!res?.success) {
        return toast.error(res.message);
      }

      setSuccess("Reset link has been mailed to your provided email");
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleClick}>
      {success && (
        <div className="text-center my-5">
          <strong className="font-bold text-green-500">{success}</strong>
        </div>
      )}
      <div className="flex flex-col gap-5 mt-3">
        <span className="text-black">
          Lost your password? Please enter your email address. You will receive
          a link to create a new password via email.
        </span>
        <input
          type="email"
          id="email"
          placeholder="EMAIL*"
          ref={emailRef}
          className="cursor-pointer bg-transparent outline-none border-b-2 border-black"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-transparent w-full border border-black hover:bg-black hover:text-white cursor-pointer uppercase font-bold py-3 my-10"
      >
        {loading ? (
          <div className="flex w-full justify-center items-center">
            <Spinner className="w-10 h-10" />
          </div>
        ) : (
          "reset password"
        )}
      </button>
    </form>
  );
}
