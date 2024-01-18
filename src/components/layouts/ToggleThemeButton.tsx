import { Button } from "@mui/material";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

interface ToggleThemeButtonProps {
  darkTheme: boolean;
  toggleTheme: () => void;
}

const ToggleThemeButton = ({
  darkTheme,
  toggleTheme,
}: ToggleThemeButtonProps) => {
  return (
    <div className="toggle-theme-btn">
      <Button onClick={toggleTheme}>
        {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
      </Button>
    </div>
  );
};

export default ToggleThemeButton;
