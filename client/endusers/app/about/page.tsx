"use client";

import { toast } from "react-toastify";
import { useGetReq } from "../hooks/useGetReq";
import LoadingSkeleton from "../loading";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog } from "@material-tailwind/react";

export default function Page() {
  const [open, setOpen] = useState(false);

  const { data, error, loading } = useGetReq("/about-page", {});
  const router = useRouter();

  function handleOpen() {
    setOpen(!open);
  }

  if (error) {
    toast.error(error || "Something went wrong!");
  }

  return loading ? (
    <LoadingSkeleton />
  ) : (
    <div className="not-home">
      <Header />
      {data && (
        <main>
          <div className="relative">
            <Image
              unoptimized
              src={data.topImage.link}
              className="h-96 lg:h-screen"
              width={0}
              height={0}
              style={{ width: "100%", objectFit: "cover" }}
              alt="About Us"
            />
            <h1 className="text-white absolute top-0 bottom-0 end-0 start-0 flex items-center justify-center lg:text-6xl text-4xl uppercase font-bold">
              About Us
            </h1>
          </div>
          <section className="lg:px-20 px-5 flex lg:flex-row flex-col items-center justify-center w-full mt-20">
            <div className="flex flex-col w-full gap-5 ">
              <h2 className="lg:text-6xl text-4xl lg:me-60 me-0 font-bold text-left">
                {data.firstAbout.title}
              </h2>
              <span className="lg:me-60 me-0">
                {data.firstAbout.description}
              </span>
              <button
                onClick={() => router.push(data.firstAbout.buttonLink)}
                className="border-2 px-10 py-3 border-black uppercase font-bold hover:bg-black hover:text-white transition me-auto"
              >
                {data.firstAbout.buttonName}
              </button>
            </div>
            <div className="w-full lg:my-0 my-10">
              <Image
                src={data.firstAbout.img.link}
                width={0}
                height={0}
                style={{ width: "100%", height: "700px", objectFit: "cover" }}
                alt={data.firstAbout.title}
                unoptimized
              />
            </div>
          </section>
          <section className="lg:px-20 px-5 flex lg:flex-row-reverse flex-col-reverse items-center justify-center w-full  ">
            <div className="flex flex-col w-full gap-5">
              <h2 className="lg:text-6xl text-4xl font-bold lg:ms-60 ms-0">
                {data.secondAbout.title}
              </h2>
              <span className="lg:ms-60 ms-0">
                {data.secondAbout.description}
              </span>
              <button
                onClick={() => router.push(data.secondAbout.buttonLink)}
                className="border-2 px-10 py-3 border-black uppercase font-bold hover:bg-black hover:text-white transition lg:ms-auto me-auto lg:mb-0 mb-5"
              >
                {data.secondAbout.buttonName}
              </button>
            </div>
            <div className="w-full lg:my-0 my-10">
              <Image
                src={data.secondAbout.img.link}
                width={0}
                height={0}
                style={{ width: "100%", height: "700px", objectFit: "cover" }}
                alt={data.secondAbout.title}
                unoptimized
              />
            </div>
          </section>
          <section className="my-20">
            <div className="relative">
              <button
                onClick={handleOpen}
                className="absolute top-0 left-0 bottom-0 right-0 z-50"
              >
                <i className="bi bi-play text-9xl font-bold text-white" />
              </button>
              {data?.videoSection.thumbnail && (
                <Image
                  src={data?.videoSection.thumbnail.link}
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "600px", objectFit: "cover" }}
                  // className="w-full h-1/2"
                  alt="Video"
                  unoptimized
                />
              )}
            </div>
          </section>
          {data?.videoSection.video && (
            <Dialog placeholder="Modal" handler={handleOpen} open={open}>
              <iframe
                src={data?.videoSection.video.link}
                width="100%"
                style={{ width: "100%" }}
                height="500"
                allow="autoplay; fullscreen; picture-in-picture"
              />
            </Dialog>
          )}
        </main>
      )}
      <Footer />
    </div>
  );
}
