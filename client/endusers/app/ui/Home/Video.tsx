"use client";

import { Dialog, DialogBody } from "@material-tailwind/react";
import Image from "next/image";
import React, { useState } from "react";

export default function Video() {
  const [open, setOpen] = useState(false);

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
          <Image
            src="/video-img-1.jpg"
            width={0}
            height={0}
            className="w-full lg:h-full h-96"
            alt="Video"
            unoptimized
          />
        </div>
      </section>
      <Dialog placeholder="Modal" handler={handleOpen} open={open}>
        <iframe
          src="https://player.vimeo.com/video/529300981?h=1154554dda"
          width="100%"
          style={{ width: "100%" }}
          height="500"
          allow="autoplay; fullscreen; picture-in-picture"
        />
      </Dialog>
    </>
  );
}
