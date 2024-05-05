import { CategoriesType } from "@/app/definations";
import usePostReq from "@/app/hooks/usePostReq";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function CategoriesOffCanvas({
  selectedCategory,
  setSelectedCategory,
  setCategory,
}: {
  selectedCategory: CategoriesType | undefined;
  setSelectedCategory: Function;
  setCategory: Function;
}) {
  const [catImg, setCatImg] = useState<
    File | undefined | string /* | { id: string; link: string } */
  >(undefined);

  useEffect(() => {
    if (selectedCategory) {
      setCatImg(JSON.stringify(selectedCategory.icon));
    } else {
      setCatImg(undefined);
    }
  }, [selectedCategory]);

  const descriptionRef = useRef<HTMLTextAreaElement>(null!);
  const nameRef = useRef<HTMLInputElement>(null!);

  const { error, execute, loading } = usePostReq("/category");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      if (!catImg) {
        return toast.error("Please enter image!", {
          position: "top-left",
        });
      }
      const formData = new FormData();
      formData.append("description", descriptionRef.current.value);
      formData.append("name", nameRef.current.value);

      if (typeof catImg === "object") {
        formData.append("catImg", catImg);
      }

      if (selectedCategory) {
        formData.append("_id", selectedCategory._id);
      }
      const res = await execute(formData);

      if (!res?.success) {
        return toast.error(error || "Something went wrong!", {
          position: "top-left",
        });
      }

      toast.success("Changes Saved!", {
        position: "top-left",
      });

      nameRef.current.value = "";
      descriptionRef.current.value = "";
      setCatImg(undefined);
      if (selectedCategory) {
        return setCategory((prev: { categories: CategoriesType[] }) => {
          return {
            ...prev,
            categories: prev.categories.map((a: CategoriesType) =>
              a._id === selectedCategory._id ? res?.category : a
            ),
          };
        });
      }

      setCategory((prev: { categories: CategoriesType[] }) => ({
        ...prev,
        categories: [res?.category, ...prev.categories],
      }));
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div
      style={{ backgroundColor: "#374151" }}
      className="offcanvas w-lg-50 offcanvas-end text-light"
      data-bs-backdrop="static"
      tabIndex={-1}
      id="categoryCanvas"
      aria-labelledby="categoryCanvasLabel"
    >
      <div
        style={{ backgroundColor: "#1f2937" }}
        className="offcanvas-header py-4"
      >
        <div>
          <h5 className="offcanvas-title" id="categoryCanvasLabel">
            Add Category
          </h5>
          <span>
            Add your Product category and necessary information from here
          </span>
        </div>
        <button
          type="button"
          className="ms-auto btn p-0 text-light"
          data-bs-dismiss="offcanvas"
          onClick={() => setSelectedCategory(undefined)}
          aria-label="Close"
        >
          <i className="bi bi-x-lg fs-5" />
        </button>
      </div>
      <div className="offcanvas-body">
        <form className="mt-4 d-flex flex-column gap-4">
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="title" className="text-secondary">
              Name
            </label>
            <input
              type="text"
              ref={nameRef}
              defaultValue={selectedCategory ? selectedCategory.name : ""}
              placeholder="Category Title"
              id="title"
              className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
            />
          </div>
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="description" className="text-secondary">
              Description
            </label>
            <textarea
              ref={descriptionRef}
              defaultValue={
                selectedCategory ? selectedCategory.description : ""
              }
              placeholder="Category Description"
              id="description"
              className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
            />
          </div>
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="cat-img" className="text-secondary">
              Category Image
            </label>
            <input
              id="cat-img"
              required
              onChange={(e) => setCatImg(e.target.files?.[0])}
              type="file"
              className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
            />
          </div>
          {catImg && (
            <div className="ms-auto w-lg-50">
              <Image
                unoptimized
                src={
                  typeof catImg === "string"
                    ? JSON.parse(catImg).link
                    : URL.createObjectURL(catImg)
                }
                alt="Category"
                width={0}
                height={300}
                className="w-100"
              />
            </div>
          )}
        </form>
      </div>
      <div style={{ backgroundColor: "#1f2937" }} className="offcanvas-footer">
        <div className="py-4 px-3 d-flex flex-lg-row flex-column gap-3">
          <button
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            type="button"
            className="btn btn-secondary w-100 py-2"
            onClick={() => setSelectedCategory(undefined)}
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
              "Add Category"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
