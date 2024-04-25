"use client";

import { useGetReq } from "@/app/hooks/useGetReq";
import LoadingSkeleton from "@/app/loading";
import InvoicePDF from "@/app/ui/Orders/InvoicePDF";
import withAuth from "@/app/utils/PrivateRoutes";
import { formatCurrency } from "@/app/utils/formatCurrency";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import html2pdf from "html2pdf.js";
import { Spinner } from "@material-tailwind/react";

function Page() {
  const [dLoading, setDLoading] = useState(false);

  const { id } = useParams();
  const invoiceRef = useRef<HTMLDivElement>(null!);

  const {
    data: order,
    error,
    loading,
  } = useGetReq("/user-order", {
    id,
  });

  if (error) {
    toast.error(error || "Something went wrong!");
  }

  async function handleDownload() {
    setDLoading(true);
    await html2pdf()
      .set({
        filename: `${order._id}_${order.address.fname}_${order.address.lname}`,
        image: { type: "jpeg", quality: 1, margin: 1 },
      })
      .from(invoiceRef.current)
      .save();

    setDLoading(false);
  }

  return loading ? (
    <LoadingSkeleton />
  ) : order ? (
    <div>
      <div className="flex justify-between lg:items-end flex-col lg:flex-row gap-5">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-2xl">Order Details</h3>
          <div className="flex flex-col lg:flex-row gap-2">
            <span>Ordered on {new Date(order.paidAt).toLocaleString()}</span>
            <span className="hidden lg:block">|</span>
            <span>Order# {order._id}</span>
          </div>
        </div>
        <button
          disabled={dLoading}
          onClick={handleDownload}
          className="border-2 flex justify-center border-black hover:bg-black hover:text-white transition rounded px-5 py-2"
        >
          {dLoading ? (
            <Spinner className="w-6 h-6" />
          ) : (
            <>
              Invoice &nbsp; <i className="bi bi-cloud-download" />
            </>
          )}
        </button>
      </div>
      <div className="w-full h-full overflow-x-scroll lg:overflow-auto my-12">
        <div className="flex flex-col items-end lg:flex-row justify-between gap-4  mb-3">
          <h3 className="font-bold text-xl">Products Ordered</h3>
          {order.status[order.status.length - 1].name === "Delivered" && (
            <button className="border-2 border-black hover:bg-black hover:text-white transition rounded px-5 py-2">
              Write a review
            </button>
          )}
        </div>
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                SR
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Product
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Quantity
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Item Price
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product: any, i: number) => {
              return (
                <tr>
                  <td className="p-4 border-b border-blue-gray-50">{i + 1}</td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={product.images[0].link}
                        width={100}
                        height={100}
                        alt="Product"
                      />
                      <div className="flex flex-col gap-1">
                        <span>{product.name}</span>
                        {product.selectedCombination.combinations.map(
                          (combination: any) => {
                            return (
                              <span>
                                {combination.parentName}: {combination.variant}
                              </span>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </td>
                  <td
                    className={
                      "p-4 border-b border-blue-gray-50" + " text-center"
                    }
                  >
                    {product.quantity}
                  </td>
                  <td className={"p-4 border-b border-blue-gray-50"}>
                    {formatCurrency(product.selectedCombination.salePrice)}
                  </td>
                  <td className={"p-4 border-b border-blue-gray-50"}>
                    {formatCurrency(
                      product.selectedCombination.salePrice * product.quantity
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full h-full overflow-x-scroll lg:overflow-auto my-12">
        <h3 className="font-bold text-xl mb-3">Track Your Order</h3>
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Status
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Message
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {order.status.map((st: any) => {
              return (
                <tr>
                  <td className="p-4 border-b border-blue-gray-50">
                    {st.name}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {st.message}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {new Date(st.changedAt).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border-2 flex flex-col lg:flex-row gap-4 justify-between rounded p-5">
        <div className="flex flex-col gap-1 w-full">
          <span className="font-bold">Shipping Address</span>
          <span>{order.address.streetAddr1}</span>
          {order.address.streetAddr2 && (
            <span>{order.address.streetAddr2}</span>
          )}
          <span>
            {order.address.city}, {order.address.state} {order.address.zipCode}
          </span>
          <span>{order.address.country}</span>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <span className="font-bold">Payment method</span>
          <span>{order.method}</span>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span className="font-bold mb-3">Order Summary</span>
          <div className="flex justify-between">
            <span>Item(s) Subtotal:</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatCurrency(order.shippingPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discounted price</span>
            <span>-{formatCurrency(order.discountedPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total</span>
            <span>
              {formatCurrency(
                order.subtotal + order.shippingPrice - order.discountedPrice
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="hidden">
        <InvoicePDF invoiceRef={invoiceRef} order={order} />
      </div>
    </div>
  ) : (
    notFound()
  );
}

export default withAuth(Page);
