import { Button, ButtonProps } from "@mui/material";
import { FC } from "react";

const MuiButton: FC<ButtonProps> = (props) => {
  return (
    <Button variant="contained" {...props}>
      {props.children}
    </Button>
  );
};

export default MuiButton;
