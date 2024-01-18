import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Dashboard from "./pages/admin/Dashboard";
import { Header, SideBar } from "./components/layouts";

type Theme = "light" | "dark";
const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      hover: {
        backgroundColor: "#c5e4ff",
        color: "#44596e",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};
function App() {
  const [isSidebar, setIsSidebar] = useState(true);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <>
      <CssBaseline />
      <div className="app">
        <SideBar collapsed={collapsed} isSidebar={isSidebar} />
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
