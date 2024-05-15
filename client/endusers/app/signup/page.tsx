"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import usePostReq from "../hooks/usePostReq";
import Link from "next/link";
import { Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";

export default function Page() {
  const fnameRef = useRef<HTMLInputElement>(null);
  const lnameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const repPassRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { setCurrentUser, currentUser } = useAuth();
  const { execute, loading, error } = usePostReq("/register");

  useEffect(() => {
    if (currentUser) {
      router.push("/profile");
    }
  }, [currentUser]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (passRef.current?.value !== repPassRef.current?.value) {
      return toast.error("Password don't match!");
    }

    try {
      const res = await execute({
        fname: fnameRef.current?.value,
        lname: lnameRef.current?.value,
        phone: phoneRef.current?.value,
        birthDate: birthDateRef.current?.value,
        gender: genderRef.current?.value,
        email: emailRef.current?.value,
        pass: passRef.current?.value,
      });

      if (res?.success) {
        setCurrentUser(res.user);
        // setCartItems({ products: [] });
        return router.push("/profile");
      }

      toast.error(res.message || error);
    } catch (err: any) {
      console.log(error);

      console.log(err);
    }
  }

  return (
    <main className="bg-[#f5f5f5] flex flex-col justify-center items-center">
      <div className="bg-white p-6 flex flex-col gap-5 lg:w-1/2 w-full m-10">
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
        <h3 className="text-black font-bold">Signup</h3>
        <span>Enter your email and password to create your accout</span>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-10">
            <input
              type="text"
              required
              id="fname"
              ref={fnameRef}
              className="cursor-pointer bg-transparent outline-none border-b-2 border-black"
              placeholder="FIRST NAME*"
            />
            <input
              type="text"
              ref={lnameRef}
              required
              id="lname"
              className="cursor-pointer bg-transparent outline-none border-b-2 border-black"
              placeholder="LAST NAME*"
            />
            <input
              type="tel"
              ref={phoneRef}
              required
              id="phone"
              className="cursor-pointer bg-transparent outline-none border-b-2 border-black"
              pattern="[0-9]{10}"
              placeholder="PHONE NUMBER*"
            />
            <div className="flex justify-between lg:flex-row flex-col gap-5 w-full">
              <label htmlFor="birth-date" className="w-full">
                DOB
              </label>
              <input
                type="date"
                ref={birthDateRef}
                required
                id="birth-date"
                className="cursor-pointer w-full bg-transparent outline-none border-b-2 border-black"
                placeholder="Birthday*"
              />
            </div>
            <div className="flex w-full justify-between">
              <strong>Gender: </strong>
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <input
                    ref={genderRef}
                    type="radio"
                    name="gender"
                    value="Male"
                    id="Male"
                  />
                  <label htmlFor="Male">Male</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    ref={genderRef}
                    type="radio"
                    name="gender"
                    value="Female"
                    id="Female"
                  />
                  <label htmlFor="Female">Female</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    ref={genderRef}
                    type="radio"
                    name="gender"
                    value="Other"
                    id="Other"
                  />
                  <label htmlFor="Other">Other</label>
                </div>
              </div>
            </div>
            <input
              type="email"
              id="email"
              className="cursor-pointer bg-transparent outline-none border-b-2 border-black"
              ref={emailRef}
              placeholder="EMAIL*"
            />
            <input
              type="password"
              id="password"
              ref={passRef}
              placeholder="PASSWORD*"
              className="cursor-pointer bg-transparent outline-none border-b-2 border-black"
            />
            <input
              ref={repPassRef}
              type="password"
              id="rep-password"
              placeholder="REPEAT PASSWORD*"
              className="cursor-pointer bg-transparent outline-none border-b-2 border-black"
            />
          </div>
          <div className="my-8 flex flex-col">
            <span className="text-black">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our privacy policy.
            </span>
            <div className="flex gap-3 my-2">
              <input type="checkbox" id="terms-conditions" required />
              <label htmlFor="terms-conditions" className="text-black">
                By clicking here you agree to our{" "}
                <Link href="/terms-conditions" className="underline">
                  Terms & Conditions
                </Link>
              </label>
            </div>
            <div className="flex gap-3 mb-2">
              <input type="checkbox" id="privacy" required />
              <label htmlFor="privacy" className="text-black">
                By clicking here you agree to our{" "}
                <Link href="/privacy-policy" className="underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="bg-transparent w-full border border-black hover:bg-black transition hover:text-white cursor-pointer uppercase font-bold py-3 mt-5"
            >
              {loading ? <Spinner className="h-8 w-8 mx-auto" /> : "register"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <span>
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}
