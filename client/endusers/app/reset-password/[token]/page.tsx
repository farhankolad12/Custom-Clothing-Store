"use client";

import usePostReq from "@/app/hooks/usePostReq";
import Footer from "@/app/ui/Footer";
import Header from "@/app/ui/Header";
import { Spinner } from "@material-tailwind/react";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const { token } = useParams();

  const { execute, loading } = usePostReq("/forget-password");
  const router = useRouter();

  const passRef = useRef<HTMLInputElement>(null!);
  const conPassRef = useRef<HTMLInputElement>(null!);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (passRef.current?.value !== conPassRef.current?.value) {
      return toast.error("Password don't match");
    }
    const res = await execute({
      token,
      password: passRef.current?.value,
    });

    if (!res?.success) {
      return toast.error(res.message);
    }

    router.push("/");

    toast.success("You can log in to your account using new password!");
  }

  return (
    <div className="not-home">
      <Header />
      <main className="my-20 lg:px-20 px-10">
        <div className="my-5 flex flex-col justify-center">
          <h3 className="font-bold mb-4 text-center">Reset your account</h3>
          <div
            // style={{ border: "1px solid #000" }}
            className=" border-2"
          >
            <form
              onSubmit={handleSubmit}
              className="flex p-5 flex-col gap-3 py-3"
            >
              <div className="flex lg:flex-row flex-col gap-5 items-center">
                <label
                  className="w-full uppercase font-bold"
                  htmlFor="password"
                >
                  new password
                </label>
                <input
                  ref={passRef}
                  type="password"
                  id="new-password"
                  className="w-full border-2 border-black"
                  required
                />
              </div>
              <div className="flex lg:flex-row flex-col gap-5 align-items-center">
                <label
                  className="w-full uppercase font-bold"
                  htmlFor="con-password"
                >
                  confirm password
                </label>
                <input
                  ref={conPassRef}
                  type="password"
                  id="con-password"
                  className="w-full border-2 border-black"
                  required
                />
              </div>
              <button
                disabled={loading}
                className="bg-black my-5 text-white py-2 px-4 font-bold uppercase"
              >
                {loading ? (
                  <div className="flex w-full justify-center items-center">
                    <Spinner className="w-10 h-10" />
                  </div>
                ) : (
                  "set"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
