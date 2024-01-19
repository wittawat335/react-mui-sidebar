import { AppLayout, AuthLayout } from "@/components/layouts";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import { Dashboard } from "@/pages/admin";
import { Users } from "@/pages/users";
import { createBrowserRouter } from "react-router-dom";
import Products from "@/pages/products";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "users/:id", element: <Users /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <Products /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ index: true, element: <Login /> }],
  },
]);
export default routes;
