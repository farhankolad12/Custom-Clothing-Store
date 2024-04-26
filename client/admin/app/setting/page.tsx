"use client";

import useGetReq from "../hooks/useGetReq";
import AboutPageSetting from "../ui/setting/AboutPageSetting";
import HomePageSetting from "../ui/setting/HomePageSetting";
import PrivacyPageSetting from "../ui/setting/PrivacyPageSetting";
import withAuth from "../utils/PrivateRoutes";

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
        </ul>
        <div className="tab-content" id="pills-tabContent">
          {loading || _loading ? (
            "loading..."
          ) : (
            <>
              <HomePageSetting data={homeData} />
              <AboutPageSetting data={aboutData} />
              <PrivacyPageSetting />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default withAuth(Page);
