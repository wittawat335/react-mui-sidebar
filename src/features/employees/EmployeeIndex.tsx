import { useState } from "react";
import { IUser } from "@/types/User";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/ui/Loader";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useGetEmployeesQuery } from "./employeeApi";
import Employees from "./Employees";
import EmployeeForm from "./DialogForm";
import { IEmployee } from "@/types/Employee";

const UserIndex = () => {
  const [title, setTitle] = useState("New");
  const [openDialog, setOpenDialog] = useState(false);
  const [isAction, setIsAction] = useState("New");
  const [dataToEdit, setDataToEdit] = useState<IEmployee | undefined>(
    undefined
  );
  const { data, isError, error, isFetching, isLoading, isSuccess } =
    useGetEmployeesQuery();
  const navigate = useNavigate();

  if (isError) {
    console.log({ error });
    navigate("/unauthorized");
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  const handleNew = () => {
    setTitle("New");
    setIsAction("New");
    setDataToEdit(undefined);
    handleOpenDialog();
  };

  const handleUpdate = (id: string) => {
    setTitle("Update");
    setIsAction("Edit");
    setDataToEdit(data?.find((item) => item.id === id));
    handleOpenDialog();
  };

  const handleView = (id: string) => {
    setTitle("View");
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
          <Employees
            data={data}
            handleNew={handleNew}
            handleUpdate={handleUpdate}
            handleView={handleView}
          />
        ) : null}

        {/* <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <span>{title}</span>
            <IconButton style={{ float: "right" }} onClick={handleCloseDialog}>
              <CancelIcon color="inherit" fontSize="large" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <EmployeeForm
              isAction={isAction}
              dataToEdit={dataToEdit}
              onClose={handleCloseDialog}
            />
          </DialogContent>
        </Dialog> */}
      </Container>
    </>
  );
};

export default UserIndex;
