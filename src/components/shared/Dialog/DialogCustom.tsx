import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTitleProps,
  IconButton,
} from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";

type DialogProps = {
  open: boolean;
  title: string;
  data: undefined;
  closepopup: () => void;
};

const DialogCustom: FC<DialogProps> = ({ open, closepopup, title }) => {
  return (
    <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
      <DialogTitle>
        <span>{title}</span>
      </DialogTitle>
      <DialogContent>
        <div>test</div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCustom;
