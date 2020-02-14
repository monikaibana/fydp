// Placeholder file for Patient Information Page

import React from "react";
import { Tabs, Icon, Select, Form, Input, Button } from "antd";
import "../styles/PatientInfoStyles.css";
import Sidebar from "../components/Sidebar.js";

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}
const { TabPane } = Tabs;
const {TextArea} = Input;
function callback(key) {
  console.log(key);
}

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
        <Button type="link" className="BackButton" href="javascript:history.back()">
          <Icon type="left" /> Back
        </Button>
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
          <Tabs onChange={callback} type="card">
            <TabPane tab="Patient Information" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Study Information" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Study Results" key="3">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Interpretation Details" key="4" className="interpretationDetails">
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
            </TabPane>
            <TabPane tab="Post-Study Details" key="5">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
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
