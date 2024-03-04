import { IDepartment } from "@/types/Department";
import { Breakpoint, Container } from "@mui/material";
import { useState } from "react";
import { useGetDepartmentsQuery } from "../services/departmentApi";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/ui/Loader";
import DepartmentList from "./DepartmentList";
import { MuiDialog } from "@/components/shared";
import DepartmentForm from "./DepartmentForm";

const DepartmentIndex = () => {
  const [title, setTitle] = useState("New");
  const [maxWidth, setMaxWidth] = useState<Breakpoint | false>("sm");
  const [openDialog, setOpenDialog] = useState(false);
  const [isAction, setIsAction] = useState("New");
  const [dataToEdit, setDataToEdit] = useState<IDepartment | undefined>(
    undefined
  );
  const { data, isError, error, isFetching, isLoading, isSuccess } =
    useGetDepartmentsQuery();
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (isError) {
    console.log({ error });
    navigate("/unauthorized");
  }

  if (isLoading || isFetching) return <Loader />;

  const handleNew = () => {
    setTitle("New Department");
    setIsAction("New");
    setDataToEdit(undefined);
    handleOpenDialog();
  };

  const handleUpdate = (id: string) => {
    setTitle("Update Department");
    setIsAction("Edit");
    setDataToEdit(data?.find((item) => item.id === id));
    handleOpenDialog();
  };

  const handleView = (id: string) => {
    setTitle("View Department");
    setIsAction("View");
    setDataToEdit(data?.find((item) => item.id === id));
    handleOpenDialog();
  };

  return (
    <>
      <Container maxWidth={false} sx={{ p: 2 }}>
        {isSuccess ? (
          <DepartmentList
            data={data}
            handleNew={handleNew}
            handleUpdate={handleUpdate}
            handleView={handleView}
          />
        ) : null}

        <MuiDialog
          title={title}
          openPopup={openDialog}
          maxWidth={maxWidth}
          setOpenPopup={setOpenDialog}
        >
          <DepartmentForm
            isAction={isAction}
            dataToEdit={dataToEdit}
            onClose={handleCloseDialog}
          />
        </MuiDialog>
      </Container>
    </>
  );
};

export default DepartmentIndex;
