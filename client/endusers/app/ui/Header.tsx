"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  Collapse,
  Dialog,
  DialogHeader,
  Drawer,
  IconButton,
} from "@material-tailwind/react";
import { useAuth } from "../context/AuthProvider";
import Authentication from "./Home/Authentication";
import CartCanvas from "./CartCanvas";

export default function Header() {
  const [openCart, setOpenCart] = useState(false);
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  function handleOpen() {
    setOpen(!open);
  }

  const { currentUser } = useAuth();

  const openDrawer = () => setOpenCart(true);
  const closeDrawer = () => setOpenCart(false);

  return (
    <>
      <header
        className={`bg-transparent flex justify-between items-center lg:ps-5 lg:pt-0 pt-6 absolute top-0 w-full`}
      >
        <Logo />
        <div className="hidden lg:flex gap-12">
          <CustomLink name="Home" to="/" />
          <CustomLink name="Shop" to="/shop" />
          <CustomLink name="About us" to="/about" />
          <CustomLink name="Contact us" to="/contact" />
        </div>
        <div className="flex gap-6 lg:gap-4">
          <button type="button" className=" font-bold bg-transparent">
            <i className=" text-xl bi bi-search" />
          </button>
          {currentUser ? (
            <button
              className="font-bold bg-transparent"
              onClick={() => router.push("/profile")}
            >
              <i className=" text-xl bi bi-person" />
            </button>
          ) : (
            <Authentication handleOpen={() => handleOpen()} open={open} />
          )}
          <button
            type="button"
            className=" font-bold bg-transparent hidden lg:block"
          >
            <i className="text-xl bi bi-heart" />
          </button>
          <button
            type="button"
            onClick={openDrawer}
            className=" ms-0 lg:ms-5 text-black lg:text-white font-bold bg-transparent lg:bg-black lg:p-6 p-0"
          >
            <i className=" text-xl bi bi-bag" /> 0
          </button>
          <button
            onClick={() => setMenu((prev) => !prev)}
            type="button"
            className="font-bold lg:hidden text-2xl"
          >
            <i className=" text-xl bi bi-list" />
          </button>
        </div>
      </header>
      <Collapse className="relative z-40 mt-20" open={menu}>
        <div className="bg-white py-4 px-4">
          <div className="flex flex-col gap-4">
            <CustomLink name="Home" to="/" />
            <CustomLink name="Shop" to="/shop" />
            <CustomLink name="About us" to="/about" />
            <CustomLink name="Contact us" to="/contact" />
          </div>
        </div>
      </Collapse>
      <CartCanvas closeDrawer={closeDrawer} openCart={openCart} />
    </>
  );
}

const CustomLink = ({ to, name }: { to: string; name: string }) => {
  const pathname = usePathname();

  const isPage = pathname === to ? "border-b-2 border-black" : "";

  return (
    <Link className={`py-1 text-sm uppercase font-bold ${isPage}`} href={to}>
      {name}
    </Link>
  );
};
