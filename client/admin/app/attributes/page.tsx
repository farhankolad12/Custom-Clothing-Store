"use client";

import { toast } from "react-toastify";
import useGetReq from "../hooks/useGetReq";
import AttributeOffCanvas from "../ui/attributes/AttributeOffCanvas";
import withAuth from "../utils/PrivateRoutes";
import { useState } from "react";
import AttributeRow from "../ui/attributes/AttributeRow";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { AttributesType } from "../definations";

function Page() {
  const [selectedAttribute, setSelectedAttribute] = useState();

  const router = useRouter();
  const searchParams = useSearchParams();

  // searchParams.set("isAdmin", true)

  const {
    data,
    error,
    loading,
    setData: setAttributes,
  } = useGetReq("/attributes", {
    searchParams,
    isAdmin: true,
  });

  if (error) {
    toast.error(error);
  }

  const debounced = useDebouncedCallback((q) => {
    const params = new URLSearchParams(searchParams);
    params.set("query", q);
    params.set("page", "1");

    router.push(`/attributes?${params.toString()}`);
  }, 1000);

  return (
    <>
      <main className="container">
        <h3 className="my-4 fs-5 fw-bold text-light">Attributes</h3>
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
              data-bs-target="#attribueCanvas"
              aria-controls="attribueCanvas"
            >
              <i className="bi bi-plus" /> Add attribute
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
                  <th className="text-secondary">NAME</th>
                  <th className="text-secondary">DISPLAY NAME</th>
                  <th className="text-secondary">TYPE</th>
                  <th className="text-secondary">VALUES</th>
                  <th className="text-secondary">ACTION</th>
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
                  data?.attributes?.map((attr: AttributesType) => {
                    return (
                      <AttributeRow
                        setSelectedAttribute={setSelectedAttribute}
                        setAttributes={setAttributes}
                        attr={attr}
                        key={attr._id}
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
                          showing {data?.startDocument} - {data?.lastDocument}{" "}
                          of {data?.totalDocuments}
                        </strong>
                      </div>
                      {data && (
                        <div className="d-flex align-items-center flex-wrap gap-2">
                          {[...Array(data.totalPages)].map((c, ind) => {
                            return (
                              <button
                                onClick={() =>
                                  router.push(
                                    `/attributes?query=${
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
        <AttributeOffCanvas
          setSelectedAttribute={setSelectedAttribute}
          selectedAttribute={selectedAttribute}
          setAttributes={setAttributes}
        />
      </main>
    </>
  );
}

export default withAuth(Page);
