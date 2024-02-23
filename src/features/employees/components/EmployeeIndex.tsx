import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breakpoint, Container } from "@mui/material";
import { useGetEmployeesQuery } from "../services/employeeApi";
import { IEmployee } from "@/types/Employee";
import EmployeeList from "./EmployeeList";
import EmployeeForm from "./EmployeeForm";
import Loader from "@/components/ui/Loader";
import DialogMedium from "@/components/shared/Dialog";

const Employee = () => {
  const [title, setTitle] = useState("New");
  const [maxWidth, setMaxWidth] = useState<Breakpoint | false>("sm");
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
    setTitle("New Employee");
    setIsAction("New");
    setMaxWidth("md");
    setDataToEdit(undefined);
    handleOpenDialog();
  };

  const handleUpdate = (id: string) => {
    setTitle("Update Employee");
    setIsAction("Edit");
    setDataToEdit(data?.find((item) => item.id === id));
    handleOpenDialog();
  };

  const handleView = (id: string) => {
    setTitle("View Employee");
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
          <EmployeeList
            data={data}
            handleNew={handleNew}
            handleUpdate={handleUpdate}
            handleView={handleView}
          />
        ) : null}

        <DialogMedium
          title={title}
          openPopup={openDialog}
          maxWidth={maxWidth}
          setOpenPopup={setOpenDialog}
        >
          <EmployeeForm
            isAction={isAction}
            dataToEdit={dataToEdit}
            onClose={handleCloseDialog}
          />
        </DialogMedium>
      </Container>
    </>
  );
};

export default Employee;
