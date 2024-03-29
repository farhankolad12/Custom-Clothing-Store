import { Gochi_Hand } from "next/font/google";
import Link from "next/link";

const gochi = Gochi_Hand({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export default function FirstBanner() {
  return (
    <section className="container lg:mx-auto px-5 pt-20">
      <div
        style={{ height: "700px" }}
        className="flex lg:flex-row flex-col w-full lg:flex-row"
      >
        <Link
          href="/"
          style={{
            backgroundImage: "url('/main-home-product-1.jpg')",
            // backgroundPosition: "center",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
          }}
          className="featured-box relative lg:h-auto h-96 lg:w-1/2 w-full group"
        >
          <h1
            className={`absolute text-5xl top-14 lg:text-left text-center left-0 right-0 lg:left-10 ${gochi.className}`}
          >
            Featured
          </h1>
          <button className="bg-white w-14 h-14 flex items-center justify-center rounded-full absolute hover:bg-black hover:text-white animate__animated hover:animate__fadeIn bottom-4 right-6 lg:right-16 lg:left-auto lg:top-auto lg:bottom-24 z-50">
            <i className="bi bi-bag text-lg " />
          </button>
          <div className="flex-col justify-between animate__animated animate__slideInUp absolute top-0 bottom-0 left-0 right-0 lg:bottom-20 lg:w-1/2 w-full lg:h-1/2 h-full lg:right-10 lg:top-auto lg:left-auto bg-white p-5 hidden group-hover:flex">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <span className="mb-1 text-xs">SALOMON</span>
                <h3 className="font-bold">CASUAL T-SHIRT</h3>
                <span>Fashion</span>
              </div>

              <button className="bg-white w-14 h-14 flex items-center justify-center rounded-full hover:bg-black hover:text-white animate__animated hover:animate__fadeIn">
                <i className="bi bi-heart text-lg " />
              </button>
            </div>
            <div>
              <h1 className="ms-auto font-bold text-4xl">$180</h1>
            </div>
          </div>
        </Link>
        <Link
          href="/"
          style={{
            backgroundImage: "url('/main-home-product-2.jpg')",
            // backgroundPosition: "center",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
          }}
          className="newcollection-box relative lg:h-full h-96 lg:w-1/2 w-full group"
        >
          <h1
            className={`absolute text-5xl top-14 lg:text-left text-center left-0 right-0 lg:left-10 ${gochi.className}`}
          >
            New Collection
          </h1>
          <button className="bg-white w-14 h-14 flex items-center justify-center rounded-full absolute hover:bg-black hover:text-white animate__animated hover:animate__fadeIn bottom-4 right-6 lg:right-16 lg:left-auto lg:top-auto lg:bottom-24 z-50">
            <i className="bi bi-bag text-lg " />
          </button>
          <div className="flex-col justify-between animate__animated animate__slideInUp absolute top-0 bottom-0 left-0 right-0 lg:bottom-20 lg:w-1/2 w-full lg:h-1/2 h-full lg:right-10 lg:top-auto lg:left-auto bg-white p-5 hidden group-hover:flex">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <span className="mb-1 text-xs">NIKE | ADIDAS</span>
                <h3 className="font-bold">Adidas Sneakers</h3>
                <span>Fashion</span>
              </div>

              <button className="bg-white w-14 h-14 flex items-center justify-center rounded-full hover:bg-black hover:text-white animate__animated hover:animate__fadeIn">
                <i className="bi bi-heart text-lg " />
              </button>
            </div>
            <div>
              <h1 className="ms-auto font-bold text-4xl">$90</h1>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
