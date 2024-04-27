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
import SearchModel from "./SearchModel";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
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
  const handleSearchOpen = () => setSearchOpen(true);
  const closeSearchOpen = () => setSearchOpen(false);

  return (
    <header className="flex flex-col ">
      {data?.homePageContent?.headerText && header ? (
        <div
          style={{ backgroundColor: "#eeedeb" }}
          className="flex justify-center w-full items-center py-1 hidden lg:flex "
        >
          <h1 className="text-xs text-gray-800">
            {data?.homePageContent?.headerText}
          </h1>
          <button className="ps-20" onClick={() => setHeader(false)}>
            <i className="bi bi-x-lg" />
          </button>
        </div>
      ) : (
        ""
      )}
      <section className="relative desktop-header">
        <nav
          className={`lg:bg-transparent bg-white relative z-50 flex justify-between items-center w-full lg:border-0 border-b py-5 lg:py-0 px-3 lg:pe-0 lg:ps-3`}
        >
          <Logo />
          <ul className="hidden lg:flex gap-12">
            <CustomLink name="Home" to="/" />
            <CustomLink name="Shop" to="/shop" />
            <CustomLink name="About us" to="/about" />
            <CustomLink name="Contact us" to="/contact" />
          </ul>
          <ul className="flex items-center gap-4 lg:gap-4">
            <li>
              <button
                onClick={handleSearchOpen}
                type="button"
                className=" font-bold bg-transparent"
              >
                <i className=" text-xl bi bi-search" />
              </button>
            </li>
            {currentUser ? (
              <li>
                <button
                  className="font-bold bg-transparent"
                  onClick={() => router.push("/profile")}
                >
                  <i className=" text-xl bi bi-person" />
                </button>
              </li>
            ) : (
              <li>
                <Authentication handleOpen={() => handleOpen()} open={open} />
              </li>
            )}
            <li className="hidden lg:block">
              <button
                type="button"
                onClick={() => router.push("/wishlist")}
                className=" font-bold bg-transparent"
              >
                <i className="text-xl bi bi-heart" />
              </button>
            </li>
            <li className="ms-0 lg:ms-5 bg-transparent lg:bg-black">
              <button
                type="button"
                onClick={openDrawer}
                className="text-black lg:text-white font-bold lg:p-6 p-0"
              >
                <i className=" text-xl bi bi-bag" />
                &nbsp;&nbsp;
                {currentUser ? cartItems?.products?.length || 0 : 0}
              </button>
            </li>
            <li className="lg:hidden text-2xl">
              <button
                onClick={() => setMenu((prev) => !prev)}
                type="button"
                className="font-bold"
              >
                <i className=" text-xl bi bi-list" />
              </button>
            </li>
          </ul>
        </nav>
        <section
          // style={{ height: "500px" }}
          className="absolute top-0 h-full left-0 right-0 carousel"
        >
          <HomeCarousel />
        </section>

        <Collapse className="relative z-40" open={menu}>
          <section className="bg-white py-4 px-4">
            <ul className="flex flex-col gap-4">
              <CustomLink name="Home" to="/" />
              <CustomLink name="Shop" to="/shop" />
              <CustomLink name="About us" to="/about" />
              <CustomLink name="Contact us" to="/contact" />
            </ul>
          </section>
        </Collapse>
      </section>
      <CartCanvas closeDrawer={closeDrawer} openCart={openCart} />
      <SearchModel
        closeSearchOpen={closeSearchOpen}
        handleOpen={handleSearchOpen}
        open={searchOpen}
      />
    </header>
  );
}

const CustomLink = ({ to, name }: { to: string; name: string }) => {
  const pathname = usePathname();

  const isPage = pathname === to ? "border-b-2 border-black" : "";

  return (
    <li>
      <Link className={`py-1 text-sm uppercase font-bold ${isPage}`} href={to}>
        {name}
      </Link>
    </li>
  );
};
