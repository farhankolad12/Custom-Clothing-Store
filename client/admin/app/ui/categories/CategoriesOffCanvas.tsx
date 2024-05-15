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
  const [catBannerImg, setCatBannerImg] = useState<
    File | undefined | string /* | { id: string; link: string } */
  >(undefined);
  const [tags, setTags] = useState<any>([]);
  const [queryText, setQueryText] = useState("");

  useEffect(() => {
    if (selectedCategory) {
      nameRef.current.value = selectedCategory ? selectedCategory.name : "";
      descriptionRef.current.value = selectedCategory
        ? selectedCategory.description
        : "";
      setTags(selectedCategory ? selectedCategory.tags : []);
      setCatImg(JSON.stringify(selectedCategory.icon));
      setCatBannerImg(JSON.stringify(selectedCategory.bannerImg));
    } else {
      setCatImg(undefined);
      setCatBannerImg(undefined);
    }
  }, [selectedCategory]);

  const descriptionRef = useRef<HTMLTextAreaElement>(null!);
  const nameRef = useRef<HTMLInputElement>(null!);

  const { error, execute, loading } = usePostReq("/category");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      if (!catImg || !catBannerImg) {
        return toast.error("Please enter images!", {
          position: "top-left",
        });
      }
      const formData = new FormData();
      formData.append("description", descriptionRef.current.value);
      formData.append("name", nameRef.current.value);
      formData.append("tags", JSON.stringify(tags));

      if (typeof catImg === "object") {
        formData.append("catImg", catImg);
      }

      if (typeof catBannerImg === "object") {
        formData.append("catBannerImg", catBannerImg);
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
      setCatBannerImg(undefined);
      setTags([]);
      if (selectedCategory) {
        nameRef.current.value = "";
        descriptionRef.current.value = "";
        setTags([]);
        setCatImg(undefined);
        setCatBannerImg(undefined);
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
          onClick={() => {
            nameRef.current.value = "";
            descriptionRef.current.value = "";
            setCatImg(undefined);
            setCatBannerImg(undefined);
            setTags([]);
            setSelectedCategory(undefined);
          }}
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
              Category Icon
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
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="cat-banner-img" className="text-secondary">
              Category Banner Image
            </label>
            <input
              id="cat-banner-img"
              required
              onChange={(e) => setCatBannerImg(e.target.files?.[0])}
              type="file"
              className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
            />
          </div>
          {catBannerImg && (
            <div className="ms-auto w-lg-50">
              <Image
                unoptimized
                src={
                  typeof catBannerImg === "string"
                    ? JSON.parse(catBannerImg).link
                    : URL.createObjectURL(catBannerImg)
                }
                alt="Category"
                width={0}
                height={300}
                className="w-100"
              />
            </div>
          )}

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
        </form>
      </div>
      <div style={{ backgroundColor: "#1f2937" }} className="offcanvas-footer">
        <div className="py-4 px-3 d-flex flex-lg-row flex-column gap-3">
          <button
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            type="button"
            className="btn btn-secondary w-100 py-2"
            onClick={() => {
              nameRef.current.value = "";
              descriptionRef.current.value = "";
              setCatImg(undefined);
              setCatBannerImg(undefined);
              setTags([]);
              setSelectedCategory(undefined);
            }}
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
