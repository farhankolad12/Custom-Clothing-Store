import { ProductType } from "@/app/definations";
import usePostReq from "@/app/hooks/usePostReq";
import { FormEvent, useRef, useState } from "react";
import ProductBasicInfo from "./ProductBasicInfo";
import useGetReq from "@/app/hooks/useGetReq";
import { toast } from "react-toastify";
import ProdutcCombination from "./ProdutcCombination";

export default function ProductOffCanvas({
  setSelectedProduct,
  setProducts,
  selectedProduct,
}: {
  setSelectedProduct: Function;
  setProducts: Function;
  selectedProduct: ProductType | undefined;
}) {
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [variants, setVariants] = useState([]);
  const [combinations, setCombinations] = useState([]);

  const { error, execute, loading } = usePostReq("/product");

  const {
    data,
    loading: _loading,
    error: _error,
  } = useGetReq("/product-filters", {
    isAdmin: true,
  });

  if (_error) {
    toast.error(_error || "Something went wrong!");
  }

  const nameRef = useRef<HTMLInputElement>(null!);
  const shortDescriptionRef = useRef<HTMLTextAreaElement>(null!);
  const fullDescriptionRef = useRef<HTMLTextAreaElement>(null!);
  const priceRef = useRef<HTMLInputElement>(null!);
  const isFeaturedRef = useRef<HTMLSelectElement>(null!);
  const categoryRef = useRef<HTMLSelectElement>(null!);

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
            <ProductBasicInfo
              priceRef={priceRef}
              _loading={loading}
              setImages={setImages}
              images={images}
              fullDescriptionRef={fullDescriptionRef}
              tags={tags}
              setTags={setTags}
              isFeaturedRef={isFeaturedRef}
              categoryRef={categoryRef}
              data={data}
              shortDescriptionRef={shortDescriptionRef}
              selectedProduct={selectedProduct}
              nameRef={nameRef}
            />
            <div
              className="tab-pane fade"
              id="combination"
              role="tabpanel"
              aria-labelledby="combination-tab"
              tabIndex={0}
            >
              <ProdutcCombination
                variants={variants}
                setVariants={setVariants}
                attributes={data?.attributes}
                combinations={combinations}
                setCombinations={setCombinations}
              />
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
