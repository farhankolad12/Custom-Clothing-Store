"use client";

import { useAuth } from "@/app/context/AuthProvider";
import { Dialog, DialogBody } from "@material-tailwind/react";
import Image from "next/image";
import React, { useState } from "react";

export default function Video() {
  const [open, setOpen] = useState(false);

  const { data } = useAuth();

  function handleOpen() {
    setOpen(!open);
  }
  return (
    <>
      <section>
        <div className="relative">
          <button
            onClick={handleOpen}
            className="absolute top-0 left-0 bottom-0 right-0 z-50"
          >
            <i className="bi bi-play text-9xl font-bold text-white" />
          </button>
          {data?.homePageContent?.videoSection.thumbnailImg && (
            <Image
              src={data?.homePageContent?.videoSection.thumbnailImg.link}
              width={0}
              height={0}
              style={{ width: "100%", height: "600px" }}
              // className="w-full h-1/2"
              alt="Video"
              unoptimized
            />
          )}
        </div>
      </section>
      {data?.homePageContent?.videoSection.video && (
        <Dialog placeholder="Modal" handler={handleOpen} open={open}>
          <iframe
            src={data?.homePageContent?.videoSection.video.link}
            width="100%"
            style={{ width: "100%" }}
            height="500"
            allow="autoplay; fullscreen; picture-in-picture"
          />
        </Dialog>
      )}
    </>
  );
}
