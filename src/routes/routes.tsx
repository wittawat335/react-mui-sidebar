import { Route, Routes, createBrowserRouter } from "react-router-dom";
import { Dashboard, Home, Products, Users } from "@/pages/app";
import { SignIn, SignUp } from "@/pages/auth";
import { AppLayout, AuthLayout, SideBar } from "@/layouts";
import HeaderBar from "@/layouts/HeaderBar";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";

export const adminRoute = ({ children }: any) => {
  return (
    <div className="app">
      <SideBar />
      <main className="content">
        <HeaderBar />
        <div className="content_body">
          <Box m="20px">
            <Routes>{children}</Routes>
            <ToastContainer position="top-right" theme="dark" />
          </Box>
        </div>
      </main>
    </div>
  );
};

const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/user/index", element: <Users /> },
      { path: "/users/:id", element: <Users /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <Products /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
    ],
  },
]);
export default routes;
