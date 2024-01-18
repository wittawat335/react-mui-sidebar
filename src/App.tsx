import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Dashboard from "./pages/admin/Dashboard";
import { Header, SideBar } from "./components/layouts";

function App() {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <>
      <CssBaseline />
      <div className="app">
        <SideBar isSidebar={isSidebar} />
        <main className="content">
          <Header />
          <div className="content_body">
            <Box m="20px">
              <Routes>
                <Route path="/admin" element={<Dashboard />} />
              </Routes>
            </Box>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
