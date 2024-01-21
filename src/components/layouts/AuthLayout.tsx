import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
      <Outlet />
      <ToastContainer position="top-right" theme="dark" />
    </>
  );
}
