import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Home, Products, Users } from "@/pages/app";
import { SignIn, SignUp } from "@/pages/auth";
import { AppLayout, AuthLayout } from "@/components/layouts";

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
