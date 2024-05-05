"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";
import Authentication from "./Home/Authentication";
import { FormEvent, useRef, useState } from "react";
import usePostReq from "../hooks/usePostReq";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";

export default function Footer() {
  const [open, setOpen] = useState(false);

  const { error, execute, loading } = usePostReq("/newsletter");
  const emailRef = useRef<HTMLInputElement>(null!);
  const { currentUser } = useAuth();
  const router = useRouter();

  const handleAuthOpen = () => setOpen(!open);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await execute({
        email: emailRef.current.value,
      });

      if (!res?.success) {
        return toast.error(res.message || error);
      }

      toast.success(res.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err || "Something went wrong!");
    }
  }

  return (
    <footer className="pt-20" style={{ backgroundColor: "#eeedeb" }}>
      <div className="px-10">
        <div className="flex gap-10 lg:flex-row flex-col justify-between items-center pb-20">
          <Image
            src="/logo.png"
            alt="Logo"
            className="lg:w-1/6 w-full lg:h-auto h-50"
            width={0}
            unoptimized
            height={0}
          />
          <div className="flex lg:flex-row flex-col gap-10">
            <div className="flex justify-between lg:justify-start w-full items-center gap-10 ">
              <i className="bi bi-box2-fill text-6xl" />
              <strong className="uppercase">
                free shipping on first order
              </strong>
            </div>
            <div className="flex justify-between lg:justify-start w-full items-center gap-10 ">
              <i className="bi bi-award text-6xl" />
              <strong className="uppercase">90-day warranty</strong>
            </div>
            <div className="flex justify-between lg:justify-start w-full items-center gap-10 ">
              <i className="bi bi-credit-card text-6xl" />
              <strong className="uppercase">
                NEW PRODUCT OFFERINGS & DEALS
              </strong>
            </div>
          </div>
        </div>
        <div className="container px-5 border-y-2 border-gray-400 py-20 flex lg:flex-row flex-col justify-between gap-10">
          <div className="flex flex-col gap-5">
            <span className="uppercase font-bold">information</span>
            <Link
              href="/privacy-policy"
              className="font-bold uppercase text-xs"
            >
              privacy policy
            </Link>
            <Link
              href="/terms-condition"
              className="font-bold uppercase text-xs"
            >
              terms of sale
            </Link>
            <Link href="/contact" className="font-bold uppercase text-xs">
              contact us
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <span className=" uppercase font-bold">shop</span>
            <Link href="/shop" className="font-bold uppercase text-xs">
              our store
            </Link>
            <Link href="/shop?category" className="font-bold uppercase text-xs">
              shop by category
            </Link>
            <button
              className="p-0 font-bold uppercase text-xs text-left"
              onClick={() =>
                currentUser ? router.push("/profile") : handleAuthOpen()
              }
            >
              sign up for deals
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <span className=" uppercase font-bold">account</span>
            <button
              className="text-left font-bold uppercase text-xs"
              onClick={() =>
                currentUser ? router.push("/profile") : handleAuthOpen()
              }
            >
              login
            </button>
            <button
              className="text-left font-bold uppercase text-xs"
              onClick={() =>
                currentUser ? router.push("/profile") : handleAuthOpen()
              }
            >
              sign up
            </button>
            <button
              className="text-left font-bold uppercase text-xs"
              onClick={() =>
                currentUser ? router.push("/profile") : handleAuthOpen()
              }
            >
              account
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <span className=" uppercase font-bold">social</span>
            <a
              target="_blank"
              href="https://www.instagram.com/essentials.by.la"
              className="font-bold uppercase text-xs"
            >
              <i className="bi bi-instagram" /> Instagram
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100083453085816"
              className="font-bold uppercase text-xs"
            >
              <i className="bi bi-facebook" /> facebook
            </a>
            <a target="_blank" href="/" className="font-bold uppercase text-xs">
              <i className="bi bi-threads" /> Threads
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:flex-row justify-between py-20">
          <div className="flex flex-col gap-3">
            <strong className="uppercase">newsletter</strong>
            <p>
              Dunker has all of the best products from all of the top brands.
            </p>
            <form onSubmit={handleSubmit} className="w-full relative">
              <input
                ref={emailRef}
                required
                type="text"
                placeholder="YOUR EMAIL"
                className="border-0 bg-transparent border-b-2 outline-none border-black w-full"
              />
              <button
                disabled={loading}
                type="submit"
                className="absolute right-2"
              >
                {loading ? (
                  <Spinner className="w-6 h-6" />
                ) : (
                  <i className="bi bi-arrow-right" />
                )}
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-5">
            <strong className="uppercase">mumbai</strong>
            <strong className="text-xs">+91 8689913856</strong>
            <strong className="text-xs uppercase">
              H-A/2 Kailash Puram Mohili Village Opp. Peninsula Hotel Sakinak,
              Andheri (east) <br /> Mumbai, MH 400972
            </strong>
            <strong className="text-xs uppercase">MON-SAT: 09:00-19:00</strong>
          </div>
          <div className="flex flex-col gap-5">
            <strong className="uppercase">mumbai</strong>
            <strong className="text-xs">+91 8689913856</strong>
            <strong className="text-xs uppercase">
              Supariwala mansion, Room No A 1, 3 FLoor, 7, Dontad X Lane, Chinch
              Bandar Khadak <br /> Mumbai, MH 400009
            </strong>
            <strong className="text-xs uppercase">MON-SAT: 09:00-19:00</strong>
          </div>
        </div>
      </div>
      <div
        className="py-10 ps-20"
        style={{
          backgroundImage: "url('/video-img-1.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
      >
        <strong className="uppercase text-grey-300">
          © 2024 Essentials By LA, ALL RIGHTS RESERVED
        </strong>
      </div>
      <div className="footer-auth">
        <Authentication handleOpen={() => handleAuthOpen()} open={open} />
      </div>
    </footer>
  );
}
