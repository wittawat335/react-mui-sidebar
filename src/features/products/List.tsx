import { MuiButton, TypographyCustom } from "@/components/shared";
import { IProduct } from "@/types/Product";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import Item from "./Item";

type Props = {
  data: IProduct[] | undefined;
  isSuccess: boolean;
  newUser: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const List = ({ data, isSuccess, newUser }: Props) => {
  interface Column {
    id:
      | "title"
      | "brand"
      | "category"
      | "thumbnail"
      | "price"
      | "stock"
      | "description"
      | "action";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: "title", label: "Title" },
    { id: "brand", label: "Brand" },
    { id: "category", label: "Category" },
    { id: "thumbnail", label: "Thumbnail" },
    {
      id: "price",
      label: "Price",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "stock",
      label: "Stock",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    { id: "description", label: "Description", align: "center" },
    { id: "action", label: "Action" },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    <>
      <Paper sx={{ p: 2 }}>
        <Box display="flex">
          <Box sx={{ flexGrow: 1 }}>
            <TypographyCustom variant="h6" gutterBottom component="div">
              Products
            </TypographyCustom>
          </Box>
          <Box>
            <MuiButton onClick={newUser}> Add New (+)</MuiButton>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isSuccess
                ? data &&
                  data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item: any) => <Item product={item} />)
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default List;
