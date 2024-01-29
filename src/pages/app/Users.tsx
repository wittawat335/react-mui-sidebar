import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useUsers } from "@/lib/react-query/queries";
import { IUser } from "@/types/User";
import { JSX } from "react/jsx-runtime";
import { UsersItem } from "@/features/users/UsersItem";

const Users = () => {
  const { isPending, isError, data: users, error } = useUsers();

  if (isPending) return <span>Loading ....</span>;
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
              <Typography variant="h6" gutterBottom component="div">
                Users
              </Typography>
            </Box>
            <Box>
              <Button variant="contained"> Add New (+)</Button>
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
                {!isPending
                  ? users?.map((item: any) => <UsersItem key={item.id} users={item} />)
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default Users;
