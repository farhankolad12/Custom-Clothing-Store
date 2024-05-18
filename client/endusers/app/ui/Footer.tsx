"use client";

import Link from "next/link";
import { FormEvent, useRef } from "react";
import usePostReq from "../hooks/usePostReq";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";

export default function Footer() {
  const { error, execute, loading } = usePostReq("/newsletter");
  const emailRef = useRef<HTMLInputElement>(null!);

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
    <footer className="bg-black flex justify-between flex-col lg:px-[10rem] px-[2rem] py-[2rem] text-[#828282] gap-32 lg:pb-[2rem] md:pb-[2rem] pb-28">
      <div className="flex lg:flex-row flex-col gap-20 items-center lg:items-end justify-between ">
        <form
          onSubmit={handleSubmit}
          className="flex  flex-col gap-[1rem] lg:w-1/2 w-full relative"
        >
          <label htmlFor="subscribe-email" className="text-white text-lg">
            Subscribe to our emails
          </label>
          <input
            ref={emailRef}
            required
            id="subscribe-email"
            type="email"
            placeholder="Email"
            className="border-2 p-3 text-white border-white bg-transparent outline-none"
          />
          <button
            disabled={loading}
            type="submit"
            className="absolute top-[2.7rem] bottom-0 right-2"
          >
            {loading ? (
              <Spinner className="w-6 h-6" />
            ) : (
              <i className="bi bi-arrow-right text-xl text-white" />
            )}
          </button>
        </form>
        <div className="flex gap-4 text-white">
          <a
            target="_blank"
            href="https://www.instagram.com/essentials.by.la"
            className="font-bold uppercase text-lg"
          >
            <i className="bi bi-instagram" />
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/profile.php?id=100083453085816"
            className="font-bold uppercase text-lg"
          >
            <i className="bi bi-facebook" />
          </a>
          <a
            target="_blank"
            href="https://wa.me/8689913856"
            className="font-bold uppercase text-lg"
          >
            <i className="bi bi-whatsapp" />
          </a>
        </div>
      </div>
      <div className="flex flex-wrap lg:justify-start justify-center gap-5 text-xs font-bold">
        <span>&copy; {new Date().getFullYear()}, Essentials By LA</span>
        <Link shallow={true} href="/about">
          {" "}
          &bull; About Us
        </Link>
        <Link shallow={true} href="/refund-policy">
          {" "}
          &bull; Refund Policy
        </Link>
        <Link shallow={true} href="/privacy-policy">
          {" "}
          &bull; Privacy Policy
        </Link>
        <Link shallow={true} href="/terms-condition">
          {" "}
          &bull; Terms & Conditions
        </Link>
        <Link shallow={true} href="/shipping-policy">
          {" "}
          &bull; Shipping Policy
        </Link>
        <Link shallow={true} href="/contact">
          {" "}
          &bull; Contact Information
        </Link>
      </div>
    </footer>
  );
}

/*   <div className="px-10">
        <div className="flex gap-10 lg:flex-row flex-col justify-between items-center pb-20">
          <Image unoptimized  quality={100} 
            src="/logo.png"
            alt="Logo"
            title="Logo"
            className="lg:w-1/6 w-full lg:h-auto h-50"
            width={0}
            
            height={0}
          />
          <div className="flex lg:flex-row flex-col gap-10">
            <div className="flex justify-between lg:justify-start w-full items-center gap-10 ">
              <i className="bi bi-box2-fill text-6xl" />
              <strong className="uppercase">
                free shipping on order above 2000₹
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
            <Link shallow={true}
              href="/privacy-policy"
              className="font-bold uppercase text-xs"
            >
              privacy policy
            </Link>
            <Link shallow={true}
              href="/terms-condition"
              className="font-bold uppercase text-xs"
            >
              terms of sale
            </Link>
            <Link shallow={true} href="/refund-policy" className="font-bold uppercase text-xs">
              Refund Policy
            </Link>
            <Link shallow={true}
              href="/shipping-policy"
              className="font-bold uppercase text-xs"
            >
              Shipping Policy
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <span className=" uppercase font-bold">shop</span>
            <Link shallow={true} href="/shop" className="font-bold uppercase text-xs">
              our store
            </Link>
            <Link shallow={true} href="/shop?category" className="font-bold uppercase text-xs">
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
            <Link shallow={true}
              className="p-0 font-bold uppercase text-xs text-left"
              href="/contact"
            >
              customized products
            </Link>
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
            <button
              className="text-left font-bold uppercase text-xs"
              onClick={() =>
                currentUser ? router.push("/profile/orders") : handleAuthOpen()
              }
            >
              orders
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <span className=" uppercase font-bold">social</span>
            <Link shallow={true} href="/contact" className="font-bold uppercase text-xs">
              contact us
            </Link>
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
            <a
              target="_blank"
              href="https://wa.me/8689913856"
              className="font-bold uppercase text-xs"
            >
              <i className="bi bi-whatsapp" /> WhatsApp
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:flex-row justify-between py-20">
          <div className="flex flex-col gap-3">
            <strong className="uppercase">newsletter</strong>
            <p>Essentials By LA has all of the best products.</p>
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
        className="py-10 lg:ps-20 ps-0 lg:text-left text-center"
        style={{
          backgroundImage: "url('/video-img-1.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
      >
        <strong className="uppercase text-white">
          © 2024 Essentials By LA, ALL RIGHTS RESERVED
        </strong>
      </div>
      <div className="footer-auth">
        <Authentication handleOpen={() => handleAuthOpen()} open={open} />
      </div>*/
