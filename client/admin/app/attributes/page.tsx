"use client";

import AttributeOffCanvas from "../ui/attributes/AttributeOffCanvas";
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
          <div className="table-responsive">
            <table
              style={{ backgroundColor: "#1f2937" }}
              className="table border border-secondary table-dark"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>DISPLAY NAME</th>
                  <th>TYPE</th>
                  <th>VALUES</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </section>
        <AttributeOffCanvas />
      </main>
    </>
  );
}

export default withAuth(Page);
