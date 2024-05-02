"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef } from "react";
import usePostReq from "../hooks/usePostReq";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";

export default function Page() {
  const { currentUser, setCurrentUser } = useAuth();
  const { error, execute, loading } = usePostReq("/login");

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    currentUser && router.replace("/");
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [currentUser]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await execute({
        email: emailRef.current?.value,
        password: passRef.current?.value,
        isAdmin: true,
      });

      if (!res) {
        return toast.error(error || "Email/password is incorrect");
      }

      setCurrentUser(res?.user);
      router.replace("/");
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <>
      {/* {error && toast.error(error)} */}
      <section>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4 mt-3">
          <h3 className="text-light">Login</h3>
          <div className="flex flex-column gap-2">
            <label className="text-secondary" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              style={{ backgroundColor: "#374151" }}
              className="form-control text-light"
              required
              placeholder="jhon@doe.com"
              type="email"
              ref={emailRef}
            />
          </div>
          <div className="flex flex-column gap-2">
            <label className="text-secondary" htmlFor="password">
              Password
            </label>
            <input
              required
              style={{ backgroundColor: "#374151" }}
              id="password"
              type="password"
              ref={passRef}
              className="form-control text-light"
            />
          </div>
          <button disabled={loading} className="btn btn-success py-3 mb-3">
            {loading ? (
              <div className="spinner-border fs-5 text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>

          <div className="text-center border-top pt-4">
            <Link
              className="text-success text-decoration-none "
              href="/forget-password"
            >
              Forget your password
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
