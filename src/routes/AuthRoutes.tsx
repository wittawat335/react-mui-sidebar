import { Outlet } from "react-router-dom";
import "../styles/globals.css";

const AuthRoutes = () => {
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
