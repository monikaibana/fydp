import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Routes from "./Routes";
import "./styles/mainstyles.css";

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  // function handleLogout() {
  //   userHasAuthenticated(false);
  // }

  return (
    <div className="login-page">
      {isAuthenticated ? (
        <div />
      ) : (
        <>
          <h3 style={{ color: "white" }}>Welcome to BlueBook!</h3>
          <div className="login-button-container">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </>
      )}
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default App;
