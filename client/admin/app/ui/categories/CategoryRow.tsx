import { CategoriesType } from "@/app/definations";
import usePostReq from "@/app/hooks/usePostReq";
import Image from "next/image";
import { toast } from "react-toastify";

export default function CategoryRow({
  category,
  setSelectedCategory,
  setCategory,
}: {
  category: CategoriesType;
  setSelectedCategory: Function;
  setCategory: Function;
}) {
  const { error, execute, loading } = usePostReq("/remove-category");

  async function handleDelete() {
    try {
      const res = await execute({
        _id: category._id,
      });

      if (!res) {
        return toast.error(error || "Something went wrong");
      }

      setCategory((prev: { categories: CategoriesType[] }) => {
        return {
          ...prev,
          categories: prev.categories.filter(
            (a: CategoriesType) => a._id !== category._id
          ),
        };
      });

      return toast.success(`${category.name} deleted!`);
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <tr>
      <td>{category._id}</td>
      <td>
        <Image
          src={category.icon.link}
          className="rounded-circle"
          width={50}
          height={50}
          alt="Icon"
        />
      </td>
      <td>{category.name}</td>
      <td>{category.description}</td>
      <td>
        <div className="d-flex gap-3">
          <button
            data-bs-toggle="offcanvas"
            data-bs-target="#categoryCanvas"
            aria-controls="categoryCanvas"
            type="button"
            onClick={() => setSelectedCategory(category)}
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
