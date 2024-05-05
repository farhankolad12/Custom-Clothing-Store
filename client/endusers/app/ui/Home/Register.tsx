import { useAuth } from "@/app/context/AuthProvider";
import usePostReq from "@/app/hooks/usePostReq";
import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const fnameRef = useRef<HTMLInputElement>(null);
  const lnameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const repPassRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { setCurrentUser } = useAuth();
  const { execute, loading, error, setError } = usePostReq("/register");

  async function handleSubmit(e: FormEvent) {
    setError("");
    e.preventDefault();

    if (passRef.current?.value !== repPassRef.current?.value) {
      return setError("Password don't match!");
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
        router.replace("/profile");
      }

      setError(res.message);
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="h-96 overflow-y-scroll">
      {error && (
        <div className="text-red-900 my-2 font-bold text-center text-lg">
          {error}
        </div>
      )}
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
        <input
          type="date"
          ref={birthDateRef}
          required
          id="birth-date"
          className="cursor-pointer bg-transparent outline-none border-b-2 border-black"
          placeholder="Birthday*"
        />
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
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our privacy policy.
        </span>
        <button
          disabled={loading}
          type="submit"
          className="bg-transparent w-full border border-black hover:bg-black transition hover:text-white cursor-pointer uppercase font-bold py-3 my-5"
        >
          {loading ? <Spinner className="h-8 w-8 mx-auto" /> : "register"}
        </button>
        {error && (
          <span className="text-red-900 font-bold text-center text-lg">
            {error}
          </span>
        )}
      </div>
    </form>
  );
}
