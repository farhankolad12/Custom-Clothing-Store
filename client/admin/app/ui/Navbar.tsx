"use client";

import { useState } from "react";
import SideNav from "./SideNav";

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <nav style={{ backgroundColor: "#1f2937" }}>
        <div className="container-fluid px-5 d-flex justify-content-between align-items-center py-3 text-success">
          <button
            onClick={() => setOpenNav((prev) => !prev)}
            type="button"
            className="btn p-0"
          >
            <i className="bi bi-list text-success fw-bold fs-5" />
          </button>
          <div className="d-flex  gap-3 align-items-center">
            <i className="bi bi-bell text-success fw-bold fs-5" />
            <i className="bi bi-person text-success fw-bold fs-5" />
          </div>
        </div>
      </nav>
      {openNav && <SideNav setOpenNav={setOpenNav} />}
    </>
  );
}
