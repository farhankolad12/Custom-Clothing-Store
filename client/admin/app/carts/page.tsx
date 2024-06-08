"use client";

import withAuth from "../utils/PrivateRoutes";
import useGetReq from "../hooks/useGetReq";
import UserCart from "../ui/carts/UserCart";
import { useRouter, useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data, loading } = useGetReq("/user-carts", {
    isAdmin: true,
    searchParams,
  });

  return (
    <main className="container">
      <h3 className="my-4 fs-5 fw-bold text-light">User Carts</h3>
      <section>
        <div
          style={{ backgroundColor: "#1f2937" }}
          className="px-3 rounded py-4 d-flex flex-column flex-lg-row justify-content-between align-items-center"
        >
          <button type="button" className="btn btn-outline-success">
            <i className="bi bi-box-arrow-up text-success" /> Export
          </button>
        </div>
        {loading ? (
          "loading..."
        ) : data.carts.length ? (
          <section className="my-5">
            <div className="d-flex flex-column gap-3">
              {data.carts.map((cart: any) => {
                return <UserCart cart={cart} key={cart._id} />;
              })}
            </div>
            <div className="d-flex flex-wrap align-items-center justify-content-center my-4 gap-2">
              {[...Array(data.totalPages)].map((c, ind) => {
                return (
                  <button
                    onClick={() => router.push(`/carts?page=${ind + 1}`)}
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
          </section>
        ) : (
          <h3 className="my-4 text-center">No Carts Found</h3>
        )}
      </section>
    </main>
  );
}

export default withAuth(Page);
