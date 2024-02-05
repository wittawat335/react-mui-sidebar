import { Outlet, Navigate } from "react-router-dom";
import "../styles/globals.css";
import { useAppSelector } from "@/hooks/hooks";

const AuthRoutes = () => {
  const isLogin = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      {isLogin ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10 bg-dark-1 text-white">
            <Outlet />
          </section>
          <img
            src="/assets/images/sign.png"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
};

export default AuthRoutes;
