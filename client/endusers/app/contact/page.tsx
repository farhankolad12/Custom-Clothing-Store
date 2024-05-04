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

      if (!res.success) {
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
            src="/contact1.jpg"
            className="h-96 lg:h-screen"
            width={0}
            height={0}
            style={{ width: "100%", objectFit: "cover" }}
            alt="Contact"
          />
          <h1 className="text-white absolute top-0 bottom-0 end-0 start-0 flex items-center justify-center lg:text-6xl text-4xl uppercase font-bold">
            Contact Us
          </h1>
        </div>
        <div className="flex justify-between gap-20 lg:flex-row flex-col px-8 lg:px-20 my-20">
          <div className="flex flex-col gap-4">
            <i className="bi bi-box2 text-7xl"></i>
            <strong className="uppercase text-2xl font-bold">our vision</strong>
            <span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
              quidem numquam, omnis maiores corporis eveniet beatae dolor quod
              itaque minima.
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <i className="bi bi-headphones text-7xl"></i>
            <strong className="uppercase text-2xl font-bold">what we do</strong>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae
              ullam placeat corporis id sint itaque aliquam rerum dignissimos,
              explicabo ipsum!
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <i className="bi bi-card-heading text-7xl"></i>
            <strong className="uppercase text-2xl font-bold">history</strong>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              quod, est quae tempore id consectetur labore libero sequi eligendi
              minima!
            </span>
          </div>
        </div>
        <div className="lg:px-20 px-8 w-full my-20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224.1656879823397!2d72.83250242471694!3d18.95999427286403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce3c1e880121%3A0x5da7d8393a9b2a13!2sHazrat%20Peer%20Sayyad%20Jalaluddin%20Shah%20Qadri%20Rehmatullah%20Allaieh!5e1!3m2!1sen!2sin!4v1713594007720!5m2!1sen!2sin"
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
              Lorem ipsum dolor sit amet, cons ectetur adipiscing elitull am
              aliqu am, velit rutrum dictum lobortis, turpis justo auc tor quam,
              a auctor. Vix ut ignota deseru nt partien ad, pros tale falli
              periculis ad, idque deseruisse constituam.
            </span>
            <div className="flex gap-5">
              <i className="bi bi-phone" />
              <Link href="tel:+91 8689913856">+91 8689913856</Link>
            </div>
            <div className="flex gap-5">
              <i className="bi bi-envelope" />
              <Link href="mailto:essentialsbyla@gmail.com">
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
