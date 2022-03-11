import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export const api = axios.create({
  baseURL: `https://reqres.in/api`,
});

function App() {
  //Add User States
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar] = useState("https://reqres.in/img/faces/3-image.jpg");
  const [data, setData] = useState([]);

  // Edit User States

  const [editing, setEditing] = useState(false);
  const [closeEdit, setCloseEdit] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [first_nameUpdate, setFirstNameUpdate] = useState(first_name);
  const [last_nameUpdate, setLastNameUpdate] = useState(last_name);
  const [emailUpdate, setEmailUpdate] = useState(email);

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
    setCurrentUser({
      id: contact.id,
      first_name: first_nameUpdate,
      last_name: last_nameUpdate,
      email: emailUpdate,
      avatar: contact.avatar,
    });
    setEditing(true);
    setCloseEdit(true);
  };

  const updateUser = (id_number) => {
    const updatedContact = currentUser;
    setData(data.map((x) => (x.id === id_number ? updatedContact : x)));
    handleUpdate(id_number);
    alert(` You have updated: ${JSON.stringify(updatedContact)}`);
    setEditing(false);
    setCloseEdit(false);
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Typography padding="3%" variant="h3">
          My Contacts List
        </Typography>
      </Grid>

      {/* Add a contact form */}
      <Grid
        container
        justifyContent="center"
        xs={2}
        style={{ width: 650, margin: "auto" }}
      >
        <TextField
          placeholder="name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          placeholder="last name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Grid mt={2}>
          <Button variant="outlined" onClick={handleAdd}>
            Add Contact
          </Button>
        </Grid>
      </Grid>

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
                  <Grid
                    paddingTop="5%"
                    justifyContent="center"
                    align="center"
                    style={{ maxWidth: 345 }}
                  >
                    {/* Update a contact form */}
                    {editing ? (
                      <div>
                        <Grid xs={12} style={{width: 300, margin: "auto"}}>
                          <Typography variant="h6">Update Contact</Typography>
                          <TextField
                            placeholder="First Name"
                            onChange={(e) => setFirstNameUpdate(e.target.value)}
                          />
                          <TextField
                            placeholder="last name"
                            onChange={(e) => setLastNameUpdate(e.target.value)}
                          />
                          <TextField
                            placeholder="email"
                            onChange={(e) => setEmailUpdate(e.target.value)}
                          />
                        </Grid>
                      </div>
                    ) : (
                      <></>
                    )}
                  </Grid>

                  {/* Rows of the table: Here every Table Cell is info in a single row  */}
                  <TableCell>
                    {closeEdit ? (
                      <Button onClick={() => handleUpdate(contact)}>
                        Save
                      </Button>
                    ) : (
                      <Button onClick={() => handleUpdate(contact)}>
                        Update
                      </Button>
                    )}
                    {closeEdit ? (
                      <Button onClick={() => updateUser(contact.id)}>
                        Back
                      </Button>
                    ) : (
                      <Button onClick={() => handleDelete(contact.id)}>
                        Delete
                      </Button>
                    )}
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

export default App;
