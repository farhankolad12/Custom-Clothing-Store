"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef } from "react";
import usePostReq from "../hooks/usePostReq";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import Link from "next/link";

export default function Page() {
  const emailRef = useRef<HTMLInputElement>(null!);
  const passRef = useRef<HTMLInputElement>(null!);

  const router = useRouter();

  const { error, execute, loading } = usePostReq("/login");
  const { setCurrentUser, setCartItems, currentUser, data } = useAuth();

  useEffect(() => {
    if (currentUser) {
      router.push("/profile");
    }
  }, [currentUser]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await execute({
        email: emailRef.current?.value,
        password: passRef.current?.value,
      });

      if (res?.success) {
        setCurrentUser(res?.user);
        setCartItems(res.cartItems);
        return router.push("/profile");
      }

      return toast.error(res.message || error);
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <main className="bg-[#f5f5f5] flex flex-col justify-center items-center h-screen">
      <div className="bg-white p-6 flex flex-col gap-5">
        <div className="flex justify-center">
          <Link shallow={true} href="/">
            <Image
              loading="eager"
              unoptimized
              src={
                data?.homePageContent.logo?.link ||
                "https://www.essentialsbyla.com/logo.png"
              }
              alt="Logo"
              priority={true}
              width={200}
              height={200}
            />
          </Link>
        </div>
        <h3 className="text-black font-bold">Log In</h3>
        <span>Enter your email and password to log in to your accout</span>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-12 mt-3">
            <input
              required
              type="email"
              id="email"
              ref={emailRef}
              className="cursor-pointer bg-transparent outline-none border-b-2 border-black"
              placeholder="EMAIL*"
            />
            <input
              required
              ref={passRef}
              type="password"
              id="password"
              placeholder="PASSWORD*"
              className="cursor-pointer bg-transparent outline-none border-b-2 border-black"
            />
          </div>
          <div className="mt-10 flex justify-between items-center gap-4">
            <Link
              shallow={true}
              href="/forget-password"
              className="bg-transparent uppercase text-sm font-bold text-black"
            >
              lost your password?
            </Link>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="bg-transparent w-full transition border border-black hover:bg-black hover:text-white text-black cursor-pointer uppercase font-bold py-3 my-5"
          >
            {loading ? <Spinner className="w-8 h-8 mx-auto" /> : "login"}
          </button>
        </form>
        <div className="text-center">
          <span>
            Don't have an account?{" "}
            <Link shallow={true} href="/signup" className="underline">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}
