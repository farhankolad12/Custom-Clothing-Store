import usePostReq from "@/app/hooks/usePostReq";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function BlogOffCanvas({
  filters,
  setSelectedBlog,
  selectedBlog,
  setBlogs,
}: {
  filters: any;
  setSelectedBlog: Function;
  selectedBlog: any;
  setBlogs: Function;
}) {
  const [fullDescription, setFullDescription] = useState(
    selectedBlog ? selectedBlog.fullDescription : ""
  );
  const [queryText, setQueryText] = useState("");
  const [image, setImage] = useState<any>(
    selectedBlog ? selectedBlog.image : undefined
  );
  const [tags, setTags] = useState(selectedBlog ? selectedBlog.tags : []);

  const { error, execute, loading } = usePostReq("/blogs");

  const titleRef = useRef<HTMLInputElement>(null!);
  const categoryRef = useRef<HTMLSelectElement>(null!);
  const shortDescriptionRef = useRef<HTMLTextAreaElement>(null!);

  useEffect(() => {
    if (selectedBlog) {
      setFullDescription(selectedBlog.fullDescription);
      setImage(selectedBlog.image);
      setTags(selectedBlog.tags);
      titleRef.current.value = selectedBlog.title;
      shortDescriptionRef.current.value = selectedBlog.shortDescription;
    }
  }, [selectedBlog]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const title = titleRef.current.value;
    const category = categoryRef.current.value;
    const shortDescription = shortDescriptionRef.current.value;

    if (
      title === "" ||
      category === "0" ||
      shortDescription === "" ||
      fullDescription === "" ||
      !image ||
      !tags.length
    ) {
      return toast.error("Please fill required details!", {
        position: "top-left",
      });
    }

    try {
      const formData = new FormData();

      if (selectedBlog) {
        formData.append("_id", selectedBlog._id);
      }

      formData.append("title", title);
      formData.append("shortDescription", shortDescription);
      formData.append("fullDescription", fullDescription);
      formData.append("category", category);
      formData.append("tags", JSON.stringify(tags));

      if (image.id) {
        formData.append("image", JSON.stringify(image));
      } else {
        formData.append("image", image);
      }

      const res = await execute(formData);

      if (!res?.success) {
        return toast.error(res.message || error || "Something went wrong");
      }

      if (selectedBlog) {
        toast.success("Blog edited!", {
          position: "top-right",
        });

        setSelectedBlog(undefined);
        titleRef.current.value = "";
        categoryRef.current.value = "";
        shortDescriptionRef.current.value = "";
        setFullDescription("");
        setImage(undefined);
        setTags([]);

        return setBlogs((prev: any) => {
          return {
            ...prev,
            blogs: prev.blogs.map((blog: any) => {
              return blog._id === selectedBlog._id ? res?.blog : blog;
            }),
          };
        });
      }

      setBlogs((prev: any) => ({
        ...prev,
        blogs: [res?.blog, ...prev.blogs],
      }));

      titleRef.current.value = "";
      categoryRef.current.value = "";
      shortDescriptionRef.current.value = "";
      setFullDescription("");
      setImage(undefined);
      setTags([]);

      return toast.success("Blog added!", {
        position: "top-right",
      });
    } catch (err: any) {
      console.log(err);
      toast.error(error || err.toString(), {
        position: "top-left",
      });
    }
  }

  return (
    <div
      style={{ backgroundColor: "#374151" }}
      className="offcanvas w-lg-75 offcanvas-end text-light"
      data-bs-backdrop="static"
      tabIndex={-1}
      id="blogCanvas"
      aria-labelledby="blogCanvasLabel"
    >
      <div
        style={{ backgroundColor: "#1f2937" }}
        className="offcanvas-header py-4"
      >
        <div>
          <h5 className="offcanvas-title" id="blogCanvasLabel">
            Add Blog
          </h5>
          <span>Add your blog and necessary information from here</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setFullDescription("");
            setImage(undefined);
            setTags([]);
            setSelectedBlog(undefined);
            categoryRef.current.value = "0";
          }}
          className="ms-auto btn p-0 text-light"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="bi bi-x-lg fs-5" />
        </button>
      </div>
      <div className="offcanvas-body">
        <form>
          <div className="mt-4 d-flex flex-column gap-4">
            <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
              <label htmlFor="title" className="text-secondary">
                Title
              </label>
              <input
                type="text"
                ref={titleRef}
                defaultValue={selectedBlog ? selectedBlog.title : ""}
                placeholder="Blog Title"
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
                defaultValue={selectedBlog ? selectedBlog.shortDescription : ""}
                placeholder="Blog Short Description"
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
                  initialValue={fullDescription}
                  onChange={(e) => setFullDescription(e.target.getContent())}
                  id="full-desc"
                  init={{
                    toolbar:
                      "insertfile a11ycheck undo redo | bold italic | forecolor backcolor | codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image",
                  }}
                />
              </div>
            </div>
            <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
              <label htmlFor="category" className="text-secondary">
                Category
              </label>
              <select
                id="category"
                ref={categoryRef}
                defaultValue={selectedBlog ? selectedBlog.category : "0"}
                className="form-select w-lg-50 bg-transparent"
              >
                <option disabled value="0">
                  Please select blog category
                </option>
                {filters?.categories?.map((cat: any) => {
                  return (
                    <option
                      selected={
                        selectedBlog
                          ? selectedBlog.category === cat.name
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
            </div>
            <div>
              <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
                <label htmlFor="product-images" className="text-secondary">
                  Head Image
                </label>
                <input
                  onChange={(e) => {
                    setImage(e.target.files?.[0]);
                  }}
                  type="file"
                  id="product-images"
                  className="form-control w-lg-50 bg-transparent"
                />
              </div>
              {image && (
                <div className="w-lg-50 my-4 d-flex overflow-auto flex-wrap gap-3 ms-auto">
                  <div className="position-relative">
                    <Image
                      src={image.id ? image.link : URL.createObjectURL(image)}
                      alt="Blog"
                      width={100}
                      height={100}
                    />
                    <button
                      type="button"
                      onClick={() => setImage(undefined)}
                      className="position-absolute top-0 end-0 btn btn-success p-0"
                    >
                      <i className="bi bi-x " />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
              <label htmlFor="tags" className="text-secondary w-100">
                Tags
              </label>
              <div className="w-100 h-auto d-flex overflow-y-auto align-items-center flex-wrap form-control pb-0 bg-transparent pt-3-">
                <ul className="list-unstyled d-flex gap-2">
                  {tags?.map((tag: { id: string; tag: string }) => (
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
        </form>
      </div>
      <div style={{ backgroundColor: "#1f2937" }} className="offcanvas-footer">
        <div className="py-4 px-3 d-flex flex-lg-row flex-column gap-3">
          <button
            onClick={() => {
              setFullDescription("");
              setImage(undefined);
              setTags([]);
              setSelectedBlog(undefined);
              categoryRef.current.value = "0";
            }}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            type="button"
            className="btn btn-secondary w-100 py-2"
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
              "Add Blog"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
