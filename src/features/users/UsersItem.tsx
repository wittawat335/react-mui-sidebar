import { useDeleteUser } from "@/lib/react-query/queries";
import { Button, TableCell, TableRow } from "@mui/material";
import { IUser } from "@/types/User";
import { FC } from "react";

interface UsersItemProps {
  users: IUser;
}

export const UsersItem: FC<UsersItemProps> = ({ users }) => {
  const deleteUserMutation = useDeleteUser();
  const handleDelete = (id: string) => deleteUserMutation.mutate(id);
  return (
    <TableRow key={users.id}>
      <TableCell>{users.username}</TableCell>
      <TableCell>{users.fullname}</TableCell>
      <TableCell>{users.email}</TableCell>
      <TableCell>{users.roles}</TableCell>
      <TableCell>{users.active ? "Active" : "InActive"}</TableCell>
      <TableCell>
        <Button variant="contained" color="success">
          Edit
        </Button>
        {users.id ? (
          <Button
            onClick={() => handleDelete(users.id)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        ) : null}
      </TableCell>
    </TableRow>
  );
};
