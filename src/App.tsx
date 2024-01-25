import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard, Home, Users } from "./pages/app";
import { AppLayout, AuthLayout } from "./components/layouts";
import { SignIn } from "./pages/auth";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useAppSelector } from "./lib/redux/store";

function App() {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    } else navigate("/sign-in");
  }, [isLogin]);
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
        </Route>

        {/* private routes */}
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" />
    </main>
  );
}

export default App;
