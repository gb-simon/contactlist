import React from "react";
import Contacts from "./Components/Contacts";
import DetailedContact from "./Components/DetailedContact";
import Footer from "./Components/Footer"
import Header from "./Components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css"

function App() {
  return (
    <Router>
      <Header/>
      <Route exact path="/" component={Contacts} />
      <Route path="/details" component={DetailedContact} />
      <Footer/>
    </Router>
  );
}

export default App;
