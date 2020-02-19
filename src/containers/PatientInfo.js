import React from "react";
import { Tabs, Icon, Select, Form, Input, Button } from "antd";
import "../styles/PatientInfoStyles.css";
import Sidebar from "../components/Sidebar.js";

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}
const { TabPane } = Tabs;
const { TextArea } = Input;
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

  handleDateChange = e => {
    e.target.value = e.target.value
      .replace(/^(\d\d)(\d)$/g, "$1/$2")
      .replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2")
      .replace(/[^\d/]/g, "");
  };

  goBack() {
    this.props.history.goBack();
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="PatientInfoPage">
        <Sidebar value={"PatientInfo"} />
        <Button
          type="link"
          className="BackButton"
          onClick={() => this.goBack()}
        >
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
            <TabPane tab="Patient Information" key="1" className="patientDetails">
              <div className="PatientInfo">
                <div className="patientName">
                  <h2>
                    Patient Name <br />
                  </h2>
                  <Form.Item key="patientName">
                    {getFieldDecorator("patientName")(
                      <Input
                        prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                        placeholder="Patient Name(s)"
                        style={{ width: 300 }}
                      />
                    )}
                  </Form.Item>
                </div>
                <div className="pid">
                  <h2>
                    PID <br />
                  </h2>
                  <Form.Item key="id">
                    {getFieldDecorator("id")(
                      <Input
                        prefix={<Icon type="number" style={{ fontSize: 13 }} />}
                        placeholder="PID"
                        maxLength={9}
                        style={{ width: 300 }}
                      />
                    )}
                  </Form.Item>
                </div>
                <div className="dob">
                  <h2>
                    Patient DOB <br />
                  </h2>
                  <Form.Item key="dob">
                    {getFieldDecorator("dob")(
                      <Input
                      prefix={<Icon type="calendar" style={{ fontSize: 13 }} />}
                      placeholder="Date of Birth (dd/mm/yyyy)"
                      onChange={this.handleDateChange}
                      maxLength={10}
                      style={{ width: 300 }}
                    />
                    )}
                  </Form.Item>
                </div>
                <div className="Gender">
                  <h2>
                    Gender <br />{" "}
                  </h2>
                  <Form.Item>
                    <Select
                      defaultValue="Gender"
                      onChange={handleChange}
                      style={{ width: 300 }}
                    >
                      <Option value="M">Male</Option>
                      <Option value="F">Female</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="Interpretation">
                <div className="studyType">
                  <h2>
                    Study Type <br />{" "}
                  </h2>
                  <Form.Item key="study_type">
                    {getFieldDecorator("studyType", { initialValue: "0" })(
                      <Select style={{ width: 300 }} onChange={handleChange}>
                        <Option value="0" hidden>
                          Study Type
                        </Option>
                        <Option value="1">Initial Diagnostic Study</Option>
                        <Option value="2">Repeat Diagnostic Study</Option>
                        <Option value="3">CPAP Study</Option>
                        <Option value="4">BiPAP Study</Option>
                        <Option value="5">Repeat Therapeutic Study</Option>
                        <Option value="6">Study to Assess Other Therapy</Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>
                <div className="triageTag">
                  <h2>
                    Triage Tag <br />{" "}
                  </h2>
                  <Form.Item key="study_type">
                    {getFieldDecorator("triageTag", { initialValue: "0" })(
                      <Select style={{ width: 300 }} onChange={handleChange}>
                        <Option value="0" hidden>
                          Triage Tag
                        </Option>
                        <Option value="1">Urgent</Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>
                <div className="Comments">
                  <h2>
                    {" "}
                    Notes <br />{" "}
                  </h2>
                  <Form.Item>
                    <TextArea
                      style={({ fontSize: 13 }, { width: 300 })}
                      placeholder="Notes"
                      autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                  </Form.Item>
                    <div className="StudyLink">
                    <h2>
                      Link To Referral File <br />
                    </h2>
                    <p> filename.pdf </p>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Study Information" key="2" className="studyDetails">
              <div className="studyInfo">
                <div className="studyDate">
                  <h2>
                    Date of Study <br />
                  </h2>
                  <Form.Item key="study_date">
                    {getFieldDecorator("study_date")(
                      <Input
                      prefix={<Icon type="calendar" style={{ fontSize: 13 }} />}
                      placeholder="Study Date (dd/mm/yyyy)"
                      onChange={this.handleDateChange}
                      maxLength={10}
                      style={{ width: 300 }}
                    />
                    )}
                  </Form.Item>
                </div>
                <div className="location">
                  <h2>
                    Location <br />
                  </h2>
                  <Form.Item key="location">
                    {getFieldDecorator("location", { initialValue: "0" })(
                      <Select style={{ width: 300 }} onChange={handleChange}>
                        <Option value="0" hidden>
                          Bed number
                        </Option>
                        <Option value="1">Bed 1</Option>
                        <Option value="2">Bed 2</Option>
                        <Option value="3">Bed 3</Option>
                        <Option value="4">Bed 4</Option>
                        <Option value="5">Bed 5</Option>
                        <Option value="6">Bed 6</Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>
                <div className="acq">
                  <h2>
                    ACQ <br />
                  </h2>
                  <Form.Item key="acq">
                    {getFieldDecorator("acq")(
                      <Input
                        prefix={<Icon type="number" style={{ fontSize: 13 }} />}
                        placeholder="ACQ"
                        maxLength={9}
                        style={{ width: 300 }}
                      />
                    )}
                  </Form.Item>
                </div>
                <div className="studyType">
                  <h2>
                    Study Type <br />{" "}
                  </h2>
                  <Form.Item key="study_type">
                    {getFieldDecorator("studyType", { initialValue: "0" })(
                      <Select style={{ width: 300 }} onChange={handleChange}>
                        <Option value="0" hidden>
                          Study Type
                        </Option>
                        <Option value="1">Initial Diagnostic Study</Option>
                        <Option value="2">Repeat Diagnostic Study</Option>
                        <Option value="3">CPAP Study</Option>
                        <Option value="4">BiPAP Study</Option>
                        <Option value="5">Repeat Therapeutic Study</Option>
                        <Option value="6">Study to Assess Other Therapy</Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>
                <div className="techName">
                  <h2>
                    Acquisition Tech Name <br />
                  </h2>
                  <Form.Item key="techName">
                    {getFieldDecorator("location", { initialValue: "0" })(
                      <Select style={{ width: 300 }} onChange={handleChange}>
                        <Option value="0" hidden>
                          Tech Name
                        </Option>
                        <Option value="1">Johnny</Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Study Results" key="3">
              Content of Tab Pane 3
            </TabPane>
            <TabPane
              tab="Interpretation Details"
              key="4"
              className="interpretationDetails"
            >
              <div className="InterpretationInfo">
                <div className="InterpretingDoctor">
                  <h2>
                    Interpreting Doctor <br />
                  </h2>
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
                  <h2>
                    Interpretation Date <br />
                  </h2>
                  <Form.Item>
                    {getFieldDecorator("interp_date")(
                      <Input
                        prefix={<Icon type="calendar" style={{ fontSize: 13 }} />}
                        placeholder="Interpretation Date (dd/mm/yyyy)"
                        onChange={this.handleDateChange}
                        maxLength={10}
                        style={{ width: 300 }}
                      />
                    )}
                  </Form.Item>
                </div>
                <div className="StudyLink">
                  <h2>
                    Link To Study <br />
                  </h2>
                  <p> Link </p>
                </div>
              </div>
              <div className="Interpretation">
                <div className="Rating">
                  <h2>
                    Rating <br />{" "}
                  </h2>
                  <Form.Item>
                    <Select
                      defaultValue="Select A Rating"
                      onChange={handleChange}
                      style={{ width: 250 }}
                    >
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                      <Option value="5">5</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="reportSendDate">
                  <h2>
                    Date Report Sent <br />{" "}
                  </h2>
                  <Form.Item>
                    {getFieldDecorator("sent_date")(
                      <Input
                        prefix={<Icon type="calendar" style={{ fontSize: 13 }} />}
                        placeholder="Sent Date (dd/mm/yyyy)"
                        onChange={this.handleDateChange}
                        maxLength={10}
                        style={{ width: 300 }}
                      />
                    )}
                  </Form.Item>
                </div>
                <div className="Comments">
                  <h2>
                    {" "}
                    Comments <br />{" "}
                  </h2>
                  <Form.Item>
                    <TextArea
                      style={({ fontSize: 13 }, { width: 400 })}
                      placeholder="Comments"
                      autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                  </Form.Item>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Post-Study Details" key="5">
              Content of Tab Pane 5
            </TabPane>
          </Tabs>
          <Button type="primary" htmlType="submit" className="save-button">
            Save
          </Button>
        </div>
      </div>
    );
  }
}

export default Form.create()(PatientInfoPage);
