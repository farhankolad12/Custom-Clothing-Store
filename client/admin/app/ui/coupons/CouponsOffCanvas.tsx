import usePostReq from "@/app/hooks/usePostReq";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function CouponsOffCanvas({
  selectedCoupon,
  setSelectedCoupon,
  setCoupon,
}: {
  selectedCoupon: any;
  setSelectedCoupon: Function;
  setCoupon: Function;
}) {
  const [selectedType, setSelectedType] = useState(
    selectedCoupon ? selectedCoupon.type : "fixed"
  );
  const [couponImage, setCouponImage] = useState<File | any>(
    selectedCoupon ? selectedCoupon.image : undefined
  );
  const [usagePerCustomer, setUsagePerCustomer] = useState(
    selectedCoupon
      ? selectedCoupon.isOneTime
        ? "one-time"
        : "multiple"
      : "multiple"
  );

  const { error, execute, loading } = usePostReq("/coupon");

  const couponNameRef = useRef<HTMLInputElement>(null!);
  const couponCodeRef = useRef<HTMLInputElement>(null!);
  const couponExpireRef = useRef<HTMLInputElement>(null!);
  const couponDiscountRef = useRef<HTMLInputElement>(null!);
  const couponMinimumRef = useRef<HTMLInputElement>(null!);
  const maximumDiscountRef = useRef<HTMLInputElement>(null!);
  const couponDescriptionRef = useRef<HTMLTextAreaElement>(null!);

  useEffect(() => {
    if (selectedCoupon) {
      setCouponImage(JSON.stringify(selectedCoupon.image));
      setSelectedType(selectedCoupon.type);
      setUsagePerCustomer(
        selectedCoupon
          ? selectedCoupon.isOneTime
            ? "one-time"
            : "multiple"
          : "multiple"
      );
    } else {
      setCouponImage(undefined);
    }
  }, [selectedCoupon]);

  async function handleSubmit(e: FormEvent) {
    // e.preventDefault();

    if (!couponImage) {
      return toast.error("Please add image!", { position: "top-left" });
    }

    try {
      const formData = new FormData();

      formData.append(
        "image",
        couponImage.id ? JSON.stringify(couponImage) : couponImage
      );
      formData.append("name", couponNameRef.current.value);
      formData.append("code", couponCodeRef.current.value);
      formData.append("expiresAt", couponExpireRef.current.value);
      formData.append("type", selectedType);
      formData.append("usagePerCustomer", usagePerCustomer);
      formData.append("discount", couponDiscountRef.current.value);
      formData.append("minimumCartValue", couponMinimumRef.current.value);
      formData.append("description", couponDescriptionRef.current.value);
      formData.append(
        "maximumDiscount",
        selectedType === "percentage" ? maximumDiscountRef.current.value : ""
      );

      if (selectedCoupon) {
        formData.append("_id", selectedCoupon._id);
      }

      const res = await execute(formData);

      if (!res?.success) {
        return toast.error(res.message || error || "Something went wrong!", {
          position: "top-left",
        });
      }

      setCouponImage(undefined);
      couponNameRef.current.value = "";
      couponCodeRef.current.value = "";
      couponExpireRef.current.value = "";
      setSelectedType("fixed");
      couponDiscountRef.current.value = "";
      couponMinimumRef.current.value = "";
      couponDescriptionRef.current.value = "";

      if (selectedCoupon) {
        toast.success("Changes Saved!", {
          position: "top-left",
        });

        return setCoupon((prev: { coupons: any[] }) => {
          return {
            ...prev,
            coupons: prev.coupons.map((a: any) =>
              a._id === selectedCoupon._id ? res?.coupon : a
            ),
          };
        });
      }

      setCoupon((prev: { coupons: any[] }) => ({
        ...prev,
        coupons: [res?.coupon, ...prev.coupons],
      }));

      toast.success("Changes Saved!", {
        position: "top-left",
      });
    } catch (err: any) {
      console.log(err);
      toast.error(err || "Something went wrong");
    }
  }

  return (
    <div
      style={{ backgroundColor: "#374151" }}
      className="offcanvas w-lg-50 offcanvas-end text-light"
      data-bs-backdrop="static"
      tabIndex={-1}
      id="couponCanvas"
      aria-labelledby="couponCanvasLabel"
    >
      <div
        style={{ backgroundColor: "#1f2937" }}
        className="offcanvas-header py-4"
      >
        <div>
          <h5 className="offcanvas-title" id="couponCanvasLabel">
            Add Coupon
          </h5>
          <span>Add your coupon and necessary information from here</span>
        </div>
        <button
          type="button"
          className="ms-auto btn p-0 text-light"
          data-bs-dismiss="offcanvas"
          onClick={() => setSelectedCoupon(undefined)}
          aria-label="Close"
        >
          <i className="bi bi-x-lg fs-5" />
        </button>
      </div>
      <div className="offcanvas-body">
        <form className="mt-4 d-flex flex-column gap-4">
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="banner-img" className="text-secondary">
              Coupon Banner Image
            </label>
            <input
              type="file"
              onChange={(e) => setCouponImage(e.target.files?.[0])}
              id="banner-img"
              className="form-control w-lg-50"
            />
          </div>
          {couponImage && (
            <div className="ms-auto w-lg-50">
              <Image
                unoptimized
                src={
                  typeof couponImage === "string"
                    ? JSON.parse(couponImage).link
                    : URL.createObjectURL(couponImage)
                }
                alt="Coupon"
                width={0}
                height={300}
                className="w-100"
              />
            </div>
          )}
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="name" className="text-secondary">
              Coupon Name
            </label>
            <input
              type="text"
              ref={couponNameRef}
              defaultValue={selectedCoupon ? selectedCoupon.name : ""}
              placeholder="Coupon Name"
              id="name"
              className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
            />
          </div>
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="description" className="text-secondary">
              Coupon Description
            </label>
            <textarea
              rows={5}
              ref={couponDescriptionRef}
              defaultValue={selectedCoupon ? selectedCoupon.description : ""}
              placeholder="Coupon Description"
              id="description"
              className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
            />
          </div>
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="coupon-code" className="text-secondary">
              Coupon Code
            </label>
            <input
              id="coupon-code"
              required
              defaultValue={selectedCoupon ? selectedCoupon.code : ""}
              ref={couponCodeRef}
              //   onChange={(e) => setCatImg(e.target.files?.[0])}
              type="text"
              placeholder="Coupon Code"
              className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
            />
          </div>
          <div className="d-flex flex-lg-row flex-column gap-3 w-100 justify-content-between">
            <label htmlFor="usage" className="text-secondary w-100">
              Usage Per Customer
            </label>
            <div className="d-flex w-100 gap-5">
              <div className="d-flex align-items-center gap-1">
                <label htmlFor="one-time">One Time</label>
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      setUsagePerCustomer("one-time");
                    }
                  }}
                  checked={usagePerCustomer === "one-time"}
                  value="one-time"
                  type="radio"
                  name="coupon-usage"
                  id="one-time"
                />
              </div>
              <div className="d-flex align-items-center gap-1">
                <label htmlFor="multiple">Multiple</label>
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      setUsagePerCustomer("multiple");
                    }
                  }}
                  checked={usagePerCustomer === "multiple"}
                  value="multiple"
                  type="radio"
                  name="coupon-usage"
                  id="multiple"
                />
              </div>
            </div>
          </div>
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="coupon-expire" className="text-secondary">
              Coupon Validity Time
            </label>
            <input
              id="coupon-expire"
              required
              ref={couponExpireRef}
              //   onChange={(e) => setCatImg(e.target.files?.[0])}
              type="datetime-local"
              defaultValue={selectedCoupon ? selectedCoupon.expiresAt : ""}
              className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
            />
          </div>
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="coupon-type" className="w-100 text-secondary">
              Discount Type
            </label>
            <div className="d-flex w-100 gap-5">
              <div className="d-flex items-center gap-1">
                <label htmlFor="fixed">Fixed</label>
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedType("fixed");
                    }
                  }}
                  checked={selectedType === "fixed"}
                  value="fixed"
                  type="radio"
                  name="coupon-type"
                  id="fixed"
                />
              </div>
              <div className="d-flex items-center gap-1">
                <label htmlFor="percentage">Percentage</label>
                <input
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedType("percentage");
                    }
                  }}
                  checked={selectedType === "percentage"}
                  value="percentage"
                  type="radio"
                  name="coupon-type"
                  id="percentage"
                />
              </div>
            </div>
          </div>
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="coupon-discount" className="text-secondary">
              Discount
            </label>
            {selectedType === "fixed" ? (
              <input
                id="coupon-discount"
                required
                ref={couponDiscountRef}
                defaultValue={selectedCoupon ? selectedCoupon.discount : ""}
                type="number"
                placeholder="Fixed Amount $"
                className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
              />
            ) : (
              <div className="d-flex flex-column gap-3 w-lg-50">
                <input
                  id="coupon-discount"
                  required
                  defaultValue={selectedCoupon ? selectedCoupon.discount : ""}
                  ref={couponDiscountRef}
                  type="number"
                  placeholder="Percentage %"
                  className="form-control bg-transparent border-secondary text-light text-secondary"
                />
                <input
                  id="maximum-discount"
                  required
                  defaultValue={
                    selectedCoupon ? selectedCoupon.maximumDiscount : ""
                  }
                  placeholder="Maximum Discount Value ₹"
                  ref={maximumDiscountRef}
                  type="number"
                  className="form-control bg-transparent border-secondary text-light text-secondary"
                />
              </div>
            )}
          </div>
          <div className="d-flex flex-lg-row flex-column gap-3 justify-content-between">
            <label htmlFor="coupon-minimum" className="text-secondary">
              Minimum order value required
            </label>
            <input
              id="coupon-minumum"
              required
              ref={couponMinimumRef}
              defaultValue={
                selectedCoupon ? selectedCoupon.minimumCartValue : ""
              }
              //   onChange={(e) => setCatImg(e.target.files?.[0])}
              type="number"
              placeholder="Minimum amount required "
              className="form-control w-lg-50 bg-transparent border-secondary text-light text-secondary"
            />
          </div>
        </form>
      </div>
      <div style={{ backgroundColor: "#1f2937" }} className="offcanvas-footer">
        <div className="py-4 px-3 d-flex flex-lg-row flex-column gap-3">
          <button
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            type="button"
            className="btn btn-secondary w-100 py-2"
            onClick={() => setSelectedCoupon(undefined)}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            // type="submit"
            onClick={handleSubmit}
            className="btn btn-success w-100 py-2"
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Add Coupon"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
