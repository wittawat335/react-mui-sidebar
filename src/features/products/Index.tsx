import {
  useAddProductMutation,
  useGetAllProductQuery,
} from "@/features/products/prouductApi";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import Loader from "@/components/ui/Loader";
import CloseIcon from "@mui/icons-material/Close";
import ProductList from "./List";
import MuiForm from "./MuiForm";

const AllProducts = () => {
  const [open, setOpenDialog] = useState(false);
  const [title, titlechange] = useState("New User");
  const newUser = () => {
    titlechange("New User");
    openpopup();
  };
  const closepopup = () => {
    setOpenDialog(false);
  };
  const openpopup = () => {
    setOpenDialog(true);
  };

  const { data, isError, isLoading, isSuccess } = useGetAllProductQuery();
  console.log(data);

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
          <ProductList data={data?.payload} newUser={newUser} />
        ) : null}

        <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
          <DialogTitle>
            <span>{title}</span>
            <IconButton style={{ float: "right" }} onClick={closepopup}>
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

export default AllProducts;
