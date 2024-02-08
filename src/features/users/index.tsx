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
import { useAppSelector } from "@/hooks/hooks";
import { IUser } from "@/types/User";

const UserIndex = () => {
  const [title, setTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const users = useAppSelector((state) => state.user);
  const [dataToEdit, setDataToEdit] = useState<IUser | undefined>(undefined);

  const { data, isError, error, isFetching, isLoading, isSuccess } =
    useGetUsersQuery();

  if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  const handleNewUser = () => {
    setTitle("New User");
    setIsEdit(false);
    setDataToEdit(undefined);
    handleOpenDialog();
  };

  const handleUpdateUser = (id: string) => {
    setTitle("Update User");
    setIsEdit(true);
    setDataToEdit(data?.find((item) => item.id === id));
    handleOpenDialog();
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Container maxWidth={false} sx={{ p: 2 }}>
        {isSuccess ? (
          <UserList
            data={data}
            handleNewUser={handleNewUser}
            handleUpdateUser={handleUpdateUser}
          />
        ) : null}
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
            <MuiForm data={dataToEdit} isEdit={isEdit} onClose={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default UserIndex;
