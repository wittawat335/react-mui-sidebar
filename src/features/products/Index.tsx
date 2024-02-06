import { useGetAllProductQuery } from "@/services/api/prouductApi";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import List from "./List";
import Loader from "@/components/ui/Loader";
import CloseIcon from "@mui/icons-material/Close";

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
      <Container maxWidth="xl" sx={{ p: 2 }}>
        <List data={data?.payload} isSuccess={isSuccess} newUser={newUser} />
        <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
          <DialogTitle>
            <span>{title}</span>
            <IconButton style={{ float: "right" }} onClick={closepopup}>
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div>test</div>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default AllProducts;
