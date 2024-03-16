import { AttributesType } from "@/app/definations";
import usePostReq from "@/app/hooks/usePostReq";
import { toast } from "react-toastify";

export default function AttributeRow({
  attr,
  setAttributes,
  setSelectedAttribute,
}: {
  attr: AttributesType;
  setAttributes: Function;
  setSelectedAttribute: Function;
}) {
  const { error, execute, loading } = usePostReq("/remove-attribute");

  async function handleDelete() {
    try {
      const res = await execute({ _id: attr._id });

      if (!res) {
        return toast.error(error || "Something went wrong!");
      }

      toast.success(`${attr.displayName} deleted`);
      setAttributes((prev: { attributes: AttributesType[] }) => {
        return {
          ...prev,
          attributes: prev.attributes.filter(
            (a: AttributesType) => a._id !== attr._id
          ),
        };
      });
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <tr>
      <td>{attr._id}</td>
      <td>{attr.title}</td>
      <td>{attr.displayName}</td>
      <td>{attr.type}</td>
      <td>
        {attr.options
          .map((attr: { id: string; variant: string }) => attr.variant)
          .join(",")}
      </td>
      <td className="d-flex gap-3">
        <button
          data-bs-toggle="offcanvas"
          data-bs-target="#attribueCanvas"
          aria-controls="attribueCanvas"
          type="button"
          onClick={() => setSelectedAttribute(attr)}
          className="btn text-light p-0"
        >
          <i className="bi bi-pencil-square " />
        </button>
        <button
          disabled={loading}
          onClick={handleDelete}
          type="button"
          className="btn p-0 text-light"
        >
          {loading ? "..." : <i className="bi bi-trash " />}
        </button>
      </td>
    </tr>
  );
}
