import React from "react";
import Contacts from "./Contacts";
import DetailedContact from "./DetailedContact"
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Contacts}/>
      <Route path="/details" component={DetailedContact}/>
    </Router>
  );
}

export default App;
