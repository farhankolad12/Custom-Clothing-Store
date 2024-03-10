import usePostReq from "@/app/hooks/usePostReq";
import { toast } from "react-toastify";

export default function AttributeRow({
  attr,
  setAttributes,
  setSelectedAttribute,
}: {
  attr: any;
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
      setAttributes((prev: any) => {
        return {
          ...prev,
          attributes: prev.attributes.filter((a: any) => a._id !== attr._id),
        };
      });
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <tr>
      <td className="text-secondary">{attr._id}</td>
      <td className="text-secondary">{attr.title}</td>
      <td className="text-secondary">{attr.displayName}</td>
      <td className="text-secondary">{attr.type}</td>
      <td className="text-secondary">
        {attr.options.map((attr: any) => attr.variant).join(",")}
      </td>
      <td>
        <div className="d-flex gap-3">
          <button
            data-bs-toggle="offcanvas"
            data-bs-target="#attribueCanvas"
            aria-controls="attribueCanvas"
            type="button"
            onClick={() => setSelectedAttribute(attr)}
            className="btn p-0"
          >
            <i className="bi bi-pencil-square text-secondary" />
          </button>
          <button
            disabled={loading}
            onClick={handleDelete}
            type="button"
            className="btn p-0"
          >
            {loading ? "..." : <i className="bi bi-trash text-secondary" />}
          </button>
        </div>
      </td>
    </tr>
  );
}
