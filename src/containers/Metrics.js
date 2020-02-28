import React from "react";
import "../styles/metricsStyles.css";
import { Button } from "antd";
import Sidebar from "../components/Sidebar.js";

class MetricsPage extends React.Component {
  render() {
    return (
      <div className="metrics">
        <div className="Sidebar">
          <Sidebar value={"Metrics"} />
        </div>
        <h2>
          Metrics
        </h2>
        <Button type="primary" size="large" href="login">
          Login
        </Button>
      </div>
    );
  }
}

export default MetricsPage;
