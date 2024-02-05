import { Route, Routes } from "react-router-dom";
import { Dashboard, Home, Products, Users } from "./pages/app";
import { Login, Register } from "./pages/auth";
import { ToastContainer } from "react-toastify";
import { AuthRoutes, PrivateRoutes } from "./routes";
import Unauthorized from "./pages/Unauthorized";
import Error404 from "./pages/404";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* private routes */}
        <Route element={<PrivateRoutes />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
        </Route>
        {/* 404 & 401*/}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Error404 />} />
      </Routes>

      <ToastContainer position="top-right" theme="dark" />
    </main>
  );
}

export default App;
