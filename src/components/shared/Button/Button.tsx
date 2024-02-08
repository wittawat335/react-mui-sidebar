import { Button, ButtonProps } from "@mui/material";
import { FC } from "react";

const MuiButton: FC<ButtonProps> = (props) => {
  return <Button {...props}>{props.children}</Button>;
};

export default MuiButton;
