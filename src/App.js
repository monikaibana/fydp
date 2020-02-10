import React, { useState } from "react";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/mainstyles.css";

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  // function handleLogout() {
  //   userHasAuthenticated(false);
  // }

  return (
    <Router basename={process.env.REACT_APP_PUBLIC_URL}>
      <div className="login-page">
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </div>
    </Router>
  );
}

export default App;
