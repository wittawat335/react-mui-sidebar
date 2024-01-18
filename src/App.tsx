import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import SideBar from "./components/layouts/SideBar";
import Header from "./components/layouts/Header";
import Dashboard from "./pages/admin/Dashboard";
import Manage from "./pages/admin/Manges";
import { Playground } from "./pages/Play";
import Manges from "./pages/admin/Manges";
import ToggleThemeButton from "./components/layouts/ToggleThemeButton";
import ResponsiveAppBar from "./components/layouts/ResponsiveAppBar";

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
        <SideBar collapsed={collapsed} isSidebar={isSidebar}></SideBar>
        <main className="content">
          <ResponsiveAppBar />
          {/* <Header setIsSidebar={setIsSidebar} /> */}
          <div className="content_body">
            <Box m="20px">
              <Routes>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/play" element={<Playground />} />
              </Routes>
            </Box>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
