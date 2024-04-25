"use client";

import { useGetReq } from "@/app/hooks/useGetReq";
import LoadingSkeleton from "@/app/loading";
import withAuth from "@/app/utils/PrivateRoutes";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data, error, loading } = useGetReq("/user-orders", {
    searchParams,
  });

  if (error) {
    toast.error(error || "Something went wrong");
  }

  return loading ? (
    <LoadingSkeleton />
  ) : data?.orders.length ? (
    <div className="w-full h-full overflow-x-scroll lg:overflow-auto">
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              ID
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Date
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Total Products
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Status
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Total
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              View
            </th>
          </tr>
        </thead>
        <tbody>
          {data.orders.map((order: any, index: number) => {
            // const isLast = index === data.orders.length - 1;
            const classes =
              /* isLast ? "p-4" :  */ "p-4 border-b border-blue-gray-50";

            return (
              <tr>
                <td className={classes}>{order._id}</td>
                <td className={classes}>
                  {new Date(order.paidAt).toLocaleString()}
                </td>
                <td className={classes + " text-center"}>
                  {order.products.length}
                </td>
                <td className={classes}>
                  {order.status[order.status.length - 1].name}
                </td>
                <td className={classes}>
                  {formatCurrency(
                    order.subtotal + order.shippingPrice - order.discountedPrice
                  )}
                </td>
                <td className={classes}>
                  <button
                    onClick={() => router.push(`/profile/orders/${order._id}`)}
                    className="border-2 border-black font-bold uppercase hover:bg-black hover:text-white rounded transition px-4 py-2"
                  >
                    view order
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan={6}
              className="p-4 border-b border-blue-gray-50 text-end"
            >
              <div className="flex justify-between py-2 items-center">
                <div>
                  <strong className="uppercase">
                    showing {data?.startDocument} - {data?.lastDocument} of{" "}
                    {data?.totalDocuments}
                  </strong>
                </div>
                {data && (
                  <div className="flex items-center flex-wrap gap-2">
                    {[...Array(data.totalPages)].map((c, ind) => {
                      return (
                        <button
                          onClick={() =>
                            router.push(`/profile/orders?page=${ind + 1}`)
                          }
                          key={ind}
                          className={`border-2 border-black p-3 transition hover:bg-black hover:text-white rounded ${
                            (!searchParams.get("page") && ind === 0) ||
                            +searchParams?.get("page") === ind + 1
                              ? "bg-black text-white"
                              : ""
                          }`}
                        >
                          {ind + 1}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  ) : (
    <div className="px-6 py-4 bg-gray-300 flex gap-5 lg:flex-row flex-col justify-between items-center">
      <span className="font-bold text-sm uppercase">
        no order has been made yet
      </span>
      <button className="bg-transparent px-5 border border-black uppercase text-sm font-bold hover:bg-black hover:text-white py-4">
        browse products
      </button>
    </div>
  );
}

export default withAuth(Page);
