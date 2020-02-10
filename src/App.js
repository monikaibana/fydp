import React, { useState } from "react";
import Routes from "./Routes";
import "./styles/mainstyles.css";
import { BrowserRouter as Router } from "react-router-dom";

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  // function handleLogout() {
  //   userHasAuthenticated(false);
  // }

  return (
    <Router>
      <div className="login-page">
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </div>
    </Router>
  );
}

export default App;
