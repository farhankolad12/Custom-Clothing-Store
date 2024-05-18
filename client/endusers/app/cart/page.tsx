"use client";

import Link from "next/link";
import Header from "../ui/Header";
import withAuth from "../utils/PrivateRoutes";
import Footer from "../ui/Footer";
import { useAuth } from "../context/AuthProvider";
import { ProductType } from "../definations";
import { formatCurrency } from "../utils/formatCurrency";
import CartRow from "../ui/Cart/CartRow";
import { useEffect, useRef, useState } from "react";
import usePostReq from "../hooks/usePostReq";
import { toast } from "react-toastify";
import CheckoutButton from "../ui/Cart/CheckoutButton";
import LoadingSkeleton from "../loading";
import { useRouter } from "next/navigation";
import { Spinner } from "@material-tailwind/react";

function Page() {
  const [loadingCode, setLoadingCode] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);

  const router = useRouter();
  const { cartItems, setCartItems, currentUser } = useAuth();
  const { error, execute, loading } = usePostReq("/check-code");
  // const {} = useGetReq("/check-code", {
  //   code: cartItems.coupon
  // })

  const fnameRef = useRef<HTMLInputElement>(null!);
  const lnameRef = useRef<HTMLInputElement>(null!);
  const countryRef = useRef<HTMLInputElement>(null!);
  const streetAddr1Ref = useRef<HTMLInputElement>(null!);
  const streetAddr2Ref = useRef<HTMLInputElement>(null!);
  const cityRef = useRef<HTMLInputElement>(null!);
  const stateRef = useRef<HTMLInputElement>(null!);
  const zipCodeRef = useRef<HTMLInputElement>(null!);
  const phoneRef = useRef<HTMLInputElement>(null!);
  const emailRef = useRef<HTMLInputElement>(null!);
  const codeRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    setLoadingCode(true);
    if (cartItems?.coupon) {
      (async () => {
        await fetch(process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/check-code", {
          body: JSON.stringify({ code: cartItems.coupon?.code }),
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(async (res1) => {
            const res = await res1.json();

            if (!res?.success) {
              setIsValidCode(false);
              return setCartItems((prev: any) => {
                return {
                  ...prev,
                  coupon: {},
                  discountedPrice: 0,
                };
              });
            }

            setIsValidCode(true);
          })
          .finally(() => setLoadingCode(false))
          .catch((err) => toast.error(err || "Something went wrong!"));
      })();
    }
    setLoadingCode(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkCode() {
    try {
      const res = await execute({
        code: codeRef.current.value,
      });

      if (!res?.success) {
        return toast.error(res.message || error || "Something went wrong!");
      }

      setCartItems((prev: any) => {
        return {
          ...prev,
          coupon: res.coupon,
          discountedPrice:
            res.coupon?.type === "fixed"
              ? res.coupon?.discount
              : (res.coupon?.discount / 100) * prev.subTotalPrice,
        };
      });

      return toast.success(`${res?.coupon.name} code added`);
    } catch (err: any) {
      console.log(err);
      toast.error(err || "Something went wrong!");
    }
  }

  return (
    <div className="not-home">
      <Header />
      {loadingCode ? (
        <LoadingSkeleton />
      ) : (
        <main className="px-10 my-5">
          <div className="flex gap-2">
            <Link
              shallow={true}
              href="/"
              className="text-xs uppercase text-gray-500"
            >
              home
            </Link>
            <span className="text-xs uppercase">|</span>
            <span className="text-xs uppercase">cart</span>
          </div>
          {cartItems?.products.length ? (
            <div className="my-20">
              <div className="overflow-x-auto">
                <table className="w-full min-w-max table-auto text-left ">
                  <thead>
                    <tr>
                      <th className="border-b-2 text-xs uppercase p-4 text-center">
                        Product
                      </th>
                      <th className="border-b-2  text-xs uppercase p-4">
                        Price
                      </th>
                      <th className="border-b-2 text-xs uppercase p-4">
                        Quantity
                      </th>
                      <th className="border-b-2 text-xs uppercase p-4">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems?.products.map(
                      (product: ProductType, i: number) => {
                        return <CartRow key={product._id} product={product} />;
                      }
                    )}
                  </tbody>
                </table>
              </div>
              <div className="my-10 flex lg:flex-row justify-between items-start flex-col gap-10">
                <div className="flex flex-col gap-10 w-full">
                  <h1 className="text-2xl font-bold uppercase">
                    billing details
                  </h1>
                  <div className="flex flex-col w-full gap-3">
                    <label htmlFor="fname">First name *</label>
                    <input
                      defaultValue={currentUser?.fname}
                      type="text"
                      ref={fnameRef}
                      id="fname"
                      className="border-b-2 border-black outline-none"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-3">
                    <label htmlFor="lname">Last name *</label>
                    <input
                      ref={lnameRef}
                      defaultValue={currentUser?.lname}
                      type="text"
                      id="lname"
                      className="border-b-2 border-black outline-none"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-3">
                    <label htmlFor="country">Country / Region *</label>
                    <input
                      defaultValue="India"
                      type="text"
                      ref={countryRef}
                      id="country"
                      placeholder="India (IN)"
                      className="border-b-2 border-black outline-none"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-3">
                    <label htmlFor="street-addr">Street address *</label>
                    <input
                      // defaultValue="India"
                      placeholder="HOUSE NUMBER AND STREET NAME"
                      type="text"
                      ref={streetAddr1Ref}
                      id="street-addr"
                      className="border-b-2 border-black outline-none"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-3">
                    <label htmlFor="street-addr2"></label>
                    <input
                      // defaultValue="India"
                      type="text"
                      ref={streetAddr2Ref}
                      placeholder="APARTMENT, SUITE, UNIT, ETC. (OPTIONAL)"
                      id="street-addr2"
                      className="border-b-2 border-black outline-none"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-3">
                    <label htmlFor="City">Town / City * </label>
                    <input
                      // defaultValue="India"
                      type="text"
                      ref={cityRef}
                      placeholder="Mumbai"
                      id="City"
                      className="border-b-2 border-black outline-none"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-3">
                    <label htmlFor="State">State</label>
                    <input
                      // defaultValue="India"
                      type="text"
                      ref={stateRef}
                      placeholder="MH"
                      id="State"
                      className="border-b-2 border-black outline-none"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-3">
                    <label htmlFor="zip-code">Zip Code</label>
                    <input
                      // defaultValue="India"
                      type="text"
                      placeholder="400009"
                      id="zip-code"
                      ref={zipCodeRef}
                      className="border-b-2 border-black outline-none"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-3">
                    <label htmlFor="phone">Phone</label>
                    <input
                      defaultValue={currentUser?.phone || ""}
                      type="text"
                      placeholder="8524513697"
                      id="phone"
                      ref={phoneRef}
                      className="border-b-2 border-black outline-none"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-3">
                    <label htmlFor="email">Email</label>
                    <input
                      defaultValue={currentUser?.email || ""}
                      type="text"
                      ref={emailRef}
                      placeholder="xyz@abc.com"
                      id="email"
                      className="border-b-2 border-black outline-none"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-6">
                  <div className="flex lg:flex-row justify-end flex-col gap-4 w-full">
                    <input
                      ref={codeRef}
                      type="text"
                      placeholder="COUPON CODE"
                      className="bg-transparent border-b-2 border-black p-0 py-4 outline-none"
                    />
                    <button
                      onClick={checkCode}
                      className="px-5 py-4 border-2 border-black hover:bg-black hover:text-white transition uppercase flex justify-center"
                    >
                      {loading ? (
                        <Spinner className="w-6 h-6" />
                      ) : (
                        "apply coupon"
                      )}
                    </button>
                  </div>
                  <div className="border-b-2 flex justify-between pb-4">
                    <strong>Shipping Price:</strong>
                    <strong>{formatCurrency(cartItems.shippingPrice)}</strong>
                  </div>
                  <div className="border-b-2 flex justify-between pb-4">
                    <strong>Sub Total:</strong>
                    <strong>{formatCurrency(cartItems.subTotalPrice)}</strong>
                  </div>
                  <div className="border-b-2 flex justify-between pb-4">
                    <strong>Discounted Price:</strong>
                    <strong className="d-flex gap-2">
                      {cartItems.coupon?.type === "percentage" ? (
                        <>
                          <span className="bg-black text-white px-4 py-2 rounded">
                            -{cartItems.coupon.discount}%
                          </span>
                          <span className="ms-2">
                            {formatCurrency(cartItems.discountedPrice)}
                          </span>
                        </>
                      ) : (
                        formatCurrency(cartItems.discountedPrice)
                      )}
                    </strong>
                  </div>
                  <div className="border-b-2 flex justify-between pb-4">
                    <strong>Total Price:</strong>
                    <strong>
                      {formatCurrency(
                        cartItems.shippingPrice +
                          cartItems.subTotalPrice -
                          cartItems.discountedPrice
                      )}
                    </strong>
                  </div>
                  <CheckoutButton
                    fnameRef={fnameRef}
                    lnameRef={lnameRef}
                    countryRef={countryRef}
                    streetAddr1Ref={streetAddr1Ref}
                    streetAddr2Ref={streetAddr2Ref}
                    cityRef={cityRef}
                    stateRef={stateRef}
                    zipCodeRef={zipCodeRef}
                    phoneRef={phoneRef}
                    emailRef={emailRef}
                    isCoupon={isValidCode}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="my-20">
              <div className="bg-gray-300 p-10">
                <h1 className="font-bold uppercase">your cart is empty</h1>
              </div>
              <div className="flex justify-center w-full my-10">
                <button
                  className="border-2 px-10 py-3 border-black uppercase font-bold hover:bg-black hover:text-white transition"
                  onClick={() => router.push("/shop")}
                >
                  return to shop
                </button>
              </div>
            </div>
          )}
        </main>
      )}
      <Footer />
    </div>
  );
}

export default withAuth(Page);
