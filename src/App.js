import React from "react";
import Contacts from "./Contacts";
import DetailedContact from "./DetailedContact";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grid } from "@mui/material";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Contacts} />
      <Route path="/details" component={DetailedContact} />
      <Grid container margin="5%">
        <footer style={{ color: "gray", bottom: 0, position: "fixed" }}>
          <p>Made by Gonzalo Simon</p>
        </footer>
      </Grid>
    </Router>
  );
}

export default App;
