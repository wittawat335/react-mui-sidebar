import {
  Box,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useUsers } from "@/lib/react-query/queries";
import { UsersItem } from "@/features/users/UsersItem";
import Loader from "@/components/ui/Loader";
import { DialogCustom, MuiButton, TypographyCustom } from "@/components/shared";
import { useState } from "react";

const Users = () => {
  const [open, openchange] = useState(false);
  const [title, titlechange] = useState("New User");
  const { isPending, isSuccess, isError, data, error } = useUsers();
  console.log(data);

  const newUser = () => {
    titlechange("New User");
    openpopup();
  };
  const closepopup = () => {
    openchange(false);
  };
  const openpopup = () => {
    openchange(true);
  };

  if (isPending)
    return (
      <div>
        <Loader />
      </div>
    );
  if (isError) return `Error: ${error.message}`;

  const columns = [
    { id: "username", name: "Username" },
    { id: "fullName", name: "Fullname" },
    { id: "email", name: "Email" },
    { id: "role", name: "Role" },
    { id: "active", name: "Active" },
    { id: "action", name: "Action" },
  ];

  return (
    <>
      <Container maxWidth="xl" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <TypographyCustom variant="h6" gutterBottom component="div">
                Users
              </TypographyCustom>
            </Box>
            <Box>
              <MuiButton onClick={newUser}> Add New (+)</MuiButton>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.name}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isSuccess
                  ? data?.map((item: any) => (
                      <UsersItem key={item.id} users={item} />
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
          <DialogTitle>
            <span>{title}</span>
          </DialogTitle>
          <DialogContent>
            <div>test</div>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default Users;
