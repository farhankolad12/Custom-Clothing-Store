"use client";

import withAuth from "@/app/utils/PrivateRoutes";
import React from "react";

function Page() {
  return (
    <div className="px-6 py-4 bg-gray-300 flex gap-5 lg:flex-row flex-col justify-between items-center">
      <span className="font-bold text-sm uppercase">
        no order has been made yet
      </span>
      <button className="bg-transparent px-5 border border-black uppercase text-sm font-bold hover:bg-black hover:text-white py-4">
        browse products
      </button>
    </div>
  );
}

export default withAuth(Page);
