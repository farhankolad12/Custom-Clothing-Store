import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function SideNav({ setOpenNav }: { setOpenNav: Function }) {
  window.addEventListener("click", (e) => {
    e.clientX > 300 && setOpenNav(false);
  });

  return (
    <div
      style={{ backgroundColor: "#1f2937", width: "300px" }}
      className="position-absolute py-4 start-0 top-0 bottom-0"
    >
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="d-flex flex-column gap-4">
          <Image
            src="/logo.png"
            className="ps-4"
            alt="Logo"
            width={250}
            height={50}
          />
          <div className="mt-4">
            <CustomLink icon="grid" text="Dashboard" to="/" />
          </div>
          <CustomLink icon="shop" text="Products" to="/products" />
          <CustomLink icon="list-ul" text="Categories" to="/categories" />
          <CustomLink
            icon="clipboard2-data"
            text="Attributes"
            to="/attributes"
          />
          <CustomLink icon="tag" text="Coupons" to="/coupons" />
          <CustomLink icon="people" text="Customers" to="/customers" />
          <CustomLink icon="clipboard2-check" text="Orders" to="/orders" />
          <CustomLink icon="gear" text="Store settings" to="/setting" />
        </div>
        <div className="mx-4">
          <LogoutButton setOpenNav={setOpenNav} />
        </div>
      </div>
    </div>
  );
}

const CustomLink = ({
  to,
  icon,
  text,
}: {
  to: string;
  icon: string;
  text: string;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={to}
      className={` text-decoration-none d-flex gap-3 align-items-center px-4 ${
        to === "/" || pathname.split("/")[1]?.includes(to)
          ? "border-start border-5 rounded py-2 border-success"
          : ""
      }`}
    >
      <i
        className={`bi bi-${icon} ${
          to === "/" || pathname.split("/")[1].includes(to)
            ? "text-success"
            : "text-secondary"
        } fw-bold fs-5`}
      />
      <strong
        className={`${
          to === "/" || pathname.split("/")[1].includes(to)
            ? "text-success"
            : "text-secondary"
        }`}
      >
        {text}
      </strong>
    </Link>
  );
};
