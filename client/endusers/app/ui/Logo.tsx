"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthProvider";
import { Typography } from "@material-tailwind/react";

export default function Logo() {
  const { data, homePageContentLoading } = useAuth();

  return homePageContentLoading ? (
    <div className="animate-pulse flex justify-center items-center">
      <Typography
        placeholder=""
        as="div"
        variant="h1"
        className="lg:w-36 lg:h-28 w-[140px] h-[50px] rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
    </div>
  ) : (
    <div>
      <Link shallow={true} className="bg-transparent" href="/">
        <Image
          unoptimized
          loading="eager"
          quality={100}
          src={data?.homePageContent.logo?.link || "/logo.png"}
          alt="Logo"
          priority={true}
          title="Logo"
          className="lg:w-36 lg:h-28 w-[160px] ms-5 h-[50px] object-cover"
          width={0}
          height={0}
        />
      </Link>
    </div>
  );
}
