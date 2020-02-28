import React from "react";
import {
  Tabs,
  Icon,
  Select,
  Form,
  Input,
  Button,
  DatePicker,
  Checkbox
} from "antd";
import "../styles/PatientInfoStyles.css";
import Sidebar from "../components/Sidebar.js";
import moment from "moment";
import { getPatientInfo } from "../routes/api-routes";

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}
const { TabPane } = Tabs;
const { TextArea } = Input;
function callback(key) {
  console.log(key);
}

const dateFormat = "DD/MM/YYYY";

function onCheck(e) {
  console.log(`checked = ${e.target.checked}`);
}

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

function requestBody() {
  var body = {
    operation: "read",
    tableName: "bluebook-patient",
    payload: {
      Key: {
        id: 1000 // This is where the id number goes for the patient you are retrieving
      }
    }
  };
  return body;
}

class PatientInfoPage extends React.Component {
  state = {
    key: "Patient_Information",
    db_data: []
  };

  async componentDidMount() {
    try {
      var objvalues = await getPatientInfo(requestBody());
      this.setState({ db_data: objvalues });
      console.log(this.state.db_data);
    } catch (err) {
      console.log(err);
    }
  }

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
  }

  render() {
    const { getFieldDecorator } = this.props.form;

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
            <b>Patient Status</b>
          </div>
          <div className="TimeInStatus">
            Time in Status
            <br /> <b>3 Days</b>
          </div>
        </div>
        <div className="InfoTabs">
          <Tabs onChange={callback} type="card">
            <TabPane
              tab="Patient Information"
              key="1"
              className="patientDetails"
            >
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
                        prefix={
                          <Icon type="calendar" style={{ fontSize: 13 }} />
                        }
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
              <div className="Triaging">
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
                <div className="Notes">
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
                  <div className="referralLink">
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
                        prefix={
                          <Icon type="calendar" style={{ fontSize: 13 }} />
                        }
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
                    {getFieldDecorator("techName", { initialValue: "0" })(
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
            <TabPane tab="Study Results" key="3" className="studyResults">
              <div className="scoring">
                <div className="scorer">
                  Scorer
                  <Form.Item key="scorer">
                    {getFieldDecorator("scorer", { initialValue: "0" })(
                      <Select style={{ width: 300 }} onChange={handleChange}>
                        <Option value="0" hidden>
                          Scorer Name
                        </Option>
                        <Option value="1">Johnny</Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>
                <div className="scoreDate">
                  Scored Date <br />
                  <DatePicker
                    key="scoreDate"
                    format={dateFormat}
                    style={{ width: 300 }}
                    defaultValue={moment()}
                  />{" "}
                  <br />
                  <br />
                </div>
                <div className="ahi">
                  AHI
                  <Form.Item key="AHI">
                    {getFieldDecorator("AHI")(
                      <Input
                        style={{ width: 300 }}
                        maxLength="2"
                        placeholder="AHI"
                      />
                    )}
                  </Form.Item>
                  REM AHI
                  <Form.Item key="REMAHI">
                    {getFieldDecorator("REMAHI")(
                      <Input
                        style={{ width: 300 }}
                        maxLength="2"
                        placeholder="REM AHI"
                      />
                    )}
                  </Form.Item>
                </div>
                <div className="score">
                  Sleep Study Score
                  <Form.Item key="studyScore">
                    {getFieldDecorator("studyScore", { initialValue: "0" })(
                      <Select style={{ width: 300 }} onChange={handleChange}>
                        <Option value="0" hidden>
                          Score
                        </Option>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="additionalInfo">
                <div className="studyTag">
                  Study Tag
                  <Form.Item key="studyTag">
                    {getFieldDecorator("studyTag", { initialValue: "0" })(
                      <Select style={{ width: 300 }} onChange={handleChange}>
                        <Option value="0">None</Option>
                        <Option value="1">Tag 1</Option>
                        <Option value="2">Tag 2</Option>
                        <Option value="3">Tag 3</Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>
                <div className="referringPhysician">
                  Referring Physician
                  <Form.Item key="referringPhysician">
                    {getFieldDecorator("referringPhysician")(
                      <Select
                        showSearch
                        style={{ width: 300 }}
                        placeholder="Referring Physician"
                        optionFilterProp="children"
                        onChange={handleChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="Dr. Goodman">Dr. Goodman</Option>
                        <Option value="Dr. Gooderman">Dr. Gooderman</Option>
                        <Option value="Dr. Goodestman">Dr. Goodestman</Option>
                      </Select>
                    )}
                  </Form.Item>
                </div>
                <div className="link">
                  Link to Study
                  <p>Link</p>
                </div>
              </div>
            </TabPane>
            <TabPane
              tab="Interpretation Details"
              key="4"
              className="interpretationDetails"
            >
              <div className="studyDets">
                <div className="AHI">
                  <h2>AHI</h2>
                  <b>25</b>
                </div>
                <div className="REMAHI">
                  <h2>REM AHI</h2>
                  <b>12</b>
                </div>
                <div className="studyScore">
                  <h2>Sleep Study Score</h2>
                  <b>4</b>
                </div>
                <div className="StudyLink">
                  <h2>
                    Link To Study <br />
                  </h2>
                  <p> Link </p>
                </div>
              </div>
              <div className="Interpretation">
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
                  <DatePicker
                    key="interpretationDate"
                    format={dateFormat}
                    style={{ width: 200 }}
                    defaultValue={moment()}
                  />{" "}
                  <br />
                </div>
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
                <Checkbox className="urgentAction" onChange={onCheck}>
                  Urgent Action Required
                </Checkbox>
                <div className="Comments">
                  <h2>
                    {" "}
                    <br />
                    Special Comments <br />
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
              <div className="postStudyDetails">
                <div className="reportSendDate">
                  Date Report Sent <br />
                  <DatePicker
                    key="reportSendDate"
                    format={dateFormat}
                    style={{ width: 200 }}
                    defaultValue={moment()}
                  />{" "}
                  <br />
                  <br />
                  <Checkbox onChange={onCheck}>Study Billed</Checkbox>
                </div>
              </div>
            </TabPane>
          </Tabs>
          <div className="bottomButtons">
            <Button
              type="danger"
              ghost
              htmlType="delete"
              className="archive-button"
            >
              Archive Patient
            </Button>
            <div className="changeStatus">Change Status to: &nbsp;</div>
            <Form.Item className="statusUpdate">
              <Select
                defaultValue="Referral Received"
                onChange={handleChange}
                style={{ width: 250 }}
              >
                <Option value="Referral Received">Referral Received</Option>
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
            <Button
              type="primary"
              htmlType="submit"
              className="save-button"
              style={{ width: 75 }}
            >
              Save
            </Button>
            <Button
              type="normal"
              htmlType="cancel"
              className="cancel-button"
              style={{ width: 75 }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(PatientInfoPage);
