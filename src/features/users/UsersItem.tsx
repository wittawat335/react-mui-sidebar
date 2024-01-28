import { IUser } from "@/types/User";
import { Button, TableCell, TableRow } from "@mui/material";
import React, { FC } from "react";

type Props = {};

const UsersItem: FC<IUser> = ({
  id,
  username,
  fullname,
  email,
  roles,
  active,
}) => {
  return (
    <TableRow key={id}>
      <TableCell>{username}</TableCell>
      <TableCell>{fullname}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{roles}</TableCell>
      <TableCell>{active ? "Active" : "InActive"}</TableCell>
      <TableCell>
        <Button variant="contained" color="success">
          Edit
        </Button>
        {id && (
          <Button variant="contained" color="error">
            Delete
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UsersItem;
