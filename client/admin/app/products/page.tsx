"use client";

import { useRouter, useSearchParams } from "next/navigation";
import withAuth from "../utils/PrivateRoutes";
import { useDebouncedCallback } from "use-debounce";
import useGetReq from "../hooks/useGetReq";
import { CategoriesType, ProductType } from "../definations";
import { useState } from "react";
import ProductOffCanvas from "../ui/products/ProductOffCanvas";
import { toast } from "react-toastify";
import ProductRow from "../ui/products/ProductRow";

function Page() {
  const [selectedProduct, setSelectedProduct] = useState();

  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    data,
    error,
    loading,
    setData: setProducts,
  } = useGetReq("/products", {
    isAdmin: true,
    searchParams,
  });

  const {
    data: filters,
    loading: _loading,
    error: _error,
  } = useGetReq("/product-filters", {
    isAdmin: true,
  });

  if (_error) {
    toast.error(_error || "Something went wrong!");
  }

  const debounced = useDebouncedCallback((q) => {
    const params = new URLSearchParams(searchParams);

    params.set("query", q);
    params.set("page", "1");

    router.replace(`/products?${params.toString()}`);
  }, 1000);

  return (
    <main className="container">
      <h3 className="my-4 fs-5 fw-bold text-light">Products</h3>
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
            data-bs-target="#productCanvas"
            aria-controls="productCanvas"
          >
            <i className="bi bi-plus" /> Add Product
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            return e.currentTarget.reset();
          }}
          className="d-flex flex-lg-row justify-content-between gap-3 flex-column px-3 py-4 rounded my-4"
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
          <select
            style={{ backgroundColor: "#374151" }}
            className="form-select w-100"
            id="select-category"
            defaultValue="0"
            onChange={(e) => {
              const params = new URLSearchParams(searchParams);

              params.set("page", "1");
              params.set("category", e.target.value);
              router.replace(`/products?${params.toString()}`);
            }}
          >
            <option disabled value="0">
              Category
            </option>
            {filters?.categories.map((category: CategoriesType) => {
              return (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
            {/* <option value="Home">Home</option>
            <option value="Home">Home</option>
            <option value="Home">Home</option> */}
          </select>
          <select
            style={{ backgroundColor: "#374151" }}
            className="form-select w-100"
            id="select-filter"
            onChange={(e) => {
              const params = new URLSearchParams(searchParams);

              params.set("page", "1");
              params.set("sort", e.target.value);
              router.replace(`/products?${params.toString()}`);
            }}
          >
            <option value="low-high">Low to high (price)</option>
            <option value="high-low">High to low (price)</option>
            <option value="date-asc">Date added (asc)</option>
            <option value="date-desc">Date added (desc)</option>
          </select>
          <button type="submit" className="btn btn-success">
            reset
          </button>
        </form>
        <div className="table-responsive">
          <table
            style={{ backgroundColor: "#1f2937" }}
            className="table border border-secondary table-dark"
          >
            <thead>
              <tr>
                <th className="text-secondary">NAME</th>
                <th className="text-secondary">CATEGORY</th>
                <th className="text-secondary">PRICE</th>
                <th className="text-secondary">SALE PRICE</th>
                <th className="text-secondary">VIEW</th>
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
                  <td></td>
                </tr>
              ) : (
                data?.products?.map((product: ProductType) => {
                  return (
                    <ProductRow
                      setProducts={setProducts}
                      setSelectedProduct={setSelectedProduct}
                      product={product}
                      key={product._id}
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
      <ProductOffCanvas
        filters={filters}
        setSelectedProduct={setSelectedProduct}
        selectedProduct={selectedProduct}
        setProducts={setProducts}
      />
    </main>
  );
}

export default withAuth(Page);
