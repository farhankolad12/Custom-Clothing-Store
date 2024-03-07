"use client";

import withAuth from "@/app/utils/PrivateRoutes";
import React from "react";

function Page() {
  return <div>Hello</div>;
}

export default withAuth(Page);
