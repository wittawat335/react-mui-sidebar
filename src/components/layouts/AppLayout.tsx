import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/authSlice";

export default function AppLayout() {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      //dispatch(setUser(auth));
      //("/auth");
    } else navigate("/");
  }, [auth.token]);

  return (
    <>
      <CssBaseline />
      <div className="app">
        <SideBar />
        <main className="content">
          <Header />
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
