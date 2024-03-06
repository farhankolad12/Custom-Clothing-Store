import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-20" style={{ backgroundColor: "#eeedeb" }}>
      <div className="px-10">
        <div className="flex gap-10 lg:flex-row flex-col justify-between items-center pb-20">
          <Image src="/logo.png" alt="Logo" width={200} height={200} />
          <div className="flex lg:flex-row flex-col gap-10">
            <div className="flex justify-between lg:justify-start w-full items-center gap-10 ">
              <i className="bi bi-box2-fill text-6xl" />
              <strong className="uppercase">
                free shipping on first order
              </strong>
            </div>
            <div className="flex justify-between lg:justify-start w-full items-center gap-10 ">
              <i className="bi bi-award text-6xl" />
              <strong className="uppercase">90-day warranty</strong>
            </div>
            <div className="flex justify-between lg:justify-start w-full items-center gap-10 ">
              <i className="bi bi-credit-card text-6xl" />
              <strong className="uppercase">
                NEW PRODUCT OFFERINGS & DEALS
              </strong>
            </div>
          </div>
        </div>
        <div className="container px-5 border-y-2 border-gray-400 py-20 flex lg:flex-row flex-col justify-between gap-10">
          <div className="flex flex-col gap-5">
            <span className="uppercase font-bold">information</span>
            <Link href="/" className="font-bold uppercase text-xs">
              privacy policy
            </Link>
            <Link href="/" className="font-bold uppercase text-xs">
              terms of sale
            </Link>
            <Link href="/" className="font-bold uppercase text-xs">
              contact us
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <span className=" uppercase font-bold">shop</span>
            <Link href="/" className="font-bold uppercase text-xs">
              our store
            </Link>
            <Link href="/" className="font-bold uppercase text-xs">
              shop by category
            </Link>
            <Link href="/" className="font-bold uppercase text-xs">
              sign up for deals
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <span className=" uppercase font-bold">account</span>
            <Link href="/" className="font-bold uppercase text-xs">
              login
            </Link>
            <Link href="/" className="font-bold uppercase text-xs">
              signup
            </Link>
            <Link href="/" className="font-bold uppercase text-xs">
              account
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <span className=" uppercase font-bold">social</span>
            <a target="_blank" href="/" className="font-bold uppercase text-xs">
              <i className="bi bi-instagram" /> Instagram
            </a>
            <a target="_blank" href="/" className="font-bold uppercase text-xs">
              <i className="bi bi-facebook" /> facebook
            </a>
            <a target="_blank" href="/" className="font-bold uppercase text-xs">
              <i className="bi bi-instagram" /> Instagram
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:flex-row justify-between py-20">
          <div className="flex flex-col gap-3">
            <strong className="uppercase">newsletter</strong>
            <p>
              Dunker has all of the best products from all of the top brands.
            </p>
            <div className="w-full relative">
              <input
                type="text"
                placeholder="YOUR EMAIL"
                className="border-0 bg-transparent border-b-2 outline-none border-black w-full"
              />
              <button className="absolute right-2">
                <i className="bi bi-arrow-right" />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <strong className="uppercase">mumbai</strong>
            <strong className="text-xs">+91 9324288793</strong>
            <strong className="text-xs uppercase">
              Kambekar Street Original <br /> Mumbai, MH 400009
            </strong>
            <strong className="text-xs uppercase">MON-SAT: 09:00-19:00</strong>
          </div>
          <div className="flex flex-col gap-5">
            <strong className="uppercase">mumbai</strong>
            <strong className="text-xs">+91 9324288793</strong>
            <strong className="text-xs uppercase">
              Kambekar Street Original <br /> Mumbai, MH 400009
            </strong>
            <strong className="text-xs uppercase">MON-SAT: 09:00-19:00</strong>
          </div>
        </div>
      </div>
      <div
        className="py-10 ps-20"
        style={{
          backgroundImage: "url('/video-img-1.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
      >
        <strong className="uppercase text-grey-300">
          © 2024 Farhan Kolad, ALL RIGHTS RESERVED
        </strong>
      </div>
    </footer>
  );
}
