import { MuiButton } from "@/components/shared";
import { IProduct } from "@/types/Product";
import { Avatar, Box, ButtonGroup, Paper, Rating } from "@mui/material";
import { MouseEvent, useEffect } from "react";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "./prouductApi";
import { FaCheck, FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { messages } from "@/config/messages";

type Props = {
  data: Array<IProduct>;
  handleNewProduct: (e: MouseEvent<HTMLButtonElement>) => void;
};

const ProductList = ({ data, handleNewProduct }: Props) => {
  const [deleteProduct, { isSuccess: deleteSuccess }] =
    useDeleteProductMutation();

  useEffect(() => {
    if (deleteSuccess) toast.success(messages.delete_success);
  }, [deleteSuccess]);

  // const handleUpdateProduct = async (request: IProduct) => {
  //   try {
  //     const updatedProductData = {
  //       title: "Title updated 🤝",
  //     };

  //     await updateProduct({
  //       request: data,
  //     });
  //   } catch (err) {
  //     console.error("Error updating product:", err);
  //   }
  // };

  const handleDeleteProduct = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteProduct(id);
        }
      });
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const columns = [
    {
      name: "thumbnail",
      label: "Image",
      options: {
        customBodyRender: (value: string) => (
          <Avatar src={value} variant="square" />
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
        customBodyRender: (value: string) => (
          <p
            className={`capitalize px-3 py-1 inline-block rounded-full text-slate-50 ${
              value === "1" ? "bg-green-600" : "bg-rose-600"
            }`}
          >
            {value === "1" ? <FaCheck /> : <FaXmark />}
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
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <MuiButton>view</MuiButton>
                <MuiButton>Edit</MuiButton>
                <MuiButton onClick={() => handleDeleteProduct(id)}>
                  Delete
                </MuiButton>
              </ButtonGroup>
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
        <Box display="flex" m={1}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box>
            <MuiButton
              variant="contained"
              color="info"
              onClick={handleNewProduct}
            >
              {" "}
              New Product
            </MuiButton>
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
