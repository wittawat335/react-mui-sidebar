import { HeaderBar, SideBar } from "@/layouts";
import { Box, CssBaseline } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";
import "../styles/index.css";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useEffect } from "react";
import { setUser } from "@/lib/store/slices/authSlice";

const PrivateRoutes = () => {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(setUser(user))
  }, [])
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  //const isLogin = true;
  return isLogin ? (
    <>
      <CssBaseline />
      <div className="app">
        <SideBar />
        <main className="content">
          <HeaderBar />
          <div className="content_body">
            <Box m="20px">
              <Outlet />
            </Box>
          </div>
        </main>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
