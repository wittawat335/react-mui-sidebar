import { IEmployee } from "@/types/Employee";
import { MouseEvent, useEffect } from "react";
import { useDeleteEmployeeMutation } from "./employeeApi";
import Swal from "sweetalert2";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { ButtonGroup } from "@mui/material";
import { MuiButton } from "@/components/shared";
import { MUIDataTableOptions } from "mui-datatables";
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
      name: "username",
      label: "UserName",
    },
    {
      name: "email",
      label: "E-Mail",
    },
    {
      name: "roles",
      label: "Role",
      options: {
        customBodyRender: (value: string[]) =>
          value.map((item) => (
            <p
              className={`capitalize px-3 py-1 inline-block rounded-full text-slate-50 ${
                item === "User"
                  ? "bg-green-500"
                  : item === "Employee"
                  ? "bg-teal-600"
                  : item === "Manager"
                  ? "bg-cyan-600"
                  : item === "Administrator"
                  ? "bg-sky-700"
                  : "bg-indigo-600"
              }`}
            >
              {item}
            </p>
          )),
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

  return <div>Employees</div>;
};

export default Employees;
