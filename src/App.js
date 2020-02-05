import React, { useState } from "react";
import Routes from "./Routes";
import "./styles/mainstyles.css";

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  // function handleLogout() {
  //   userHasAuthenticated(false);
  // }

  return (
    <div className="login-page">
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default App;
