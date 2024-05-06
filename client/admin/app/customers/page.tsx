"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import useGetReq from "../hooks/useGetReq";
import withAuth from "../utils/PrivateRoutes";
import Link from "next/link";

function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { error, data, loading } = useGetReq("/customers", {
    isAdmin: true,
    searchParams,
  });

  const debounced = useDebouncedCallback((q) => {
    const params = new URLSearchParams(searchParams);
    params.set("query", q);
    params.set("page", "1");

    router.replace(`/customers?${params.toString()}`);
  }, 1000);

  return (
    <main className="container">
      <h3 className="my-4 fs-5 fw-bold text-light">Customers</h3>
      <section>
        <div
          style={{ backgroundColor: "#1f2937" }}
          className="px-3 rounded py-4 d-flex flex-column flex-lg-row justify-content-between align-items-center"
        >
          <button type="button" className="btn btn-outline-success">
            <i className="bi bi-box-arrow-up text-success" /> Export
          </button>
        </div>
        <div
          className="px-3 py-4 rounded my-4"
          style={{ backgroundColor: "#1f2937" }}
        >
          <input
            type="text"
            style={{ backgroundColor: "#374151" }}
            className="form-control text-white py-2"
            placeholder="Search..."
            defaultValue={searchParams.get("query") || ""}
            onChange={(e) => debounced(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table
            style={{ backgroundColor: "#1f2937" }}
            className="table border border-secondary table-dark"
          >
            <thead>
              <tr>
                <th className="text-secondary">ID</th>
                <th className="text-secondary">JOINING DATE</th>
                <th className="text-secondary">NAME</th>
                <th className="text-secondary">EMAIL</th>
                <th className="text-secondary">PHONE</th>
                <th className="text-secondary">ROLE</th>
                <th className="text-secondary">VIEW ORDERS</th>
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
                </tr>
              ) : (
                data?.customers?.map((customer: any) => {
                  return (
                    <tr>
                      <td>{customer._id}</td>
                      <td>{new Date(customer.createdAt).toLocaleString()}</td>
                      <td>{customer.fname + " " + customer.lname}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.role}</td>
                      <td className="text-center">
                        <Link href={"/user-orders/" + customer._id}>
                          <i className="bi bi-search" />
                        </Link>
                      </td>
                    </tr>
                  );
                }) || (
                  <tr>
                    <td>No Data Found!</td>
                  </tr>
                )
              )}
              <tr>
                <td colSpan={7}>
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
                                  `/categories?query=${
                                    searchParams.get("query") || ""
                                  }&page=${ind + 1}`
                                )
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
      </section>
    </main>
  );
}

export default withAuth(Page);
