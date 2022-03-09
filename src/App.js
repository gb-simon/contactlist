import * as React from "react";
import ContactProfile from "./components/ContactProfile";
import "./App.css";
import { Grid, Typography } from "@mui/material";
import ButtonNewContact from "./components/NewContact"

function App() {
  return (
    <Grid className="App">
      <Typography variant="h2" mt={4}> My Contact List</Typography>
      {/* <Contact>Gonzalo</Contact> */}
      <Grid container mt={4} direction="row" xs={12} sm={12} justifyContent="center" spacing={5}>
        <Grid item>
          <ButtonNewContact/>
        </Grid>
        <Grid item>
          <ContactProfile />
        </Grid> 
      </Grid>
      <div>
      <Grid container justifyContent="center" marginTop="5%">
         <footer style={{ color: "gray", bottom: 0, position: "fixed"}}>
            <p>Made by Gonzalo Simon</p>
        </footer>
      </Grid>
      </div>
    </Grid>
  );
}

export default App;
