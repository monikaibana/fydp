// Placeholder file for Patient Information Page

import React from "react";
import { Card, Icon, Select, Form ,Input, Button} from "antd";
import "../styles/PatientInfoStyles.css";
import Sidebar from "../components/Sidebar.js";

const { Option } = Select;
const {TextArea} = Input;
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
  interpretationDetails:
  <div className="interpretationDetails">
  <div className="InterpretationInfo">
    <div className="InterpretingDoctor">
      <h2>Interpreting Doctor <br/></h2>
      <Form.Item>
        <Select
          defaultValue="Select A Doctor"
          onChange={handleChange}
          style={{ width: 250 }}
        >
          <Option value="Raymond Gottschalk">
            Raymond Gottschalk
          </Option>
        </Select>
      </Form.Item>
    </div>
    <div className="InterpretationDate">
      <h2>Interpretation Date <br/></h2>
      <Form.Item>
        <Input
          prefix={<Icon type="calendar" style={{ fontSize: 13 }} />}
          placeholder="Interpretation Date (dd/mm/yyyy)"
          maxLength={10}
          style={{ width: 250 }}
        />
      </Form.Item>
    </div>
    <div className="StudyLink">
      <h2>Link To Study <br/></h2>
      <p> Link </p>
    </div>
  </div>
  <div className="Interpretation">
    <div className="Rating">
      <h2>Rating <br/> </h2>
      <Form.Item>
        <Select
          defaultValue="Select A Rating"
          onChange={handleChange}
          style={{ width: 250 }}
        >
          <Option value="1">
            1
          </Option>
          <Option value="2">
            2
          </Option>
          <Option value="3">
            3
          </Option>
          <Option value="4">
            4
          </Option>
          <Option value="5">
            5
          </Option>
        </Select>
      </Form.Item>
    </div>
    <div className="reportSendDate">
      <h2>Date Report Sent <br/> </h2>
      <Form.Item>
        <Input
          prefix={<Icon type="calendar" style={{ fontSize: 13 }} />}
          placeholder="Sent Date (dd/mm/yyyy)"
          maxLength={10}
          style={{ width: 250 }}
        />
      </Form.Item>
    </div>
    <div className="Comments">
      <h2> Comments <br/> </h2>
      <Form.Item>
        <TextArea
          style={{ fontSize: 13 }, {width: 400}}
          placeholder="Comments"
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Form.Item>
    </div>
  </div>
  </div>
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
          <a href="javascript:history.back()">
           <Icon type="left" />
            Back
          </a>
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
          <Button
          type="primary"
          htmlType="submit"
          className="save-button"
        >
          Save
        </Button>
        </div>
        
      </div>
    );
  }
}

export default PatientInfoPage;
