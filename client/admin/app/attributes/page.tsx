"use client";

import withAuth from "../utils/PrivateRoutes";

function Page() {
  return (
    <>
      <main className="container">
        <h3 className="my-4 fs-5 fw-bold">Attributes</h3>
        <section>
          <div
            style={{ backgroundColor: "#1f2937" }}
            className="px-3 rounded py-4 d-flex flex-column flex-lg-row justify-content-between align-items-center"
          >
            <button type="button" className="btn btn-outline-success">
              <i className="bi bi-box-arrow-up text-success" /> Export
            </button>
            <button
              className="btn btn-success"
              data-bs-toggle="offcanvas"
              data-bs-target="#attribueCanvas"
              aria-controls="attribueCanvas"
            >
              <i className="bi bi-plus" /> Add attribute
            </button>
          </div>
          <div
            className="px-3 py-4 rounded my-4"
            style={{ backgroundColor: "#1f2937" }}
          >
            <input
              type="text"
              style={{ backgroundColor: "#374151" }}
              className="form-control text-white py-2"
              placeholder="Search..."
            />
          </div>
        </section>
        <div
          style={{ backgroundColor: "#374151" }}
          className="offcanvas w-50 offcanvas-end"
          data-bs-backdrop="static"
          tabIndex={-1}
          id="attribueCanvas"
          aria-labelledby="attribueCanvasLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="attribueCanvasLabel">
              Offcanvas right
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">...</div>
        </div>
      </main>
    </>
  );
}

export default withAuth(Page);
