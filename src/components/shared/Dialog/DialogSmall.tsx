import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  makeStyles,
} from "@mui/material";
import { FC } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

type DialogProps = {
  title: string;
  children: React.ReactNode;
  openPopup: boolean;
  setOpenPopup: (open: boolean) => void;
};

const DialogSmall: FC<DialogProps> = (props) => {
  const { title, children, openPopup, setOpenPopup } = props;
  return (
    <Dialog
      open={openPopup}
      onClose={() => {
        setOpenPopup(false);
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            style={{ float: "right" }}
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CancelIcon color="inherit" fontSize="large" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogSmall;
