import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useUsers } from "@/lib/react-query/queries";

const Users = (props) => {
  const [id, idchange] = useState(0);
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [phone, phonechange] = useState("");
  const [address, addresschange] = useState("");
  const [type, typechange] = useState("MNC");
  const [open, openchange] = useState(false);
  const [agreeterm, agreetermchange] = useState(true);
  const [rowperpage, rowperpagechange] = useState(5);
  const [page, pagechange] = useState(0);
  const [isedit, iseditchange] = useState(false);
  const [title, titlechange] = useState("Create company");

  const usersQuery = useUsers();
  console.log(usersQuery);

  const columns = [
    { id: "username", name: "Username" },
    { id: "fullName", name: "Fullname" },
    { id: "email", name: "Email" },
    { id: "role", name: "Role" },
    { id: "address", name: "Address" },
    { id: "action", name: "Action" },
  ];

  const addUser = () => {
    iseditchange(false);
    titlechange("Create company");
    openpopup();
  };

  const closepopup = () => {
    openchange(false);
  };
  const openpopup = () => {
    openchange(true);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    closepopup();
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Users
              </Typography>
            </Box>
            <Box>
              <Button onClick={addUser} variant="contained">
                {" "}
                Add New (+)
              </Button>
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

      {/* <Paper sx={{ margin: "1%" }}>
        <div style={{ margin: "1%" }}>
          <Button onClick={functionadd} variant="contained">
            Add New (+)
          </Button>
        </div>
        <div style={{ margin: "1%" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "midnightblue" }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={{ color: "white" }}>
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper> */}

      <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
        <DialogTitle>
          <span>{title}</span>
          <IconButton style={{ float: "right" }} onClick={closepopup}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handlesubmit}>
            <Stack spacing={2} margin={2}>
              <TextField
                required
                error={name.length === 0}
                value={name}
                onChange={(e) => {
                  namechange(e.target.value);
                }}
                variant="outlined"
                label="Name"
              ></TextField>
              <TextField
                required
                error={name.length === 0}
                value={email}
                onChange={(e) => {
                  emailchange(e.target.value);
                }}
                variant="outlined"
                label="Email"
              ></TextField>
              <TextField
                required
                error={name.length === 0}
                value={phone}
                onChange={(e) => {
                  phonechange(e.target.value);
                }}
                variant="outlined"
                label="Phone"
              ></TextField>
              <TextField
                multiline
                maxRows={2}
                minRows={2}
                value={address}
                onChange={(e) => {
                  addresschange(e.target.value);
                }}
                variant="outlined"
                label="Address"
              ></TextField>
              <RadioGroup
                value={type}
                onChange={(e) => {
                  typechange(e.target.value);
                }}
                row
              >
                <FormControlLabel
                  value="MNC"
                  control={<Radio color="success"></Radio>}
                  label="MNC"
                ></FormControlLabel>
                <FormControlLabel
                  value="DOMESTIC"
                  control={<Radio></Radio>}
                  label="DOMESTIC"
                ></FormControlLabel>
              </RadioGroup>
              <FormControlLabel
                checked={agreeterm}
                onChange={(e) => {
                  agreetermchange(e.target.checked);
                }}
                control={<Checkbox></Checkbox>}
                label="Agree Terms & Conditions"
              ></FormControlLabel>
              <Button disabled={!agreeterm} variant="contained" type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Users;
