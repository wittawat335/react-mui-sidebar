import { HeaderBar, SideBar } from "@/layouts";
import { useAppSelector } from "@/lib/store/store";
import { Box, CssBaseline } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";
import "../styles/index.css";

const PrivateRoutes = () => {
  const isLogin = useAppSelector((state) => state.auth_reducer.isLogin);
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
