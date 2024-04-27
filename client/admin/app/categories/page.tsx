"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import useGetReq from "../hooks/useGetReq";
import { CategoriesType } from "../definations";
import { useState } from "react";
import withAuth from "../utils/PrivateRoutes";
import CategoriesOffCanvas from "../ui/categories/CategoriesOffCanvas";
import CategoryRow from "../ui/categories/CategoryRow";

function Page() {
  const [selectedCategory, setSelectedCategory] = useState();

  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    error,
    data,
    loading,
    setData: setCategory,
  } = useGetReq("/category", {
    isAdmin: true,
    searchParams,
  });

  const debounced = useDebouncedCallback((q) => {
    const params = new URLSearchParams(searchParams);
    params.set("query", q);
    params.set("page", "1");

    router.replace(`/categories?${params.toString()}`);
  }, 1000);

  return (
    <main className="container">
      <h3 className="my-4 fs-5 fw-bold text-light">Categories</h3>
      <section>
        <div
          style={{ backgroundColor: "#1f2937" }}
          className="px-3 rounded py-4 d-flex flex-column flex-lg-row justify-content-between align-items-center"
        >
          <button type="button" className="btn btn-outline-success">
            <i className="bi bi-box-arrow-up text-success" /> Export
          </button>
          <button
            className="btn btn-success"
            data-bs-toggle="offcanvas"
            data-bs-target="#categoryCanvas"
            aria-controls="categoryCanvas"
          >
            <i className="bi bi-plus" /> Add Categories
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
                <th className="text-secondary">ICON</th>
                <th className="text-secondary">NAME</th>
                <th className="text-secondary">DESCRIPTION</th>
                <th className="text-secondary">ACTIONS</th>
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
                </tr>
              ) : (
                data?.categories?.map((category: CategoriesType) => {
                  return (
                    <CategoryRow
                      setCategory={setCategory}
                      setSelectedCategory={setSelectedCategory}
                      key={category._id}
                      category={category}
                    />
                  );
                }) || (
                  <tr>
                    <td>No Data Found!</td>
                  </tr>
                )
              )}
              <tr>
                <td colSpan={6}>
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
      <CategoriesOffCanvas
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        setCategory={setCategory}
      />
    </main>
  );
}

export default withAuth(Page);
