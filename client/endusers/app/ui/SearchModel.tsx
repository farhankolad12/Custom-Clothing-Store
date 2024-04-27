import { Dialog, DialogBody } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function SearchModel({
  open,
  handleOpen,
  closeSearchOpen,
}: {
  open: boolean;
  handleOpen: Function;
  closeSearchOpen: Function;
}) {
  const queryRef = useRef<HTMLInputElement>(null!);
  const router = useRouter();

  return (
    <Dialog placeholder="" size="xxl" open={open} handler={() => handleOpen()}>
      <DialogBody placeholder="" className="h-full w-full">
        <div className="flex h-full w-full flex-col justify-center px-0 lg:px-72">
          <div className="flex flex-col gap-3 items-center">
            <h3 className="text-4xl text-center text-black font-bold">
              WHAT ARE YOU LOOKING FOR?
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (queryRef.current.value === "") return;
                closeSearchOpen();
                router.push("/shop?query=" + queryRef.current.value);
              }}
              className="w-full relative"
            >
              <input
                ref={queryRef}
                type="text"
                placeholder="TYPE YOUR SEARCH"
                className="form-control border-b-2 py-3c w-full my-14 text-black font-bold border-black outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 top-0 bottom-3 outline-none"
              >
                <i className="bi bi-search text-black font-bold text-lg" />
              </button>
            </form>
          </div>
          <button
            onClick={() => closeSearchOpen()}
            className="bg-black p-5 mx-auto "
          >
            <i className="bi bi-x-lg font-bold text-white" />
          </button>
        </div>
      </DialogBody>
    </Dialog>
  );
}
