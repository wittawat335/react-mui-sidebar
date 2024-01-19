import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <CssBaseline />
      <div className="app">
        <SideBar />
        <main className="content">
          <Header />
          <div className="content_body">
            <Box m="20px">
              <ToastContainer />
              <Outlet />
            </Box>
          </div>
        </main>
      </div>
    </>
  );
}
