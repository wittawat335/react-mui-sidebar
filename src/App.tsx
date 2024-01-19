import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Dashboard from "./pages/admin/Dashboard";
import { Header, SideBar } from "./components/layouts";
import User from "./pages/users/Users";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";

function UnAuthApp() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

function AuthApp() {
  return (
    <>
      <CssBaseline />
      <div className="app">
        <SideBar />
        <main className="content">
          <Header />
          <div className="content_body">
            <Box m="20px">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<User />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Box>
          </div>
        </main>
      </div>
    </>
  );
}

function App() {
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
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<User />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Box>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
