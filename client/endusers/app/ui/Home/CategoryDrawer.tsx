"use client";

import { useAuth } from "@/app/context/AuthProvider";
import { Drawer } from "@material-tailwind/react";
import { onClose } from "@material-tailwind/react/types/components/alert";
import { CustomLink } from "../Header";
import { useRouter } from "next/navigation";

export default function CategoryDrawer({
  open,
  closeDrawer,
}: {
  open: boolean;
  closeDrawer: onClose;
}) {
  const { data } = useAuth();

  const router = useRouter();

  return (
    <Drawer
      placeholder="Menu"
      className="h-full w-full"
      open={open}
      onClose={closeDrawer}
    >
      <div className="w-full flex flex-col h-full justify-between">
        <div className="px-[2rem]">
          <div className="flex justify-between items-center mt-5">
            <span className="font-bold text-[#727273] text-2xl">Menu</span>
            <button onClick={closeDrawer}>
              <i className="bi bi-x-lg" />
            </button>
          </div>
          <ul className="flex flex-col gap-[1.5rem] my-[2rem]">
            {data?.categories?.map((category: any) => {
              return (
                <CustomLink
                  key={category._id}
                  name={category.name}
                  to={`/collections/${category.name}`}
                />
              );
            })}
            <CustomLink name="Shop" to="/shop" />
          </ul>
        </div>
        <div className="bg-[#f8f8f8] p-[2rem] w-full flex flex-col gap-4 items-start">
          <button onClick={() => router.push("/login")}>
            <i className="bi bi-person text-2xl" /> &nbsp; Log in
          </button>
          <div className="flex gap-[2rem]">
            <a
              target="_blank"
              href="https://www.instagram.com/essentials.by.la"
              className="font-bold uppercase "
            >
              <i className="bi bi-instagram" />
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100083453085816"
              className="font-bold uppercase "
            >
              <i className="bi bi-facebook" />
            </a>
            <a
              target="_blank"
              href="https://wa.me/8689913856"
              className="font-bold uppercase "
            >
              <i className="bi bi-whatsapp" />
            </a>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
