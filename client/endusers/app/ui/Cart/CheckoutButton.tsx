import { useAuth } from "@/app/context/AuthProvider";
import usePostReq from "@/app/hooks/usePostReq";
import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { Ref, RefObject, useState } from "react";
import { toast } from "react-toastify";

declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    Razorpay: any;
  }
}

export default function CheckoutButton({
  isCoupon,
  fnameRef,
  lnameRef,
  countryRef,
  streetAddr1Ref,
  streetAddr2Ref,
  cityRef,
  stateRef,
  zipCodeRef,
  phoneRef,
  emailRef,
}: {
  isCoupon: boolean;
  fnameRef: RefObject<HTMLInputElement>;
  lnameRef: RefObject<HTMLInputElement>;
  countryRef: RefObject<HTMLInputElement>;
  streetAddr1Ref: RefObject<HTMLInputElement>;
  streetAddr2Ref: RefObject<HTMLInputElement>;
  cityRef: RefObject<HTMLInputElement>;
  stateRef: RefObject<HTMLInputElement>;
  zipCodeRef: RefObject<HTMLInputElement>;
  phoneRef: RefObject<HTMLInputElement>;
  emailRef: RefObject<HTMLInputElement>;
}) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { error, execute } = usePostReq("/payment/order");
  const {
    error: _error,
    execute: _execute,
    loading: _loading,
  } = usePostReq("/payment/authorize");
  const { cartItems, currentUser, setCartItems } = useAuth();

  async function handleCheckout() {
    const fname = fnameRef.current?.value;
    const lname = lnameRef.current?.value;
    const country = countryRef.current?.value;
    const streetAddr1 = streetAddr1Ref.current?.value;
    const streetAddr2 = streetAddr2Ref.current?.value;
    const city = cityRef.current?.value;
    const state = stateRef.current?.value;
    const zipCode = zipCodeRef.current?.value;
    const phone = phoneRef.current?.value;
    const email = emailRef.current?.value;

    if (
      fname === "" ||
      lname === "" ||
      country === "" ||
      streetAddr1 === "" ||
      city === "" ||
      state === "" ||
      zipCode === "" ||
      phone === "" ||
      email === ""
    ) {
      return toast.error("Please complete required field!");
    }

    try {
      setLoading(true);
      const res = await execute({});

      if (!res?.success) {
        return toast.error(res.message || error || "Something went wrong!");
      }

      const options = {
        key: process.env.NEXT_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: isCoupon
          ? cartItems.subTotalPrice * 100 +
            cartItems.shippingPrice * 100 -
            (cartItems.coupon.type === "fixed"
              ? cartItems.coupon.discount * 100
              : (cartItems.coupon.discount / 100) *
                cartItems.subTotalPrice *
                100)
          : (cartItems.subTotalPrice + cartItems.shippingPrice) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Essentials By LA", //your business name
        description: "Test Transaction",
        image: "https://essentialsbyla.com/logo.png",
        order_id: res.orderId,

        handler: async (response: any) => {
          const res = await _execute({
            ...response,
            address: {
              fname,
              lname,
              country,
              streetAddr1,
              streetAddr2,
              city,
              state,
              zipCode,
              phone,
              email,
            },
          });

          if (!res?.success) {
            setLoading(false);
            return toast.error(res.message || _error || "Something went wrong");
          }

          setCartItems({
            coupon: {},
            shippingPrice: 0,
            products: [],
            subTotalPrice: 0,
          });
          setLoading(false);
          toast.success("Order succesfully placed!");
          router.push("/profile/orders");
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: currentUser?.fname + " " + currentUser?.lname, //your customer's name
          email: currentUser?.email,
          contact: currentUser?.phone, //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#000",
        },
      };
      const rzp1 = new window.Razorpay(options);

      rzp1.close();

      rzp1.on("payment.failed", (response: any) => {
        setLoading(false);
        toast.error(response.error.description);
        toast.error(response.error.reason);
      });
      rzp1.open();
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      return toast.error(err || "Something went wrong!");
    }
  }

  return (
    <button
      disabled={loading}
      onClick={handleCheckout}
      className="py-4 border-2 border-black flex justify-center hover:bg-black hover:text-white transition uppercase font-bold"
    >
      {loading ? <Spinner className="w-6 h-6" /> : "Proceed to checkout"}
    </button>
  );
}
