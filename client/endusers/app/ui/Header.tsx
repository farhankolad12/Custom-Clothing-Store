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
import CategoryDrawer from "./Home/CategoryDrawer";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [menu, setMenu] = useState(false);

  const router = useRouter();

  const { currentUser, data, cartItems } = useAuth();

  const openDrawer = () => setOpenCart(true);
  const closeDrawer = () => setOpenCart(false);
  const handleSearchOpen = () => setSearchOpen(true);
  const closeSearchOpen = () => setSearchOpen(false);

  return (
    <>
      <header className="flex flex-col">
        <div className="flex justify-center bg-[#2f3324] w-full items-center py-2 px-10 text-center">
          <span className="text-white lg:text-sm text-xs">
            {data?.homePageContent?.headerText
              ? data?.homePageContent?.headerText
              : "Loading..."}
          </span>
        </div>

        <section className="desktop-header">
          <nav
            className={`bg-white flex justify-between lg:px-[12rem] lg:items-center w-full lg:py-0 py-3 lg:border-0 border-b px-[1rem]`}
          >
            <div className="lg:hidden flex">
              <button
                onClick={() => setMenu((prev) => !prev)}
                type="button"
                className="font-bold"
              >
                <i className="text-3xl bi bi-list" />
              </button>
            </div>
            <div className="flex lg:gap-[2rem] gap-[0rem] items-center">
              <Logo />
              <ul className="hidden lg:flex gap-5">
                {data?.categories.map((category: any) => {
                  return (
                    <CustomLink
                      key={category._id}
                      name={category.name}
                      to={`/collections/${category.name}`}
                    />
                  );
                })}
                <CustomLink name="Shop" to="/shop" />
                <CustomLink name="Blogs" to="/blogs" />
              </ul>
            </div>
            <ul className="flex justify-center items-center gap-3">
              <li>
                <button
                  onClick={handleSearchOpen}
                  type="button"
                  className=" font-bold bg-transparent"
                >
                  <i className="text-xl bi bi-search hover:text-2xl transition" />
                </button>
              </li>
              <li className="lg:flex hidden">
                <Link
                  className="font-bold bg-transparent"
                  href={currentUser ? "/profile" : "/login"}
                >
                  <i className=" text-xl bi bi-person hover:text-2xl transition" />
                </Link>
              </li>
              <li className="relative">
                <button
                  type="button"
                  onClick={openDrawer}
                  className="text-black"
                >
                  <i className="text-xl bi bi-bag hover:text-2xl transition" />
                  {currentUser ? (
                    <span className="absolute right-[-.3rem] bottom-0 z-49 bg-gray-500 rounded-full w-4 h-4  text-white text-xs flex justify-center items-center">
                      {cartItems?.products?.length}
                    </span>
                  ) : (
                    ""
                  )}
                </button>
              </li>
            </ul>
          </nav>
          {/* <section className="h-full carousel">
            <HomeCarousel />
          </section> */}

          <CategoryDrawer open={menu} closeDrawer={() => setMenu(false)} />
        </section>
        <SearchModel
          closeSearchOpen={closeSearchOpen}
          handleOpen={handleSearchOpen}
          open={searchOpen}
        />
        <nav className="lg:hidden md:hidden flex fixed bottom-0 left-0 right-0 bg-white px-3 gap-4 z-50 justify-between items-center w-full border-t border-2 border-gray-200">
          <CustomMobileLink name="Home" to="/" icon="house" />
          <CustomMobileLink icon="grid" name="Collections" to="/collections" />
          <CustomMobileLink
            icon="person"
            name={currentUser ? "Account" : "Login"}
            to={currentUser ? "/profile" : "/login"}
          />
          <CustomMobileLink icon="chat-left-text" name="Blogs" to="/blogs" />
        </nav>
      </header>
      <CartCanvas closeDrawer={closeDrawer} openCart={openCart} />
    </>
  );
}

export const CustomLink = ({ to, name }: { to: string; name: string }) => {
  const pathname = usePathname();

  const isPage = pathname === to ? "border-b-2 border-black" : "";

  return (
    <li className="transition text-[#727273] hover:underline hover:underline-offset-4">
      <Link
        shallow={true}
        className={`py-1 lg:text-sm text-xl ${isPage}`}
        href={to}
      >
        {name}
      </Link>
    </li>
  );
};

const CustomMobileLink = ({
  to,
  name,
  icon,
}: {
  to: string;
  name: string;
  icon: string;
}) => {
  const pathname = usePathname();

  const isPage = pathname === to ? "border-t-2 border-black" : "";
  return (
    <Link
      shallow={true}
      href={to}
      className={`${isPage} py-4 flex flex-col gap-2 items-center justify-center`}
    >
      <i className={`bi bi-${icon}${isPage ? "-fill" : ""} `} />
      <span className={`text-sm ${isPage ? "font-bold" : ""} `}>{name}</span>
    </Link>
  );
};
