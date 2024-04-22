"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useGetReq from "../hooks/useGetReq";
import withAuth from "../utils/PrivateRoutes";
import OrderRow from "../ui/orders/OrderRow";
import { useDebouncedCallback } from "use-debounce";
import { FormEvent, useRef, useState } from "react";

function Page() {
  const [makeReq, setMakeReq] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();

  const queryRef = useRef<HTMLInputElement>(null!);
  const statusRef = useRef<HTMLSelectElement>(null!);
  const orderLimits = useRef<HTMLSelectElement>(null!);
  const endDateRef = useRef<HTMLInputElement>(null!);
  const startDateRef = useRef<HTMLInputElement>(null!);
  const paymentMethodRef = useRef<HTMLSelectElement>(null!);

  const {
    data,
    error,
    loading,
    setData: setOrders,
  } = useGetReq("/orders", {
    isAdmin: true,
    searchParams,
    // makeReq,
  });

  //   console.log(data);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    params.set("query", queryRef.current.value);
    params.set("status", statusRef.current.value);
    params.set("order-limits", orderLimits.current.value);
    params.set("method", paymentMethodRef.current.value);
    params.set("start-date", startDateRef.current.value);
    params.set("end-date", endDateRef.current.value);
    params.set("page", "1");

    router.replace(`/orders?${params.toString()}`);

    // setMakeReq(Math.random() * 99999);
  }

  //   const debounced = useDebouncedCallback((q) => {
  // const params = new URLSearchParams(searchParams);
  // params.set("query", q);
  // params.set("page", "1");

  //   router.replace(`/orders?${params.toString()}`);
  // }, 1000);

  return (
    <main className="container">
      <h3 className="my-4 fs-5 fw-bold text-light">Orders</h3>
      <section>
        <form
          onSubmit={handleSubmit}
          className="px-3 py-4 rounded my-4"
          style={{ backgroundColor: "#1f2937" }}
        >
          <div className="d-flex flex-lg-row flex-column align-items-center gap-3">
            <input
              type="text"
              style={{ backgroundColor: "#374151" }}
              className="form-control text-white "
              placeholder="Search by customer name..."
              defaultValue={searchParams.get("query") || ""}
              ref={queryRef}
              //   onChange={(e) => debounced(e.target.value)}
            />
            <select
              ref={statusRef}
              defaultValue={searchParams.get("status")?.toLowerCase() || ""}
              style={{ backgroundColor: "#374151", color: "#fff" }}
              className="form-select"
              id="status"
            >
              <option value="" disabled defaultChecked hidden>
                Status
              </option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancel">Cancel</option>
            </select>
            <select
              ref={orderLimits}
              defaultValue={
                searchParams.get("order-limits")?.toLowerCase() || ""
              }
              style={{ backgroundColor: "#374151", color: "#fff" }}
              className="form-select"
              id="order-limits"
            >
              <option value="" disabled defaultChecked hidden>
                Order Limits
              </option>
              <option value="last-5">Last 5 days orders</option>
              <option value="last-7">Last 7 days orders</option>
              <option value="last-15">Last 15 days orders</option>
              <option value="last-30">Last 30 days orders</option>
            </select>
            <select
              style={{ backgroundColor: "#374151", color: "#fff" }}
              className="form-select"
              ref={paymentMethodRef}
              defaultValue={searchParams.get("method")?.toLowerCase() || ""}
              id="payment-method"
            >
              <option value="" disabled defaultChecked hidden>
                Method
              </option>
              <option value="card">card</option>
              <option value="upi">upi</option>
              <option value="netbanking">netbanking</option>
              <option value="wallet">wallet</option>
            </select>
            <button className="btn btn-success px-5 w-100">
              Download all orders
            </button>
          </div>
          <div className="d-flex flex-lg-row flex-column w-full justify-content-center align-items-end gap-3">
            <div className="d-flex flex-column gap-2 w-100">
              <label htmlFor="start-date">Start Date</label>
              <input
                style={{ backgroundColor: "#374151", color: "#fff" }}
                className="form-control w-100"
                type="date"
                ref={startDateRef}
                defaultValue={
                  searchParams.get("start-date")?.toLowerCase() || ""
                }
                id="start-date"
              />
            </div>
            <div className="d-flex flex-column gap-2 w-100">
              <label htmlFor="end-date">End Date</label>
              <input
                style={{ backgroundColor: "#374151", color: "#fff" }}
                className="form-control w-100"
                ref={endDateRef}
                defaultValue={searchParams.get("end-date")?.toLowerCase() || ""}
                type="date"
                id="end-date"
              />
            </div>
            <button type="submit" className="btn btn-danger px-5 w-100">
              Filter
            </button>
            <button className="btn btn-secondary px-5 w-100">Reset</button>
          </div>
        </form>
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
                <th className="text-secondary">ACTIONS</th>
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
                                router.replace(
                                  `/orders?query=${
                                    searchParams.get("query") || ""
                                  }&page=${ind + 1}`
                                )
                              }
                              key={ind}
                              className={`btn btn-${
                                (!searchParams.get("page") && ind === 0) ||
                                +searchParams?.get("page") === ind + 1
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
      </section>
    </main>
  );
}

export default withAuth(Page);
