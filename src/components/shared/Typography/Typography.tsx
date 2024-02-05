import { Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

const TypographyCustom: FC<TypographyProps> = (props) => {
    return (
      <Typography {...props}>
        {props.children}
      </Typography>
    );
  };

export default TypographyCustom;
