import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Button, Grid, Paper, Typography } from "@mui/material";
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
  const [data, setData] = useState([]);

  // Edit User States

  const [editing, setEditing] = useState(false);
  const initialFormState = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
  };
  const [currentUser, setCurrentUser] = useState({ initialFormState });
  const [first_nameUpdate, setFirstNameUpdate] = useState("");
  const [last_nameUpdate, setLastNameUpdate] = useState("");
  const [emailUpdate, setEmailUpdate] = useState("");

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
    setEditing(true);
    setCurrentUser({
      id: contact.id,
      first_name: first_nameUpdate,
      last_name: last_nameUpdate,
      email: emailUpdate,
    });
  };

  const updateUser = (id_number) => {
    const updatedContact = currentUser;
    setData(data.map((x) => (x.id === id_number ? updatedContact : x)));
    setFirstName("");
    setLastName("");
    setEmail("");
    setEditing(false);
  };

  return (
    <Grid container justifyContent="center">
      <Typography padding="3%" variant="h3">
        My Contacts List
      </Typography>
      <Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            <TableBody >
              {data.map((data) => {
                return (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <Grid paddingTop="5%"
                      justifyContent="center"
                      align="center"
                      style={{ maxWidth: 345 }}
                    >
                      {editing ? (
                        <div>
                          <Typography variant="h5">Update Contact</Typography>
                          <div>
                            <input
                              placeholder="First Name"
                              value={data.first_nameUpdate}
                              onChange={(e) =>
                                setFirstNameUpdate(e.target.value)
                              }
                            />
                            <input
                              placeholder="last name"
                              onChange={(e) =>
                                setLastNameUpdate(e.target.value)
                              }
                              value={data.last_nameUpdate}
                            />
                            <input
                              placeholder="email"
                              value={data.emailUpdate}
                              onChange={(e) => setEmailUpdate(e.target.value)}
                            />
                          </div>
                          <Button onClick={() => updateUser(data.id)}>
                            Update
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Typography variant="h5">New Contact</Typography>
                          <div>
                            <input
                              placeholder="name"
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                              placeholder="last name"
                              onChange={(e) => setLastName(e.target.value)}
                            />
                            <input
                              placeholder="email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <Button onClick={handleAdd}>Add</Button>
                        </div>
                      )}
                    </Grid>
                    <TableCell>
                      <Button onClick={() => handleUpdate(data)}>Update</Button>
                      <Button onClick={() => handleDelete(data.id)}>
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell>
                      <img alt="default user" src={data.avatar} />
                    </TableCell>
                    <TableCell>{data.id}</TableCell>
                    <TableCell> {data.first_name}</TableCell>
                    <TableCell>{data.last_name}</TableCell>
                    <TableCell>{data.email}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default App;
