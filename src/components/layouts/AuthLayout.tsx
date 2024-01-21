import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "../Loader";

export default function AuthLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Outlet />
      <ToastContainer position="top-right" theme="dark" />
    </>
  );
}
