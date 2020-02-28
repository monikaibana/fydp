import React from "react";
import { Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Login from "./containers/Login";
import PatientList from "./containers/PatientList";
import Home from "./containers/Home";
import CreatePatient from "./containers/CreatePatient";
import PatientInfo from "./containers/PatientInfo";
import Metrics from "./containers/Metrics";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute
        path="/list"
        exact
        component={PatientList}
        appProps={appProps}
      />
      <AppliedRoute
        path="/create"
        exact
        component={CreatePatient}
        appProps={appProps}
      />
      <AppliedRoute
        path="/info/:id"
        exact
        component={PatientInfo}
        appProps={appProps}
      />
      <AppliedRoute
        path="/metrics"
        exact
        component={Metrics}
        appProps={appProps}
      />
    </Switch>
  );
}
