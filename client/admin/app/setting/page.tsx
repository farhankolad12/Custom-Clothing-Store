"use client";

import { toast } from "react-toastify";
import useGetReq from "../hooks/useGetReq";
import AboutPageSetting from "../ui/setting/AboutPageSetting";
import HomePageSetting from "../ui/setting/HomePageSetting";
import PrivacyPageSetting from "../ui/setting/PrivacyPageSetting";
import withAuth from "../utils/PrivateRoutes";
import Setting from "../ui/setting/Setting";

function Page() {
  const {
    data: homeData,
    error,
    loading,
  } = useGetReq("/home-page", {
    isAdmin: true,
  });

  const {
    data: aboutData,
    error: _error,
    loading: _loading,
  } = useGetReq("/about-page", {
    isAdmin: true,
  });

  const {
    data: privacyTermsData,
    error: __error,
    loading: __loading,
  } = useGetReq("/privacy-terms-page", {
    isAdmin: true,
  });

  const {} = useGetReq("/", {
    isAdmin: true,
  });

  if (error || _error || __error) {
    toast.error(error || _error || __error || "Something went wrong!");
  }

  return (
    <main className="container">
      <div className="d-flex flex-column gap-3 my-4">
        <h3 className="fw-bold text-white fs-4">Store Customizations</h3>
        <ul
          className="nav nav-pills mb-3 bg-secondary settings text-white rounded"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link w-100  border-black border-start border-end rounded-0 text-white active py-3"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Home Page
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link w-100  border-black border-start border-end rounded-0 text-white py-3"
              id="pills-about-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-about"
              type="button"
              role="tab"
              aria-controls="pills-about"
              aria-selected="false"
            >
              About Us
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link w-100  border-black border-start border-end rounded-0 text-white py-3"
              id="pills-privacy-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-privacy"
              type="button"
              role="tab"
              aria-controls="pills-privacy"
              aria-selected="false"
            >
              Privacy Policy and T&C
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link w-100  border-black border-start border-end rounded-0 text-white py-3"
              id="pills-settings-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-settings"
              type="button"
              role="tab"
              aria-controls="pills-settings"
              aria-selected="false"
            >
              Settings
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          {loading || _loading || __loading ? (
            "loading..."
          ) : (
            <>
              <HomePageSetting data={homeData} />
              <AboutPageSetting data={aboutData} />
              <PrivacyPageSetting data={privacyTermsData} />
              <Setting data={homeData} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default withAuth(Page);
