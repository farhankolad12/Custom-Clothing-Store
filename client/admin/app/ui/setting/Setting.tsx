import usePostReq from "@/app/hooks/usePostReq";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Setting({ data }: { data: any }) {
  const [logo, setLogo] = useState<any>(
    data.homePageContent ? data.homePageContent.logo : undefined
  );
  const [shippingConfig, setShippingConfig] = useState(
    data.homePageContent.shippingConfig
      ? data.homePageContent.shippingConfig.shippingCharge === 0
        ? "free-delivery"
        : data.homePageContent.shippingConfig.minimumAmount
        ? "free-condition"
        : "fixed-charge-delivery"
      : "free-delivery"
  );

  const { error, execute, loading } = usePostReq("/update-logo");

  const {
    error: _error,
    execute: updateShippingConfig,
    loading: _loading,
  } = usePostReq("/shipping-config");

  const minimumAmountRef = useRef<HTMLInputElement>(null!);
  const fixedDeliveryRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (data?.homePageContent?.logo) {
      setLogo(data ? data.homePageContent?.logo : undefined);
    }

    if (data?.homePageContent?.shippingConfig) {
      setShippingConfig(
        data.homePageContent.shippingConfig.shippingCharge === 0
          ? "free-delivery"
          : data.homePageContent.shippingConfig.minimumAmount
          ? "free-condition"
          : "fixed-charge-delivery"
      );
    }
  }, [data]);

  async function handleChanges(changeType: string, data: any) {
    if (!data) {
      return toast.error("Please Select a logo");
    }
    const formData = new FormData();

    if (data.id) {
      formData.append(changeType, JSON.stringify(data));
    } else {
      formData.append(changeType, data);
    }

    try {
      const res = await execute(formData);

      if (!res?.success) {
        return toast.error(
          res.message || JSON.stringify(error) || "Something went wrong!"
        );
      }

      return toast.success("Changes Saved");
    } catch (err: any) {
      console.log(err);
    }
  }

  async function handleShippingConfig() {
    const shippingCharge = fixedDeliveryRef.current?.value;
    const minimumAmount = minimumAmountRef.current?.value;

    if (
      (shippingConfig === "free-condition" &&
        (shippingCharge === "" || minimumAmount === "")) ||
      (shippingConfig === "fixed-charge-delivery" && shippingCharge === "")
    ) {
      return toast.error("Please enter prices");
    }

    try {
      const res = await updateShippingConfig({
        type: shippingConfig,
        shippingConfig:
          shippingConfig === "free-delivery"
            ? { shippingCharge: 0 }
            : shippingConfig === "free-condition"
            ? {
                shippingCharge,
                minimumAmount,
              }
            : { shippingCharge },
      });

      if (!res?.success) {
        return toast.error(
          res.message || JSON.stringify(_error) || "Something went wrong!"
        );
      }

      return toast.success("Changes Saved");
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div
      className="tab-pane fade"
      id="pills-settings"
      role="tabpanel"
      aria-labelledby="pills-settings-tab"
      tabIndex={0}
    >
      <div className="p-4" style={{ backgroundColor: "#1f2937" }}>
        {data.homePageContent ? (
          <section className="text-secondary fw-bold ">
            <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
              <i className="bi bi-gear" />
              <strong className="fw-bold">Update Logo</strong>
            </div>
            <div className="mt-4 d-flex flex-column gap-5 px-1 px-lg-5">
              <div className="d-flex justify-content-between w-100 gap-1 flex-lg-row flex-column">
                <label htmlFor="logo" className="w-100">
                  Logo
                </label>
                <div className="w-100 d-flex flex-column gap-4">
                  <input
                    onChange={(e) => setLogo(e.target.files?.[0])}
                    type="file"
                    id="logo"
                    className="form-control "
                  />
                  {logo && (
                    <Image
                      src={logo.id ? logo.link : URL.createObjectURL(logo)}
                      alt="Logo"
                      width={200}
                      height={200}
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              disabled={loading}
              type="button"
              onClick={() => handleChanges("logo", logo)}
              className="btn btn-success d-flex mt-4 px-5 py-2 ms-auto me-5"
            >
              Save Changes
            </button>
          </section>
        ) : (
          "loading"
        )}
        <section className="text-secondary fw-bold ">
          <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
            <i className="bi bi-gear" />
            <strong className="fw-bold">Shipping Setting</strong>
          </div>
          <div className="mt-4 d-flex flex-column gap-5 px-1 px-lg-5">
            <div className="d-flex justify-content-between w-100 gap-1 flex-lg-row flex-column">
              <label htmlFor="shipping-charges" className="w-100">
                Shipping Charges
              </label>
              <div className="w-100 d-flex flex-column gap-4">
                <div className="d-flex gap-2 align-items-center">
                  <input
                    onChange={(e) => setShippingConfig(e.target.value)}
                    value="free-delivery"
                    type="radio"
                    name="shipping-charges"
                    checked={shippingConfig === "free-delivery"}
                    id="free-delivery"
                  />
                  <label htmlFor="free-delivery">
                    Free Delivery for all orders
                  </label>
                </div>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      name="shipping-charges"
                      id="free-condition"
                      onChange={(e) => setShippingConfig(e.target.value)}
                      value="free-condition"
                      checked={shippingConfig === "free-condition"}
                    />
                    <label htmlFor="free-condition">
                      Free Delivery above a certain bill amount
                    </label>
                  </div>
                  {shippingConfig === "free-condition" && (
                    <>
                      <input
                        type="number"
                        ref={fixedDeliveryRef}
                        className="form-control bg-transparent text-white"
                        placeholder="Enter fixed delivery charge"
                        defaultValue={
                          data?.homePageContent?.shippingConfig
                            ?.shippingCharge || ""
                        }
                      />
                      <input
                        type="number"
                        ref={minimumAmountRef}
                        className="form-control bg-transparent text-white"
                        placeholder="Enter minimum bill amount"
                        defaultValue={
                          data?.homePageContent?.shippingConfig
                            ?.minimumAmount || ""
                        }
                      />
                    </>
                  )}
                </div>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      name="shipping-charges"
                      id="fixed-charge-delivery"
                      onChange={(e) => setShippingConfig(e.target.value)}
                      value="fixed-charge-delivery"
                      checked={shippingConfig === "fixed-charge-delivery"}
                    />
                    <label htmlFor="fixed-charge-delivery">
                      Fixed Delivery charge for all orders
                    </label>
                  </div>
                  {shippingConfig === "fixed-charge-delivery" && (
                    <input
                      type="number"
                      defaultValue={
                        data?.homePageContent?.shippingConfig?.shippingCharge ||
                        ""
                      }
                      ref={fixedDeliveryRef}
                      className="form-control bg-transparent text-white"
                      placeholder="Enter fixed delivery charge"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            disabled={_loading}
            type="button"
            onClick={handleShippingConfig}
            className="btn btn-success d-flex mt-4 px-5 py-2 ms-auto me-5"
          >
            {_loading ? "..." : "Save Changes"}
          </button>
        </section>
      </div>
    </div>
  );
}
