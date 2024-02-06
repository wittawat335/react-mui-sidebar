import { Container, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { useState } from 'react'
import UserList from './UserList'
import Loader from '@/components/ui/Loader';
import { useGetUsersQuery } from './userApi';
import MuiForm from './MuiForm';
import CloseIcon from "@mui/icons-material/Close";

const index = () => {
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
  
    const { data, isError, isLoading, isSuccess } = useGetUsersQuery();
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
          <UserList data={data} newUser={newUser} />
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
  )
}

export default index