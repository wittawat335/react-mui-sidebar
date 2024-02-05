import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { FC } from "react";

const MuiLoadingButton: FC<LoadingButtonProps> = (props) => {
    return (
      <LoadingButton variant="contained" {...props}>
        {props.children}
      </LoadingButton>
    );
  };

export default MuiLoadingButton;
