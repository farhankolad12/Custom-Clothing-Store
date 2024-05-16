"use client";

import Link from "next/link";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import { FormEvent, useRef } from "react";
import { toast } from "react-toastify";
import usePostReq from "../hooks/usePostReq";
import { Spinner } from "@material-tailwind/react";
import Image from "next/image";

export default function Page() {
  const messageRef = useRef<HTMLTextAreaElement>(null!);
  const emailRef = useRef<HTMLInputElement>(null!);
  const nameRef = useRef<HTMLInputElement>(null!);

  const { error, execute, loading } = usePostReq("/queries");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await execute({
        message: messageRef.current.value,
        email: emailRef.current.value,
        name: nameRef.current.value,
      });

      if (!res?.success) {
        return toast.error(res.message || error || "Something went wrong!");
      }

      toast.success("Message succesfully send!");

      // messageRef.current.value = "";
      // nameRef.current.value = "";
      // emailRef.current.value = "";
    } catch (err: any) {
      console.log(err);
      toast.error(err || "Something went wrong!");
    }
  }

  return (
    <div className="not-home">
      <Header />
      <main>
        <div className="relative">
          <Image
            unoptimized
            src="/contact1.jpeg"
            className="h-96 lg:h-screen"
            width={0}
            height={0}
            style={{ width: "100%", objectFit: "cover" }}
            alt="Contact"
            title="Contact"
          />
          <h1 className="text-white mb-10 absolute top-0 bottom-0 end-0 start-0 flex items-center justify-center lg:text-6xl text-4xl uppercase font-bold">
            Contact Us
          </h1>
        </div>
        <div className="flex justify-between gap-20 lg:flex-row flex-col px-8 lg:px-20 my-20">
          <div className="flex flex-col gap-4">
            <i className="bi bi-box2 text-7xl"></i>
            <strong className="uppercase text-2xl font-bold">our vision</strong>
            <span>
              Empowering individuals to express their unique style and
              confidence through fashionable clothing that inspires
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <i className="bi bi-headphones text-7xl"></i>
            <strong className="uppercase text-2xl font-bold">what we do</strong>
            <span>
              We curate a diverse collection of trendy and timeless apparel,
              offering our customers a seamless shopping experience filled with
              quality, comfort, and style
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <i className="bi bi-card-heading text-7xl"></i>
            <strong className="uppercase text-2xl font-bold">history</strong>
            <span>
              Since 2019, we've been your go-to for trendy fashion and quality
              service. Evolving from humble roots, we're now a trusted style
              destination, offering timeless apparel and a seamless shopping
              experience.
            </span>
          </div>
        </div>
        <div className="lg:px-20 px-8 w-full my-20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2418.768698570858!2d72.8890672044052!3d19.103230282764372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c871792258f9%3A0x9c3e2a0d864ebb0e!2s2%2C%20Kailash%20Puram%20Rd%2C%20Bandi%20Bazaar%2C%20Nair%20Wadi%2C%20Asalpha%2C%20Mumbai%2C%20Maharashtra%20400072!5e1!3m2!1sen!2sin!4v1714829062809!5m2!1sen!2sin"
            width="100%"
            height="650px"
            style={{ border: "0" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="lg:px-20 px-8 flex lg:flex-row flex-col justify-between gap-10 w-full my-20">
          <div className="flex flex-col gap-3 w-full">
            <strong className="text-5xl uppercase font-bold">
              GET IN TOUCH WITH US
            </strong>
            <span>
              Got questions or feedback? Reach out to us! Our dedicated team is
              here to assist you with anything you need. Contact us via phone,
              email. We look forward to hearing from you!
            </span>
            <div className="flex gap-5">
              <i className="bi bi-phone" />
              <Link shallow={true} href="tel:+91 8689913856">
                +91 8689913856
              </Link>
            </div>
            <div className="flex gap-5">
              <i className="bi bi-envelope" />
              <Link shallow={true} href="mailto:essentialsbyla@gmail.com">
                essentialsbyla@gmail.com
              </Link>
            </div>
            <div className="flex gap-5">
              <i className="bi bi-geo-alt" />
              <span>
                H-A/2 Kailash Puram Mohili Village Opp. Peninsula Hotel Sakinak,
                Andheri (east), Mumbai-400972 MH, India
              </span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
            <textarea
              placeholder="Message"
              className="w-full border-b-2 border-black transition outline-none p-0"
              required
              ref={messageRef}
              rows={8}
            />
            <div className="flex lg:flex-row flex-col gap-10 w-full">
              <input
                type="text"
                placeholder="Name"
                ref={nameRef}
                className="w-full border-b-2 border-black transition outline-none p-0"
                required
              />
              <input
                type="email"
                required
                placeholder="Email"
                ref={emailRef}
                className="w-full border-b-2 border-black transition outline-none p-0"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="border-2 border-black hover:bg-black hover:text-white transition w-full py-3 uppercase flex justify-center "
            >
              {loading ? <Spinner className="w-6 h-6" /> : "send message"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
