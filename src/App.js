import React, { useState } from "react";
import Routes from "./Routes";
import "./styles/mainstyles.css";
import { BrowserRouter as Router } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports.js";
Amplify.configure(awsconfig);

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  Auth.currentAuthenticatedUser({
    bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  })
    .then(data => {
      console.log(data);
      userHasAuthenticated(true);
    })
    .catch(err => console.log(err));

  return (
    <Router>
      <div className="app">
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </div>
    </Router>
  );
}

export default App;
