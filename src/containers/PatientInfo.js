// Placeholder file for Patient Information Page

import React from "react";
import { Card, Icon, Select, Form } from "antd";
import "../styles/PatientInfoStyles.css";
import Sidebar from "../components/Sidebar.js";

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}
const Tabs = [
  {
    key: "patientInformation",
    tab: "Patient Information"
  },
  {
    key: "studyInformation",
    tab: "Study Information"
  },
  {
    key: "studyResults",
    tab: "Study Results"
  },
  {
    key: "interpretationDetails",
    tab: "Interpretation Details"
  }
];

const tablist = {
  /* this is where we edit the content for the tabs*/
  patientInformation: <p>Patient info content</p>,
  studyInformation: <p>study info content</p>,
  studyResults: <p>study result content</p>,
  interpretationDetails: <p> Interpretation details content</p>
};

class PatientInfoPage extends React.Component {
  state = {
    key: "Patient_Information"
  };

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    return (
      <div className="PatientInfoPage">
        <Sidebar value={"PatientInfo"} />
        <div className="BackButton">
          <Icon type="left" /> Back
        </div>
        <div className="PatientName">Patient Name</div>
        <div className="StatusInfo">
          <div className="PatientStatus">
            Status
            <br />
            <Form.Item>
              <Select
                defaultValue="Patient Status"
                onChange={handleChange}
                style={{ width: 250 }}
              >
                <Option value="Referral Received/For Triage">
                  Referral Received/For Triage
                </Option>
                <Option value="Triaged">Triaged</Option>
                <Option value="Consultation Booked">Consultation Booked</Option>
                <Option value="Consultation Complete">
                  Consultation Complete
                </Option>
                <Option value="Study Booked">Study Booked</Option>
                <Option value="Study Data Collected">
                  Study Data Collected
                </Option>
                <Option value="Study Scored">Study Scored</Option>
                <Option value="Results Interpreted by Physician">
                  Results Interpreted by Physician
                </Option>
                <Option value="Study Follow-up booked">
                  Study Follow-up booked
                </Option>
                <Option value="Follow-up complete">Follow-up Complete</Option>
                <Option value="Treatment Follow-up Booked">
                  Treatment Follow-up Booked
                </Option>
                <Option value="Treatment Follow-up Complete">
                  Treatment Follow-up Complete
                </Option>
              </Select>
            </Form.Item>
          </div>
          <div className="TimeInStatus">
            Time in Status
            <br />3 Days
          </div>
        </div>
        <div className="InfoTabs">
          <Card
            style={{ width: "100%" }}
            tabList={Tabs}
            activeTabKey={this.state.noTitleKey}
            onTabChange={key => {
              this.onTabChange(key, "noTitleKey");
            }}
          >
            {tablist[this.state.noTitleKey]}
          </Card>
        </div>
      </div>
    );
  }
}

export default PatientInfoPage;
