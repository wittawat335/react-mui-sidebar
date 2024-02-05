import { TablePagination, TablePaginationProps } from "@mui/material";
import { FC, useState } from "react";

const TablePaginationCustom: FC<TablePaginationProps> = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      {...props}
    />
  );
};

export default TablePaginationCustom;
