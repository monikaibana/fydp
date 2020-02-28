import React from "react";
import "../styles/metricsStyles.css";
import { Button, Icon, Tabs } from "antd";
import Sidebar from "../components/Sidebar.js";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
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
                <h2>
                  Metrics
                </h2>
              </div>
              <div className="MetricsTabs">
                <Tabs onChange={callback} type="card">
                  {/* ––––––––––––––––––––––––––––––––––––––––––– Tab 1 ––––––––––––––––––––––––––––––––––––––––––––––– */}
                  <TabPane tab="Metrics 1" key="1" className="MetricsTab">
                  </TabPane>
                  <TabPane tab="Metrics 2" key="2" className="MetricsTab">
                  </TabPane>
                  <TabPane tab="Metrics 3" key="3" className="MetricsTab">
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </>
         ) : (
           <p>Access Denied</p>
         )}
       </>
     );
   }
 }

export default MetricsPage;
