import { AttributesType } from "@/app/definations";
import usePostReq from "@/app/hooks/usePostReq";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function AttributeOffCanvas({
  setAttributes,
  selectedAttribute,
  setSelectedAttribute,
}: {
  setAttributes: Function;
  setSelectedAttribute: Function;
  selectedAttribute: AttributesType | undefined;
}) {
  const [queryText, setQueryText] = useState("");
  const [variants, setVariants] = useState<{ id: string; variant: string }[]>(
    []
  );

  useEffect(() => {
    setVariants(selectedAttribute?.options || []);
  }, [selectedAttribute]);

  const titleRef = useRef<HTMLInputElement>(null!);
  const nameRef = useRef<HTMLInputElement>(null!);
  const optionTypeRef = useRef<HTMLSelectElement>(null!);

  const { error, execute, loading } = usePostReq("/attributes");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (titleRef.current?.value === "" || nameRef.current?.value === "") {
      return toast.error("Please enter required fields", {
        position: "top-left",
      });
    }

    if (variants.length === 0) {
      return toast.error("Please enter variants", {
        position: "top-left",
      });
    }

    try {
      const res = await execute({
        title: titleRef.current?.value,
        displayName: nameRef.current?.value,
        type: optionTypeRef.current?.value,
        options: variants,
        _id: selectedAttribute ? selectedAttribute._id : undefined,
      });

      if (!res?.success) {
        return toast.error(error || "Something went wrong!", {
          position: "top-left",
        });
      }

      toast.success("Changes Saved!", {
        position: "top-left",
      });

      titleRef.current.value = "";
      nameRef.current.value = "";
      optionTypeRef.current.value = "radio";
      setVariants([]);

      if (selectedAttribute) {
        return setAttributes((prev: { attributes: AttributesType[] }) => {
          return {
            ...prev,
            attributes: prev.attributes.map((a: AttributesType) =>
              a._id === selectedAttribute._id ? res?.attribute : a
            ),
          };
        });
      }

      setAttributes((prev: { attributes: AttributesType[] }) => ({
        ...prev,
        attributes: [res?.attribute, ...prev.attributes],
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
      id="attribueCanvas"
      aria-labelledby="attribueCanvasLabel"
    >
      <div
        style={{ backgroundColor: "#1f2937" }}
        className="offcanvas-header py-4"
      >
        <div>
          <h5 className="offcanvas-title" id="attribueCanvasLabel">
            Add Attribute Value
          </h5>
          <span>
            Add your attribute values and necessary information from here
          </span>
        </div>
        <button
          type="button"
          className="ms-auto btn p-0 text-light"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="bi bi-x-lg fs-5" />
        </button>
      </div>
      <div className="offcanvas-body">
        <form className="mt-4 d-flex flex-column gap-4">
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="title" className="text-secondary">
              Attribute Title
            </label>
            <input
              ref={titleRef}
              defaultValue={selectedAttribute ? selectedAttribute.title : ""}
              placeholder="Color or Size or Material"
              type="text"
              id="title"
              className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
            />
          </div>
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="dis-name" className="text-secondary">
              Display Name
            </label>
            <input
              id="dis-name"
              required
              defaultValue={
                selectedAttribute ? selectedAttribute.displayName : ""
              }
              ref={nameRef}
              placeholder="Display Name"
              type="text"
              className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
            />
          </div>
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="options" className="text-secondary">
              Options
            </label>
            <select
              ref={optionTypeRef}
              name="options"
              className="form-select text-light w-lg-50 bg-transparent border-secondary"
              defaultValue="radio"
              id="options"
            >
              <option
                defaultChecked={
                  selectedAttribute ? selectedAttribute.type === "radio" : false
                }
                className="bg-dark text-secondary"
                value="radio"
              >
                Radio
              </option>
              <option
                defaultChecked={
                  selectedAttribute
                    ? selectedAttribute.type === "dropdown"
                    : false
                }
                className="bg-dark text-secondary"
                value="dropdown"
              >
                Dropdown
              </option>
            </select>
          </div>
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="variants" className="text-secondary w-100">
              Variants
            </label>
            <div className="w-100 h-auto d-flex overflow-y-auto align-items-center flex-wrap form-control pb-0 bg-transparent pt-3-">
              <ul className="list-unstyled d-flex gap-2">
                {variants.map((variant: { id: string; variant: string }) => (
                  <li
                    key={variant.id}
                    className="d-flex rounded justify-content-between bg-dark px-3 text-light"
                  >
                    <span>{variant.variant}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setVariants((prev) => prev.filter((p) => p !== variant))
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
                  if (e.key.toLowerCase() === "enter") {
                    setVariants((prev) => [
                      ...prev,
                      {
                        id: Math.floor(Math.random() * 99999).toString(),
                        variant: queryText,
                      },
                    ]);
                    setQueryText("");
                  }
                }}
                type="text"
                id="variants"
                placeholder="Press enter to add variant"
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
            onClick={() => setSelectedAttribute(undefined)}
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
              "Add Attribute"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
