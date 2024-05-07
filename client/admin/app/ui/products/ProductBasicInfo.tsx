import { AttributesType, CategoriesType, ProductType } from "@/app/definations";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import React, { Ref, useState } from "react";

export default function ProductBasicInfo({
  nameRef,
  selectedProduct,
  priceRef,
  setImages,
  images,
  tags,
  setTags,
  isFeaturedRef,
  categoryRef,
  data,
  _loading,
  shortDescriptionRef,
  setFullDescription,
}: {
  nameRef: Ref<HTMLInputElement>;
  shortDescriptionRef: Ref<HTMLTextAreaElement>;
  selectedProduct: ProductType | undefined;
  priceRef: Ref<HTMLInputElement>;
  setImages: Function;
  images: any;
  setFullDescription: Function;
  tags: any;
  setTags: Function;
  isFeaturedRef: Ref<HTMLSelectElement>;
  categoryRef: Ref<HTMLSelectElement>;
  data:
    | {
        attributes: AttributesType[];
        categories: CategoriesType[];
      }
    | undefined;
  _loading: boolean;
}) {
  const [queryText, setQueryText] = useState("");

  return (
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
            placeholder="Product Title"
            id="title"
            className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
          />
        </div>
        <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
          <label htmlFor="short-des" className="text-secondary">
            Short Description
          </label>

          <textarea
            ref={shortDescriptionRef}
            defaultValue={
              selectedProduct ? selectedProduct.shortDescription : ""
            }
            placeholder="Product Short Description"
            id="short-des"
            className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary "
          />
        </div>
        <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
          <label htmlFor="full-desc" className="text-secondary">
            Full Description
          </label>
          <div className="w-lg-50 bg-transparent border-secondary text-light text-secondary">
            <Editor
              apiKey={process.env.NEXT_PUBLIC_EDITOR_KEY}
              initialValue={
                selectedProduct ? selectedProduct.fullDescription : ""
              }
              onChange={(e) => setFullDescription(e.target.getContent())}
              id="full-desc"
              init={{
                toolbar:
                  "insertfile a11ycheck undo redo | bold italic | forecolor backcolor | codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image",
              }}
            />
          </div>
          {/* <textarea
            ref={fullDescriptionRef}
            defaultValue={
              selectedProduct ? selectedProduct.fullDescription : ""
            }
            placeholder="Product Full Description"
            id="full-desc"
            className=""
          /> */}
        </div>
        <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
          <label htmlFor="category" className="text-secondary">
            Category
          </label>
          {_loading ? (
            <span>Loading...</span>
          ) : (
            <select
              id="category"
              ref={categoryRef}
              defaultValue={selectedProduct ? selectedProduct.category : "0"}
              className="form-select w-lg-50 bg-transparent"
            >
              <option disabled value="0">
                Please select product category
              </option>
              {data?.categories.map((cat) => {
                return (
                  <option
                    selected={
                      selectedProduct
                        ? selectedProduct.category === cat.name
                          ? true
                          : false
                        : false
                    }
                    key={cat._id}
                    value={cat.name}
                  >
                    {cat.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div>
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="product-images" className="text-secondary">
              Images
            </label>
            <input
              onChange={(e) => {
                setImages((prev: any) => [...prev, e.target.files?.[0]]);
              }}
              type="file"
              id="product-images"
              className="form-control w-lg-50 bg-transparent"
            />
          </div>
          {images.length && (
            <div className="w-lg-50 my-4 d-flex overflow-auto flex-wrap gap-3 ms-auto">
              {images.map((img: any) => {
                return (
                  <div key={img.id || img.name} className="position-relative">
                    <Image
                      src={img.id ? img.link : URL.createObjectURL(img)}
                      alt="Product"
                      width={100}
                      height={100}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev: any) => {
                          return prev.filter((p: any) =>
                            p.id ? p.id !== img.id : p.name !== img.name
                          );
                        })
                      }
                      className="position-absolute top-0 end-0 btn btn-success p-0"
                    >
                      <i className="bi bi-x " />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
          <label htmlFor="price" className="text-secondary">
            Price (Before Sale)
          </label>
          <input
            type="number"
            ref={priceRef}
            defaultValue={selectedProduct ? selectedProduct.price : ""}
            placeholder="Product price"
            id="price"
            className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
          />
        </div>
        <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
          <label htmlFor="isfeatured" className="text-secondary">
            Add To Featured Products?
          </label>
          <select
            defaultValue={
              selectedProduct
                ? selectedProduct.isFeatured
                  ? "yes"
                  : "no"
                : "0"
            }
            ref={isFeaturedRef}
            id="isfeatured"
            className="form-select w-lg-50 bg-transparent"
          >
            <option disabled value="0">
              Please select
            </option>
            <option
              selected={
                selectedProduct
                  ? selectedProduct.isFeatured
                    ? true
                    : false
                  : false
              }
              value="yes"
            >
              Yes
            </option>
            <option
              selected={
                selectedProduct
                  ? selectedProduct.isFeatured
                    ? false
                    : true
                  : false
              }
              value="no"
            >
              No
            </option>
          </select>
        </div>
        <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
          <label htmlFor="tags" className="text-secondary w-100">
            Tags
          </label>
          <div className="w-100 h-auto d-flex overflow-y-auto align-items-center flex-wrap form-control pb-0 bg-transparent pt-3-">
            <ul className="list-unstyled d-flex gap-2">
              {tags.map((tag: { id: string; tag: string }) => (
                <li
                  key={tag.id}
                  className="d-flex rounded justify-content-between bg-dark px-3 text-light"
                >
                  <span>{tag.tag}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setTags((prev: { id: string; tag: string }[]) =>
                        prev.filter((p) => p.id !== tag.id)
                      )
                    }
                    className="btn p-0"
                  >
                    <i className="bi bi-x fs-6 text-light" />
                  </button>
                </li>
              ))}
            </ul>
            <input
              onKeyDown={(e) => {
                // e.preventDefault();
                if (e.key.toLowerCase() === "enter") {
                  setTags((prev: { id: string; tag: string }[]) => [
                    ...prev,
                    {
                      id: Math.floor(Math.random() * 99999).toString(),
                      tag: queryText,
                    },
                  ]);
                  setQueryText("");
                }
              }}
              type="text"
              id="tags"
              placeholder="Press enter to add tags"
              className="border-0 w-auto flex-grow-1 bg-transparent text-light text-secondary ms-2 mb-3"
              style={{ outline: "none" }}
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
