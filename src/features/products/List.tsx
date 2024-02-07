import { MuiButton, TypographyCustom } from "@/components/shared";
import { IProduct } from "@/types/Product";
import { Box, Paper, Rating } from "@mui/material";
import { ChangeEvent, useState, MouseEvent, useEffect } from "react";
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
  newUser: (e: MouseEvent<HTMLButtonElement>) => void;
};

const ProductList = ({ data, newUser }: Props) => {
  const [updateProduct] = useUpdateProductMutation();
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
          <p
            className={`capitalize px-3 py-1 inline-block rounded-full text-slate-50 ${
              value === true ? "bg-green-600" : "bg-rose-600"
            }`}
          >
            {value === true ? <FaCheck /> : <FaXmark />}
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
              <MuiButton color="inherit">Edit</MuiButton>
              <MuiButton onClick={() => handleDeleteProduct(id)} color="error">
                Delete
              </MuiButton>
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
