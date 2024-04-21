import { useAuth } from "@/app/context/AuthProvider";
import usePostReq from "@/app/hooks/usePostReq";
import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function CheckoutButton({ isCoupon }: { isCoupon: boolean }) {
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
    try {
      setLoading(true);
      const res = await execute({});

      if (!res.success) {
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
        name: "TeeVerse", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: res.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async (response: any) => {
          const res = await _execute(response);

          if (!res?.success) {
            toast.error(res.message || _error || "Something went wrong");
          }

          setCartItems({});
          router.push("/profile");
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
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", (response: any) => {
        console.log(response);
        toast.error(response.error.description);
        toast.error(response.error.reason);
      });
      rzp1.open();
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
