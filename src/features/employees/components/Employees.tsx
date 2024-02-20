import { IEmployee } from "@/types/Employee";
import { MouseEvent, useEffect } from "react";
import { useDeleteEmployeeMutation } from "../services/employeeApi";
import Swal from "sweetalert2";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { Box, ButtonGroup, Paper } from "@mui/material";
import { MuiButton } from "@/components/shared";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";

type Props = {
  data: Array<IEmployee>;
  handleNew: (e: MouseEvent<HTMLButtonElement>) => void;
  handleUpdate: (id: string) => void;
  handleView: (id: string) => void;
};

const Employees = ({ data, handleNew, handleUpdate, handleView }: Props) => {
  const [deleteEmployee, { isSuccess: deleteSuccess }] =
    useDeleteEmployeeMutation();

  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteEmployee(id);
        }
      });
    } catch (err) {
      console.error("Error deleting :", err);
    }
  };

  const columns = [
    {
      name: "fullName",
      label: "FullName",
    },
    {
      name: "phoneNumber",
      label: "PhoneNumber",
    },
    {
      name: "email",
      label: "E-Mail",
    },
    {
      name: "department",
      label: "Department",
      options: {
        customBodyRender: (value: string) => (
          <p
            className={`capitalize px-3 py-1 inline-block rounded-full text-slate-50 ${
              value === "User"
                ? "bg-green-500"
                : value === "Employee"
                ? "bg-teal-600"
                : value === "Manager"
                ? "bg-cyan-600"
                : value === "Administrator"
                ? "bg-sky-700"
                : "bg-indigo-600"
            }`}
          >
            {value}
          </p>
        ),
      },
    },
    {
      name: "active",
      label: "Active",
      options: {
        customBodyRender: (value: string) => (
          <p
            className={`capitalize px-3 py-1 inline-block rounded-full text-slate-50 ${
              value === "1" ? "bg-green-600" : "bg-rose-600"
            }`}
          >
            {value === "1" ? <FaCheck /> : <FaXmark />}
          </p>
        ),
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (id: string) => {
          return (
            <>
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <MuiButton onClick={() => handleUpdate(id)}>Edit</MuiButton>
                <MuiButton onClick={() => handleDelete(id)}>Delete</MuiButton>
              </ButtonGroup>
            </>
          );
        },
      },
    },
  ];

  const options: MUIDataTableOptions | undefined = {
    selectableRows: "none",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25, 100],
  };

  useEffect(() => {
    if (deleteSuccess) toast.success(messages.delete_success);
  }, [deleteSuccess]);

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Box display="flex" m={1}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box>
            <MuiButton onClick={handleNew} variant="contained" color="info">
              {" "}
              Add User
            </MuiButton>
          </Box>
        </Box>
        <MUIDataTable
          title={"List"}
          data={data}
          columns={columns}
          options={options}
        />
      </Paper>
    </>
  );
};

export default Employees;