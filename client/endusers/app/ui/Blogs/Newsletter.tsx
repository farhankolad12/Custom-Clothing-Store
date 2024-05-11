import usePostReq from "@/app/hooks/usePostReq";
import { Spinner } from "@material-tailwind/react";
import { FormEvent, useRef } from "react";
import { toast } from "react-toastify";

export default function Newsletter() {
  const { error, execute, loading } = usePostReq("/newsletter");
  const emailRef = useRef<HTMLInputElement>(null!);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await execute({
        email: emailRef.current.value,
      });

      if (!res?.success) {
        return toast.error(res.message || error);
      }

      toast.success(res.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err || "Something went wrong!");
    }
  }
  return (
    <div className="flex flex-col gap-3">
      <strong className="uppercase">newsletter</strong>
      <p>Essentials By LA has all of the best products.</p>

      <form onSubmit={handleSubmit} className="w-full relative">
        <input
          ref={emailRef}
          required
          type="text"
          placeholder="YOUR EMAIL"
          className="border-0 bg-transparent border-b-2 outline-none border-black w-full"
        />
        <button disabled={loading} type="submit" className="absolute right-2">
          {loading ? (
            <Spinner className="w-6 h-6" />
          ) : (
            <i className="bi bi-arrow-right" />
          )}
        </button>
      </form>
    </div>
  );
}
