import { useGetAllProductQuery } from "@/features/products/prouductApi";
import { useState } from "react";
import Loader from "@/components/ui/Loader";
import CloseIcon from "@mui/icons-material/Close";
import ProductList from "./List";
import MuiForm from "./MuiForm";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { IProduct } from "@/types/Product";

const ProductIndex = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("New Product");
  const [isAction, setIsAction] = useState("New");
  const [dataToEdit, setDataToEdit] = useState<IProduct | undefined>(undefined);
  const {
    data: products,
    isError,
    isLoading,
    isSuccess,
  } = useGetAllProductQuery();

  const handleNewProduct = () => {
    handleOpenDialog();
  };

  const handleUpdateUser = (id: string) => {
    handleOpenDialog();
  };

  const handleViewUser = (id: string) => {
    handleOpenDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  if (isError) {
    return <h1>OOOhNoooo we got an error</h1>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Container maxWidth={false} sx={{ p: 2 }}>
        {isSuccess ? (
          <ProductList data={products} handleNewProduct={handleNewProduct} />
        ) : null}

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <span>{title}</span>
            <IconButton style={{ float: "right" }} onClick={handleCloseDialog}>
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <MuiForm />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default ProductIndex;
