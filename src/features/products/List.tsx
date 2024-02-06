import { MuiButton, TypographyCustom } from "@/components/shared";
import { IProduct } from "@/types/Product";
import { Box, Paper, Rating, Switch } from "@mui/material";
import { ChangeEvent, useState, MouseEvent } from "react";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { BsCheck, BsCheck2 } from "react-icons/bs";

type Props = {
  data: Array<IProduct>;
  newUser: (e: MouseEvent<HTMLButtonElement>) => void;
};

const ProductList = ({ data, newUser }: Props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const columns = [
    {
      name: "thumbnail",
      label: "Image",
      options: {
        customBodyRender: (value: string) => (
          <img src={value} alt="pic" className="w-12 h-12 rounded-full" />
        ),
      },
    },
    {
      name: "title",
      label: "Name",
    },
    {
      name: "brand",
      label: "Brand",
    },
    {
      name: "category",
      label: "Category",
    },
    {
      name: "price",
      label: "Price",
    },
    {
      name: "stock",
      label: "Stock",
    },
    {
      name: "rating",
      label: "Rating",
      options: {
        customBodyRender: (value: number) => (
          <Rating name="read-only" value={value} readOnly />
        ),
      },
    },
    {
      name: "active",
      label: "Active",
      options: {
        customBodyRender: (value: boolean) => (
          <Switch
            color="success"
            checked={value}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        ),
      },
    },
    {
      name: "",
      options: {
        customBodyRender: (id: string) => {
          return (
            <>
              <MuiButton color="success">Edit</MuiButton>
              <MuiButton color="error">Delete</MuiButton>
            </>
          );
        },
      },
    },
  ];

  const options: MUIDataTableOptions | undefined = {
    //filterType: "checkbox",
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
              Product
            </TypographyCustom>
          </Box>
          <Box>
            <MuiButton onClick={newUser}> Add New (+)</MuiButton>
          </Box>
        </Box>
        <MUIDataTable
          title={"Product List"}
          data={data}
          columns={columns}
          options={options}
        />
      </Paper>
    </>
  );
};

export default ProductList;
