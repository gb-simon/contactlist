import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: `https://reqres.in/api`,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Contacts() {
  //Add User States
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar] = useState("https://reqres.in/img/faces/3-image.jpg");
  const [data, setData] = useState([]);

  // Edit User States

  const [editIndex, setEditIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [first_nameUpdate, setFirstNameUpdate] = useState(first_name);
  const [last_nameUpdate, setLastNameUpdate] = useState(last_name);
  const [emailUpdate, setEmailUpdate] = useState(email);

  // Modal - Popup states

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  // Hook to get data to my state
  useEffect(() => {
    api
      .get("/users")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  // Add Contact

  const handleAdd = () => {
    api
      .post(`/users/`, {
        first_name,
        last_name,
        email,
        avatar,
      })
      .then((response) => {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        console.log(data);
        data.unshift(response.data);
        setFirstName("");
        setLastName("");
        setEmail("");
        handleClose();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // Remove Contact
  const handleDelete = (oldData) => {
    api
      .delete("/users/" + oldData.id)
      .then((oldData) => {
        const dataDelete = [...data];
        const index = oldData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  // Edit Contact

  const handleUpdate = (contact) => {
    handleOpenUpdate();
    setEditIndex(findElement(contact.id, data));
    setCurrentUser({
      id: contact.id,
      first_name: first_nameUpdate,
      last_name: last_nameUpdate,
      email: emailUpdate,
      avatar: contact.avatar,
    });
  };

  const updateUser = (id_number) => {
    var updatedContact = currentUser;
    setData(data.map((x) => (x.id === id_number ? updatedContact : x)));
    handleUpdate(id_number);
    alert(`You have updated: ${JSON.stringify(updatedContact)}`);
    handleCloseUpdate();
  };

  function findElement(id_element, array) {
    // Identify which element in the array has the id that was passed to me
    var contactToEdit = array.findIndex((x) => x.id === id_element);
    // and return that specific object with its information
    return contactToEdit;
  }

  return (
    <>
      {/* Add a contact form */}
      <Grid container justifyContent="center" mt={4}>
        <Button variant="contained" onClick={handleOpen}>
          New Contact
        </Button>
      </Grid>
      {/* Modal for contact form */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            justifyContent="center"
            xs={8}
            style={{ width: 650, margin: "auto" }}
          >
            <Typography padding="3%" variant="h4">
              New Contact
            </Typography>
            <TextField
              placeholder="name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              style={{marginTop: "15px"}}
            />
            <TextField
              placeholder="last name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              style={{marginTop: "15px"}}
            />
            <TextField
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{marginTop: "15px"}}
            />
            <Grid mt={3}>
              <Button variant="outlined" onClick={handleAdd}>
                Add Contact
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            justifyContent="center"
            xs={8}
            style={{ width: 650, margin: "auto" }}
    
          >
            <Typography variant="h6">Update Contact</Typography>
            <TextField
              placeholder="First Name"
              onChange={(e) => setFirstNameUpdate(e.target.value)}
              style={{marginTop: "15px"}}
            />
            <TextField
              placeholder="last name"
              onChange={(e) => setLastNameUpdate(e.target.value)}
              style={{marginTop: "15px"}}
            />
            <TextField             
              style={{marginTop: "15px"}}
              placeholder="email"
              onChange={(e) => setEmailUpdate(e.target.value)}
            />
          </Grid>
          <Grid mt={3} container justifyContent="center" >
            <Button variant="outlined" onClick={() => handleUpdate(data[editIndex])} style={{ marginRight:"15px" }}>Save</Button>
            <Button variant="outlined" onClick={() => updateUser(data[editIndex].id)} style={{ marginLeft:"15px" }}>Back</Button>
          </Grid>
        </Box>
      </Modal>

      {/* Table of contacts */}

      <TableContainer>
        <Table
          style={{ width: 650, margin: "auto", marginTop: "3%" }}
          component={Paper}
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow className="table-row">
              <TableCell>Actions</TableCell>
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>e-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((contact) => {
              return (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  {/* Rows of the table: Here every Table Cell is info in a single row  */}
                  <TableCell>
                    <Button onClick={() => handleUpdate(contact)}>
                      Update
                    </Button>
                    <Button onClick={() => handleDelete(contact.id)}>
                      Delete
                    </Button>
                    <Link style={{ textDecoration: "none" }} to="/details">
                      <Button>Expand</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <img alt="default user" src={contact.avatar} />
                  </TableCell>
                  <TableCell>{contact.id}</TableCell>
                  <TableCell> {contact.first_name}</TableCell>
                  <TableCell>{contact.last_name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Contacts;
