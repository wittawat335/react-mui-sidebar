import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "@/components/Loader";
import "react-toastify/dist/ReactToastify.css";
import "../../globals.css";

export default function AuthLayout() {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = false;

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : loading ? (
        <Loader />
      ) : (
        <main className="flex h-screen">
          <section className="flex flex-1 justify-center items-center flex-col py-10 bg-dark-1 text-white">
            <Outlet />
            <ToastContainer position="top-right" theme="dark" />
          </section>
          <img
            src="/assets/images/sign.png"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </main>
      )}
    </>
  );
}
