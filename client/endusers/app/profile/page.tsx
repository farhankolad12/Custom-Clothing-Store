"use client";

import { useAuth } from "../context/AuthProvider";
import withAuth from "../utils/PrivateRoutes";

function Page() {
  const { currentUser } = useAuth();

  return (
    <div>
      Hello (not {currentUser?.fname}? Log out) From your account dashboard you
      can view your recent orders, manage your shipping and billing addresses,
      and edit your password and account details.
    </div>
  );
}

export default withAuth(Page);
