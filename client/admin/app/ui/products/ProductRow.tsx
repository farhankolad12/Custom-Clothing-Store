import { ProductType } from "@/app/definations";
import usePostReq from "@/app/hooks/usePostReq";
import { toast } from "react-toastify";

export default function ProductRow({
  product,
  setProducts,
  setSelectedProduct,
}: {
  product: ProductType;
  setProducts: Function;
  setSelectedProduct: Function;
}) {
  const { error, execute, loading } = usePostReq("/remove-product");

  async function handleDelete() {
    try {
      const res = await execute({ _id: product._id });

      if (!res?.success) {
        return toast.error("Something went wrong!" || error);
      }

      toast.success(product.name + " successfully removed!");

      setProducts((prev: any) => {
        return {
          ...prev,
          products: prev.products.filter((p: any) => p._id !== product._id),
        };
      });
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.price}</td>
      <td>{product.price}</td>
      <td>
        <i className="bi bi-search" />
      </td>
      <td className="d-flex gap-3">
        <button
          data-bs-toggle="offcanvas"
          data-bs-target="#productCanvas"
          aria-controls="productCanvas"
          type="button"
          onClick={() => setSelectedProduct(product)}
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
      </td>
    </tr>
  );
}
