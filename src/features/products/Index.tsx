import { MuiButton, TypographyCustom } from "@/components/shared";
import { useGetAllProductQuery } from "@/services/api/prouductApi";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const AllProducts = () => {
  const { data, isError, isLoading, isSuccess } = useGetAllProductQuery();
  console.log(data);

  const columns = [
    { id: "title", name: "title" },
    { id: "brand", name: "brand" },
    { id: "category", name: "category" },
    { id: "description", name: "description" },
    { id: "thumbnail", name: "thumbnail" },
    { id: "price", name: "price" },
    { id: "stock", name: "stock" },
  ];

  if (isError) {
    return <h1>OOOhNoooo we got an error</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <TypographyCustom variant="h6" gutterBottom component="div">
                Products
              </TypographyCustom>
            </Box>
            <Box>
              <MuiButton> Add New (+)</MuiButton>
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
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default AllProducts;
