"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import usePostReq from "../hooks/usePostReq";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";

export default function Page() {
  const [success, setSuccess] = useState("");

  const { execute, loading } = usePostReq("/reset-password");

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
    <main className="bg-[#f5f5f5] flex flex-col justify-center items-center h-screen">
      <div className="bg-white p-6 flex flex-col gap-5">
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="https://www.essentialsbyla.com/logo.png"
              alt="Logo"
              width={200}
              height={200}
            />
          </Link>
        </div>
        <h3 className="text-black font-bold">Reset Password</h3>
        <form onSubmit={handleClick}>
          {success && (
            <div className="text-center my-5">
              <strong className="font-bold text-green-500">{success}</strong>
            </div>
          )}
          <div className="flex flex-col gap-5 mt-3">
            <span className="text-black">
              Lost your password? Please enter your email address. You will
              receive a link to create a new password via email.
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
        <div className="text-center">
          <span>
            Login to your account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}
