"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthProvider";

export default function Logo() {
  const { data, homePageContentLoading } = useAuth();

  return homePageContentLoading ? (
    "..."
  ) : (
    <div>
      <Link
        shallow={true}
        style={{
          backgroundColor: "transparent",
        }}
        href="/"
      >
        <Image
          unoptimized
          quality={100}
          src={data?.homePageContent.logo?.link || "/logo.png"}
          alt="Logo"
          title="Logo"
          className="lg:w-36 lg:h-28 w-[140px] h-[50px] object-cover"
          width={0}
          height={0}
        />
      </Link>
    </div>
  );
}
