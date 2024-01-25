import { Box, CssBaseline } from "@mui/material";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { setUser } from "@/lib/redux/slices/authSlice";
import "react-toastify/dist/ReactToastify.css";
import "../layouts/style/index.css";
import HeaderBar from "./HeaderBar";

export default function AppLayout() {
  const { auth } = useAppSelector((state) => state.auth);
  //const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth == null) {
      navigate("/sign-in");
    } else navigate("/");
  }, [auth]);

  return (
    <>
      <CssBaseline />
      <div className="app">
        <SideBar />
        <main className="content">
          <HeaderBar />
          <div className="content_body">
            <Box m="20px">
              <ToastContainer position="top-right" theme="dark" />
              <Outlet />
            </Box>
          </div>
        </main>
      </div>
    </>
  );
}
