import usePostReq from "@/app/hooks/usePostReq";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PrivacyPageSetting({ data }: { data: any }) {
  const [privacyPolicy, setPrivacyPolicy] = useState(data?.privacyPolicy || "");
  const [termsConditions, setTermsConditions] = useState(
    data?.termsConditions || ""
  );
  const [refundPolicy, setRefundPolicy] = useState(data?.refundPolicy || "");
  const [shippingPolicy, setShippingPolicy] = useState(
    data?.shippingPolicy || ""
  );

  const { error, execute, loading } = usePostReq("/privacy-terms-page");

  async function handleChanges() {
    try {
      const res = await execute({
        privacyPolicy,
        termsConditions,
        refundPolicy,
        shippingPolicy,
      });

      if (!res?.success) {
        return toast.error(res.message || error);
      }

      return toast.success("Changes saved!");
    } catch (err: any) {
      console.log(err);
      toast.error(err.toString());
    }
  }

  return (
    <div
      className="tab-pane fade"
      id="pills-privacy"
      role="tabpanel"
      aria-labelledby="pills-privacy-tab"
      tabIndex={0}
    >
      <div className="p-4" style={{ backgroundColor: "#1f2937" }}>
        <section className="text-secondary fw-bold ">
          <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
            <i className="bi bi-gear" />
            <strong className="fw-bold">Privacy Policy</strong>
          </div>
          <div className="mt-4 d-flex flex-column gap-5 px-1 px-lg-5">
            <div className="d-flex justify-content-between w-100 gap-1 flex-lg-row flex-column">
              <label htmlFor="privacy-policy" className="w-100">
                Privacy Policy
              </label>
              <div className="w-100">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_EDITOR_KEY}
                  initialValue={privacyPolicy}
                  onChange={(e) => setPrivacyPolicy(e.target.getContent())}
                />
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
        <section className="text-secondary fw-bold mt-5">
          <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
            <i className="bi bi-gear" />
            <strong className="fw-bold">Terms & Conditons</strong>
          </div>
          <div className="px-1 px-lg-5 mt-4 d-flex justify-content-between w-100 gap-1 flex-lg-row flex-column">
            <label htmlFor="privacy-policy" className="w-100">
              Terms & Conditons
            </label>
            <div className="w-100">
              <Editor
                apiKey={process.env.NEXT_PUBLIC_EDITOR_KEY}
                onChange={(e) => setTermsConditions(e.target.getContent())}
                initialValue={termsConditions}
              />
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
        <section className="text-secondary fw-bold mt-5">
          <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
            <i className="bi bi-gear" />
            <strong className="fw-bold">Refund/Cancellation Policy</strong>
          </div>
          <div className="px-1 px-lg-5 mt-4 d-flex justify-content-between w-100 gap-1 flex-lg-row flex-column">
            <label htmlFor="privacy-policy" className="w-100">
              Refund/Cancellation Policy
            </label>
            <div className="w-100">
              <Editor
                apiKey={process.env.NEXT_PUBLIC_EDITOR_KEY}
                onChange={(e) => setRefundPolicy(e.target.getContent())}
                initialValue={refundPolicy}
              />
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
        <section className="text-secondary fw-bold mt-5">
          <div className="d-flex gap-2 pb-2 border-bottom border-white align-items-center">
            <i className="bi bi-gear" />
            <strong className="fw-bold">Shipping Policy</strong>
          </div>
          <div className="px-1 px-lg-5 mt-4 d-flex justify-content-between w-100 gap-1 flex-lg-row flex-column">
            <label htmlFor="privacy-policy" className="w-100">
              Shipping Policy
            </label>
            <div className="w-100">
              <Editor
                apiKey={process.env.NEXT_PUBLIC_EDITOR_KEY}
                onChange={(e) => setShippingPolicy(e.target.getContent())}
                initialValue={shippingPolicy}
              />
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
      </div>
    </div>
  );
}
