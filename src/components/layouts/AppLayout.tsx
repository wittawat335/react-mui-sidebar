import { Box, CssBaseline } from "@mui/material";
import SideBar from "./SideBar";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/lib/redux/store";
import HeaderBar from "./HeaderBar";
import "react-toastify/dist/ReactToastify.css";
import "../layouts/style/index.css";

export default function AppLayout() {
  return (
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
  );
}
