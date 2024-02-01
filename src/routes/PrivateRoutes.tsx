import { HeaderBar, SideBar } from "@/layouts";
import { Box, CssBaseline } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "@/contexts/AuthContext";
import "../styles/index.css";

const PrivateRoutes = () => {
  const { isAuthenticated } = useUserContext();
  return isAuthenticated ? (
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
