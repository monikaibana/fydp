import React from "react";
import { Link }from "react-router-dom";
import "../styles/metricsStyles.css";
import { DownloadOutlined } from "@ant-design/icons";
import { Tabs, Button, Radio } from "antd";
import Sidebar from "../components/Sidebar.js";
import AccessDenied from "../components/AccessDenied.js";
import StatusGraph from "./metrics_page_images/current-patient-statuses-graph.png";
import StatusTable from "./metrics_page_images/current-patient-statuses-table.png";
import QaGraph from "./metrics_page_images/qa-graph.png";
import QaTable from "./metrics_page_images/qa-table.png";
import TrendsGraph from "./metrics_page_images/trends-graph.png";
import TrendsTable from "./metrics_page_images/trends-table.png";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
function displayStatusImage(e) {
  var value = e.target.value;
  var graph = document.getElementById("statusGraph");
  var table = document.getElementById("statusTable");
  if (value === "statusGraph") {
    console.log("graph");
    table.style.display = "none";
    graph.style.display = "block";
  }
  if (value === "statusTable") {
    graph.style.display = "none";
    table.style.display = "block";
  }
}
function displayQaImage(e) {
  var value = e.target.value;
  var graph = document.getElementById("QaGraph");
  var table = document.getElementById("QaTable");
  if (value === "QaGraph") {
    console.log("graph");
    table.style.display = "none";
    graph.style.display = "block";
  }
  if (value === "QaTable") {
    graph.style.display = "none";
    table.style.display = "block";
  }
}
function displayTrendsImage(e) {
  var value = e.target.value;
  var graph = document.getElementById("TrendsGraph");
  var table = document.getElementById("TrendsTable");
  if (value === "TrendsGraph") {
    console.log("graph");
    table.style.display = "none";
    graph.style.display = "block";
  }
  if (value === "TrendsTable") {
    graph.style.display = "none";
    table.style.display = "block";
  }
}

class MetricsPage extends React.Component {
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    return (
      <>
        {this.props.isAuthenticated ? (
          <>
            <div className="Metrics">
              <div className="Sidebar">
                <Sidebar value={"Metrics"} />
              </div>
              <div className="PageTitle">
                <h2>Metrics</h2>
                <Radio.Group value={"ham"}>
                  <Radio defaultChecked={true} value={"ham"}>
                    Hamilton
                  </Radio>
                  <Radio dsa={false} value={"cam"} disabled={true}>
                    Cambridge
                  </Radio>
                  <Radio defaultChecked={false} value={"nia"} disabled={true}>
                    Niagara
                  </Radio>
                </Radio.Group>
              </div>
              <div className="MetricsTabs">
                <Tabs onChange={callback} type="card">
                  {/* ––––––––––––––––––––––––––––––––––––––––––– Tab 1 ––––––––––––––––––––––––––––––––––––––––––––––– */}
                  <TabPane
                    tab="Current Patient Status"
                    key="1"
                    className="MetricsTab"
                  >
                    <div className="ImageFrame">
                      <div className="TabTitle">
                        <h2>Current Patient Status</h2>
                      </div>
                      <div className="StatusGraph">
                        <img
                          id="statusGraph"
                          src={StatusGraph}
                          alt="Current Patient Status Graph"
                          style={{ height: 400 }}
                        />
                      </div>
                      <div className="StatusTable">
                        <img
                          id="statusTable"
                          src={StatusTable}
                          alt="Current Patient Status Table"
                          style={{ height: 400, display: "none" }}
                        />
                      </div>
                    </div>
                    <div className="ToggleView">
                      <Radio.Group
                        defaultValue="statusGraph"
                        onChange={displayStatusImage}
                      >
                        <Radio.Button value="statusGraph">
                          View as Graph
                        </Radio.Button>
                        <Radio.Button value="statusTable">
                          View as Table
                        </Radio.Button>
                      </Radio.Group>
                    </div>
                    <div className="SaveButton">
                      <div>
                        <Link to="/metrics-download-files/BlueBook_Current_Patient_Status.csv" target="_blank" download>Export as CSV</Link>
                      </div>
                    </div>
                  </TabPane>
                  {/* ––––––––––––––––––––––––––––––––––––––––––– Tab 2 ––––––––––––––––––––––––––––––––––––––––––––––– */}
                  <TabPane
                    tab="Quality Assurance"
                    key="2"
                    className="MetricsTab"
                  >
                    <div className="ImageFrame">
                      <div className="TabTitle">
                        <h2>Average Scorer Ratings</h2>
                      </div>
                      <div className="TabTitleRight">
                        <h2>Average Doctor Ratings</h2>
                      </div>
                      <div className="StatusGraph">
                        <img
                          id="QaGraph"
                          src={QaGraph}
                          alt="Quality Assurance Graph"
                          style={{ height: 360 }}
                        />
                      </div>
                      <div className="StatusTable">
                        <img
                          id="QaTable"
                          src={QaTable}
                          alt="Quality Assurance Table"
                          style={{ height: 300, display: "none" }}
                        />
                      </div>
                    </div>
                    <div className="ToggleView">
                      <Radio.Group
                        defaultValue="QaGraph"
                        onChange={displayQaImage}
                      >
                        <Radio.Button value="QaGraph">
                          View as Graph
                        </Radio.Button>
                        <Radio.Button value="QaTable">
                          View as Table
                        </Radio.Button>
                      </Radio.Group>
                    </div>
                    <div className="SaveButton">
                      <div>
                        <Link to="/metrics-download-files/BlueBook_Quality_Assurance.csv" target="_blank" download>Export as CSV</Link>
                      </div>
                    </div>
                  </TabPane>
                  {/* ––––––––––––––––––––––––––––––––––––––––––– Tab 3 ––––––––––––––––––––––––––––––––––––––––––––––– */}
                  <TabPane tab="Trends" key="3" className="MetricsTab">
                    <div className="ImageFrame">
                      <div className="TabTitle">
                        <h2>Trends</h2>
                      </div>
                      <div className="StatusGraph">
                        <img
                          id="TrendsGraph"
                          src={TrendsGraph}
                          alt="Trends Graph"
                          style={{ height: 400 }}
                        />
                      </div>
                      <div className="StatusTable">
                        <img
                          id="TrendsTable"
                          src={TrendsTable}
                          alt="Trends Table"
                          style={{ height: 350, display: "none" }}
                        />
                      </div>
                    </div>
                    <div className="ToggleView">
                      <Radio.Group
                        defaultValue="TrendsGraph"
                        onChange={displayTrendsImage}
                      >
                        <Radio.Button value="TrendsGraph">
                          View as Graph
                        </Radio.Button>
                        <Radio.Button value="TrendsTable">
                          View as Table
                        </Radio.Button>
                      </Radio.Group>
                    </div>
                    <div className="SaveButton">
                      <div>
                        <Link to="/metrics-download-files/BlueBook_Trends.csv" target="_blank" download>Export as CSV</Link>
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="loadingScreen">
              <br /> <br />
              Loading...
            </div>
            <div className="accessDenied">
              <AccessDenied />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default MetricsPage;
