import { HeaderBar, SideBar } from "@/components/layouts";
import { useAppSelector } from "@/lib/redux/store";
import { Box, CssBaseline } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";
import "../index.css";

const PrivateRoutes = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
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
