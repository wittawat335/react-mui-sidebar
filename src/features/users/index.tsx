import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useGetUsersQuery } from "./userApi";
import { useState } from "react";
import UserList from "./UserList";
import Loader from "@/components/ui/Loader";
import MuiForm from "./MuiForm";
import CloseIcon from "@mui/icons-material/Close";

const UserIndex = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");

  const handleNewUser = () => {
    setTitle("New User");
    handleOpenDialog();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const { data, isError, error, isFetching, isLoading, isSuccess } =
    useGetUsersQuery();
  console.log(data);

  if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <>
      <Container maxWidth={false} sx={{ p: 2 }}>
        {isSuccess ? <UserList data={data} openDialog={handleNewUser} /> : null}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <span>{title}</span>
            <IconButton style={{ float: "right" }} onClick={handleCloseDialog}>
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <MuiForm />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default UserIndex;
