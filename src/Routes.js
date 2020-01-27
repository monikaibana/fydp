import React from "react";
import { Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Login from "./containers/Login";
import PatientList from "./containers/PatientList";
import Home from "./containers/Home"

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/list" exact component={PatientList} appProps={appProps} />
    </Switch>
  );
}
