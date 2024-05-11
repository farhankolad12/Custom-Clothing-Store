import usePostReq from "@/app/hooks/usePostReq";
import Link from "next/link";
import { toast } from "react-toastify";

export default function BlogRow({
  blog,
  setBlogs,
  setSelectedBlog,
}: {
  blog: any;
  setBlogs: Function;
  setSelectedBlog: Function;
}) {
  const { error, execute, loading } = usePostReq("/remove-blog");

  async function handleDelete() {
    try {
      const res = await execute({ _id: blog._id });

      if (!res?.success) {
        return toast.error("Something went wrong!" || error);
      }

      toast.success(blog.title + " successfully removed!");

      setBlogs((prev: any) => {
        return {
          ...prev,
          blogs: prev.blogs.filter((b: any) => b._id !== blog._id),
        };
      });
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <tr>
      <td>{blog.title}</td>
      <td>{blog.category}</td>
      <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
      <td>
        <Link href={`https://localhost:3000/blog/${blog._id}`}>
          <i className="bi bi-search" />
        </Link>
      </td>
      <td className="d-flex gap-3">
        <button
          data-bs-toggle="offcanvas"
          data-bs-target="#blogCanvas"
          aria-controls="blogCanvas"
          type="button"
          onClick={() => setSelectedBlog(blog)}
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
