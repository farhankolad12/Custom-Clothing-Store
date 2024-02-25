"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Collapse } from "@material-tailwind/react";

export default function Header() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <header className="lg:bg-transparent bg-white flex justify-between items-center lg:p-0 py-4 relative z-50">
        <Logo />
        <div className="hidden lg:flex gap-12">
          <CustomLink name="Home" to="/" />
          <CustomLink name="Shop" to="/shop" />
          <CustomLink name="About us" to="/about" />
          <CustomLink name="Contact us" to="/contact" />
        </div>
        <div className="flex gap-6 lg:gap-4">
          <button type="button" className="text-lg bg-transparent">
            <i className="bi bi-search" />
          </button>
          <button
            type="button"
            className="text-lg bg-transparent hidden lg:block"
          >
            <i className="bi bi-person" />
          </button>
          <button
            type="button"
            className="text-lg bg-transparent hidden lg:block"
          >
            <i className="bi bi-heart" />
          </button>
          <button
            type="button"
            className="text-lg ms-0 lg:ms-5 text-black lg:text-white bg-transparent lg:bg-black lg:p-6 p-0"
          >
            <i className="bi bi-bag" /> 0
          </button>
          <button
            onClick={() => setMenu((prev) => !prev)}
            type="button"
            className="lg:hidden text-2xl"
          >
            <i className="bi bi-list" />
          </button>
        </div>
      </header>
      <Collapse className="relative z-40" open={menu}>
        <div className="bg-white py-4 px-4">
          <div className="flex flex-col gap-4">
            <CustomLink name="Home" to="/" />
            <CustomLink name="Shop" to="/shop" />
            <CustomLink name="About us" to="/about" />
            <CustomLink name="Contact us" to="/contact" />
          </div>
        </div>
      </Collapse>
    </>
  );
}

const CustomLink = ({ to, name }: { to: string; name: string }) => {
  const pathname = usePathname();

  const isPage = pathname === to ? "border-b-2 border-black" : "";

  return (
    <Link className={`py-1 text-xs uppercase font-bold ${isPage}`} href={to}>
      {name}
    </Link>
  );
};
