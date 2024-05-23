import usePostReq from "@/app/hooks/usePostReq";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Setting({ data }: { data: any }) {
  const [logo, setLogo] = useState<any>(
    data.homePageContent ? data.homePageContent.logo : undefined
  );

  const { error, execute, loading } = usePostReq("/update-logo");

  useEffect(() => {
    if (data?.logo) {
      setLogo(data ? data.logo : undefined);
    }
  }, [data]);

  async function handleChanges() {
    if (!logo) {
      return toast.error("Please Select a logo");
    }
    const formData = new FormData();

    if (logo.id) {
      formData.append("logo", JSON.stringify(logo));
    } else {
      formData.append("logo", logo);
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
              onClick={handleChanges}
              className="btn btn-success d-flex mt-4 px-5 py-2 ms-auto me-5"
            >
              Save Changes
            </button>
          </section>
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
}
