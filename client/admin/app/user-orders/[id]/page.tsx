"use client";

import useGetReq from "@/app/hooks/useGetReq";
import OrderRow from "@/app/ui/orders/OrderRow";
import withAuth from "@/app/utils/PrivateRoutes";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function Page() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, error, loading } = useGetReq("/admin-user-orders", {
    isAdmin: true,
    id,
    searchParams,
  });

  if (error) {
    toast.error(error);
  }

  return (
    <main className="container">
      <h3 className="my-5 fw-bold text-white    ">Customer Order List</h3>
      <div className="table-responsive">
        <table
          style={{ backgroundColor: "#1f2937" }}
          className="table border border-secondary table-dark"
        >
          <thead>
            <tr>
              <th className="text-secondary">ID</th>
              <th className="text-secondary">TIME</th>
              <th className="text-secondary">CUSTOMER NAME</th>
              <th className="text-secondary">METHOD</th>
              <th className="text-secondary">AMOUNT</th>
              <th className="text-secondary">STATUS</th>
              <th className="text-secondary">INVOICE</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ) : (
              data?.orders?.map((order: any) => {
                return <OrderRow key={order._id} order={order} />;
              }) || (
                <tr>
                  <td>No Data Found!</td>
                </tr>
              )
            )}
            <tr>
              <td colSpan={8}>
                <div className="d-flex justify-content-between py-2 align-items-center">
                  <div>
                    <strong className="text-uppercase">
                      showing {data?.startDocument} - {data?.lastDocument} of{" "}
                      {data?.totalDocuments}
                    </strong>
                  </div>
                  {data && (
                    <div className="d-flex align-items-center flex-wrap gap-2">
                      {[...Array(data.totalPages)].map((c, ind) => {
                        return (
                          <button
                            onClick={() =>
                              router.push(`/user-orders/${id}page=${ind + 1}`)
                            }
                            key={ind}
                            className={`btn btn-${
                              (!searchParams.get("page") && ind === 0) ||
                              +(searchParams?.get("page") || 1) === ind + 1
                                ? ""
                                : "outline-"
                            }success`}
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
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default withAuth(Page);
