import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/lib/store/store";
import "../styles/globals.css";

const AuthRoutes = () => {
  const isLogin = useAppSelector((state) => state.auth_reducer.isLogin);
  return (
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
  );
};

export default AuthRoutes;
