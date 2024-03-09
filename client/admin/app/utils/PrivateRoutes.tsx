import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";

const withAuth = (Component: any) => {
  const Auth = () => {
    const router = useRouter();
    const { currentUser } = useAuth();

    if (!currentUser) {
      return router.replace("/login");
      // return <Login />;
    }

    return <Component />;
  };

  return Auth;
};

export default withAuth;
