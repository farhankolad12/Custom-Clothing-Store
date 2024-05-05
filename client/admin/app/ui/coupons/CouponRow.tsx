import usePostReq from "@/app/hooks/usePostReq";
import formatCurrency from "@/app/utils/formatCurrency";
import Image from "next/image";
import { toast } from "react-toastify";

export default function CouponRow({
  coupon,
  setSelectedCoupon,
  setCoupon,
}: {
  coupon: any;
  setSelectedCoupon: Function;
  setCoupon: Function;
}) {
  const { error, execute, loading } = usePostReq("/remove-coupon");

  async function handleDelete() {
    try {
      const res = await execute({
        couponId: coupon._id,
      });

      if (!res?.success) {
        return toast.error(error || "Something went wrong");
      }

      setCoupon((prev: { coupons: any[] }) => {
        return {
          ...prev,
          coupons: prev.coupons.filter((a: any) => a._id !== coupon._id),
        };
      });

      return toast.success(`${coupon.name} deleted!`);
    } catch (err: any) {
      console.log(err);
      toast.error(err || "Something went wrong!");
    }
  }

  return (
    <tr>
      <td>
        <div className="d-flex gap-2 items-center">
          <Image
            className="rounded-circle"
            width={50}
            height={50}
            src={coupon.image.link}
            alt="Icon"
          />
          <span className="text-secondary">{coupon.name}</span>
        </div>
      </td>
      <td>{coupon.code}</td>
      <td>
        {coupon.type === "fixed"
          ? `${formatCurrency(coupon.discount)}`
          : `${coupon.discount}%`}
      </td>
      <td>{new Date(coupon.createdAt).toLocaleString()}</td>
      <td>{new Date(coupon.expiresAt).toLocaleString()}</td>
      <td>{Date.now() > coupon.expiresAt ? "Expired" : "Active"}</td>
      <td>
        <div className="d-flex gap-3">
          <button
            data-bs-toggle="offcanvas"
            data-bs-target="#couponCanvas"
            aria-controls="couponCanvas"
            type="button"
            onClick={() => setSelectedCoupon(coupon)}
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
