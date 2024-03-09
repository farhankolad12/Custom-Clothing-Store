"use client";

import withAuth from "./utils/PrivateRoutes";

function Page() {
  return (
    <main>
      <h1 className="tex-9xl text-center mt-4">Admin</h1>
    </main>
  );
}

export default withAuth(Page);
