import { ProductType } from "@/app/definations";
import usePostReq from "@/app/hooks/usePostReq";
import { FormEvent, useRef } from "react";

export default function ProductOffCanvas({
  setSelectedProduct,
  setProducts,
  selectedProduct,
}: {
  setSelectedProduct: Function;
  setProducts: Function;
  selectedProduct: ProductType | undefined;
}) {
  const { error, execute, loading } = usePostReq("/product");

  const nameRef = useRef<HTMLInputElement>(null!);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <div
      style={{ backgroundColor: "#374151" }}
      className="offcanvas w-lg-75 offcanvas-end text-light"
      data-bs-backdrop="static"
      tabIndex={-1}
      id="productCanvas"
      aria-labelledby="productCanvasLabel"
    >
      <div
        style={{ backgroundColor: "#1f2937" }}
        className="offcanvas-header py-4"
      >
        <div>
          <h5 className="offcanvas-title" id="productCanvasLabel">
            Add Product
          </h5>
          <span>Add your product and necessary information from here</span>
        </div>
        <button
          type="button"
          className="ms-auto btn p-0 text-light"
          data-bs-dismiss="offcanvas"
          onClick={() => setSelectedProduct(undefined)}
          aria-label="Close"
        >
          <i className="bi bi-x-lg fs-5" />
        </button>
      </div>
      <div className="offcanvas-body">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="basic-info-tab"
              data-bs-toggle="pill"
              data-bs-target="#basic-info"
              type="button"
              role="tab"
              aria-controls="basic-info"
              aria-selected="true"
            >
              Basic Info
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="combination-tab"
              data-bs-toggle="pill"
              data-bs-target="#combination"
              type="button"
              role="tab"
              aria-controls="combination"
              aria-selected="false"
            >
              Combination
            </button>
          </li>
        </ul>
        <form>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="basic-info"
              role="tabpanel"
              aria-labelledby="basic-info-tab"
              tabIndex={0}
            >
              <div className="mt-4 d-flex flex-column gap-4">
                <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
                  <label htmlFor="title" className="text-secondary">
                    Name
                  </label>
                  <input
                    type="text"
                    ref={nameRef}
                    defaultValue={selectedProduct ? selectedProduct.name : ""}
                    placeholder="Category Title"
                    id="title"
                    className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
                  />
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="combination"
              role="tabpanel"
              aria-labelledby="combination-tab"
              tabIndex={0}
            >
              Combination
            </div>
          </div>
        </form>
      </div>
      <div style={{ backgroundColor: "#1f2937" }} className="offcanvas-footer">
        <div className="py-4 px-3 d-flex flex-lg-row flex-column gap-3">
          <button
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            type="button"
            className="btn btn-secondary w-100 py-2"
            onClick={() => setSelectedProduct(undefined)}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            onClick={handleSubmit}
            className="btn btn-success w-100 py-2"
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
