import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useGetUsersQuery } from "./userApi";
import { useState } from "react";
import { IUser } from "@/types/User";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";
import Loader from "@/components/ui/Loader";
import MuiForm from "./MuiForm";
import CloseIcon from "@mui/icons-material/Close";

const UserIndex = () => {
  const [title, setTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isAction, setIsAction] = useState("");
  const [dataToEdit, setDataToEdit] = useState<IUser | undefined>(undefined);
  const { data, isError, error, isFetching, isLoading, isSuccess } =
    useGetUsersQuery();
  const navigate = useNavigate();

  if (isError) {
    const { status, data }: any = error;
    console.log({ error });
    if (status == 401) navigate("/login");
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  const handleNewUser = () => {
    setTitle("New User");
    setIsAction("New");
    setDataToEdit(undefined);
    handleOpenDialog();
  };

  const handleUpdateUser = (id: string) => {
    setTitle("Update User");
    setIsAction("Edit");
    setDataToEdit(data?.find((item) => item.id === id));
    handleOpenDialog();
  };

  const handleViewUser = (id: string) => {
    setTitle("View User");
    setIsAction("View");
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
            handleViewUser={handleViewUser}
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
            <MuiForm
              isAction={isAction}
              dataToEdit={dataToEdit}
              onClose={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default UserIndex;
