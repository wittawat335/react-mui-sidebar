import { useDeleteUser } from "@/lib/react-query/queries";
import { TableCell, TableRow } from "@mui/material";
import { IUser } from "@/types/User";
import { FC } from "react";
import { MuiButton } from "@/components/shared";

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
      <TableCell>{users.active}</TableCell>
      <TableCell>
        <MuiButton color="success">Edit</MuiButton>
        {users.id ? (
          <MuiButton onClick={() => handleDelete(users.id)} color="error">
            Delete
          </MuiButton>
        ) : null}
      </TableCell>
    </TableRow>
  );
};
