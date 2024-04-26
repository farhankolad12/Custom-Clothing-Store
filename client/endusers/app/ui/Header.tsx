"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Collapse } from "@material-tailwind/react";
import { useAuth } from "../context/AuthProvider";
import Authentication from "./Home/Authentication";
import CartCanvas from "./CartCanvas";
import HomeCarousel from "./Home/HomeCarousel";

export default function Header() {
  const [openCart, setOpenCart] = useState(false);
  const [header, setHeader] = useState(true);
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  function handleOpen() {
    setOpen(!open);
  }

  const { currentUser, cartItems, data } = useAuth();

  const openDrawer = () => setOpenCart(true);
  const closeDrawer = () => setOpenCart(false);

  return (
    <div className="flex flex-col ">
      {data?.homePageContent?.headerText && header ? (
        <div
          style={{ backgroundColor: "#eeedeb" }}
          className="flex justify-center text-center w-full items-center py-1 hidden lg:flex gap-10"
        >
          <span className="text-xs text-gray-800">
            {data?.homePageContent?.headerText}
          </span>
          <button onClick={() => setHeader(false)}>
            <i className="bi bi-x-lg" />
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="relative desktop-header">
        <header
          className={`lg:bg-transparent bg-white relative z-50 h-full flex justify-between items-center w-full lg:border-0 border-b  py-5 lg:py-0 px-3 lg:pe-0 lg:ps-3`}
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
              onClick={() => router.push("/wishlist")}
              className=" font-bold bg-transparent hidden lg:block"
            >
              <i className="text-xl bi bi-heart" />
            </button>
            <button
              type="button"
              onClick={openDrawer}
              className=" ms-0 lg:ms-5 text-black lg:text-white font-bold bg-transparent lg:bg-black lg:p-6 p-0"
            >
              <i className=" text-xl bi bi-bag" />
              &nbsp;&nbsp;
              {currentUser ? cartItems?.products?.length : 0}
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
        <div
          // style={{ height: "500px" }}
          className="absolute top-0 h-full left-0 right-0 carousel"
        >
          <HomeCarousel />
        </div>

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
      </div>
      <CartCanvas closeDrawer={closeDrawer} openCart={openCart} />
    </div>
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
