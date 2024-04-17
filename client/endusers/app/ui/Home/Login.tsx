import { useAuth } from "@/app/context/AuthProvider";
import usePostReq from "@/app/hooks/usePostReq";
import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useRef } from "react";

export default function Login({
  setSelectedAuth,
}: {
  setSelectedAuth: Function;
}) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const rememberRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { setCurrentUser } = useAuth();
  const { error, execute, loading, setError } = usePostReq("/login");

  async function handleSubmit(e: FormEvent) {
    setError("");
    e.preventDefault();

    try {
      const res = await execute({
        email: emailRef.current?.value,
        password: passRef.current?.value,
        remember: rememberRef.current?.checked,
      });

      if (res) {
        setCurrentUser(res?.user);
        router.replace("/profile");
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="text-red-900 my-2 font-bold text-center text-lg">
          {error}
        </div>
      )}
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
        <div className="flex gap-2 items-center">
          <input
            ref={rememberRef}
            type="checkbox"
            name="remember"
            id="remember"
          />
          <label className="text-black" htmlFor="remember">
            Remember me
          </label>
        </div>
        <button
          type="button"
          onClick={() => setSelectedAuth("reset")}
          className="bg-transparent uppercase text-sm font-bold text-black"
        >
          lost your password?
        </button>
      </div>
      <button
        disabled={loading}
        type="submit"
        className="bg-transparent w-full border border-black hover:bg-black hover:text-white text-black cursor-pointer uppercase font-bold py-3 my-5"
      >
        {loading ? <Spinner className="w-8 h-8 mx-auto" /> : "login"}
      </button>
    </form>
  );
}
