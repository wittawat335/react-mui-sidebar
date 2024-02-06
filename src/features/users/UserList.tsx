import { MuiButton, TypographyCustom } from "@/components/shared";
import { Box, Paper, Rating } from "@mui/material";
import { ChangeEvent, useState, MouseEvent } from "react";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useDeleteUserMutation } from "./userApi";
import { IUser } from "@/types/User";

type Props = {
  data: Array<IUser>;
  newUser: (e: MouseEvent<HTMLButtonElement>) => void;
};

const UserList = ({ data, newUser }: Props) => {
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const columns = [
    {
      name: "username",
      label: "UserName",
    },
    {
      name: "fullname",
      label: "FullName",
    },
    {
      name: "email",
      label: "E-Mail",
    },
    {
      name: "roles",
      label: "Role",
    },
    {
      name: "active",
      label: "Active",
      options: {
        customBodyRender: (value: boolean) => (
          <p
            className={`capitalize px-3 py-1 inline-block rounded-full text-slate-50 ${
              value === true ? "bg-green-600" : "bg-rose-600"
            }`}
          >
            {value === true ? <FaCheck /> : <FaXmark />}
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
              <MuiButton color="inherit">Edit</MuiButton>
              <MuiButton onClick={() => handleDelete(id)} color="error">
                Delete
              </MuiButton>
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

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Box display="flex">
          <Box sx={{ flexGrow: 1 }}>
            <TypographyCustom variant="h6" gutterBottom component="div">
              User
            </TypographyCustom>
          </Box>
          <Box>
            <MuiButton onClick={newUser}> Add New (+)</MuiButton>
          </Box>
        </Box>
        <MUIDataTable
          title={"User List"}
          data={data}
          columns={columns}
          options={options}
        />
      </Paper>
    </>
  );
};

export default UserList;
