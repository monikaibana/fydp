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
import { getPatientInfo, archivePatient } from "../routes/api-routes";

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

function getPatientInfoBody() {
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

function archivePatientBody() {
  var body = {
    operation: "update",
    tableName: "bluebook-patient",
    payload: {
      Key: {
        id: 122 // This is where the id number goes for the patient you are retrieving
      },
      UpdateExpression: "set #st = :archive",
      ExpressionAttributeValues: {
        ":archive": 0
      },
      ExpressionAttributeNames: {
        "#st": "status"
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
      var objvalues = await getPatientInfo(getPatientInfoBody());
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

  onArchive = async () => {
    await archivePatient(archivePatientBody()).then(
      (window.location.href = "/list")
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(window.location.href);

    return (
      <>
        {this.props.isAuthenticated ? (
          <>
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
                <div>
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
                  {/* ––––––––––––––––––––––––––––––––––––––––––– Tab 1 ––––––––––––––––––––––––––––––––––––––––––––––– */}
                  <TabPane
                    tab="Patient Information"
                    key="1"
                    className="PatientDetails"
                  >
                    <div className="PatientInfo">
                      <div>
                        <h2>
                          Patient Surname <br />
                        </h2>
                        <Form.Item key="patientSurname">
                          {getFieldDecorator("PatientSurname")(
                            <Input
                              prefix={
                                <Icon type="user" style={{ fontSize: 13 }} />
                              }
                              placeholder="Patient Surname"
                              style={{ width: 250 }}
                            />
                          )}
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          Patient Given Name(s) <br />
                        </h2>
                        <Form.Item key="patientGivenName">
                          {getFieldDecorator("patientGivenName")(
                            <Input
                              prefix={
                                <Icon type="user" style={{ fontSize: 13 }} />
                              }
                              placeholder="Patient Given Name(s)"
                              style={{ width: 250 }}
                            />
                          )}
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          PID <br />
                        </h2>
                        <Form.Item key="id">
                          {getFieldDecorator("id")(
                            <Input
                              prefix={
                                <Icon type="number" style={{ fontSize: 13 }} />
                              }
                              placeholder="PID"
                              maxLength={9}
                              style={{ width: 250 }}
                            />
                          )}
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          Patient DOB <br />
                        </h2>
                        <Form.Item key="dob">
                          {getFieldDecorator("dob")(
                            <Input
                              prefix={
                                <Icon
                                  type="calendar"
                                  style={{ fontSize: 13 }}
                                />
                              }
                              placeholder="Date of Birth (dd/mm/yyyy)"
                              onChange={this.handleDateChange}
                              maxLength={10}
                              style={{ width: 250 }}
                            />
                          )}
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          Patient Gender <br />{" "}
                        </h2>
                        <Form.Item key="gender">
                          {getFieldDecorator("gender")(
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Gender"
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
                              <Option value="M">Male</Option>
                              <Option value="F">Female</Option>
                            </Select>
                          )}
                        </Form.Item>
                      </div>
                    </div>
                    <div className="Triaging">
                      <div>
                        <h2>
                          Triage Result <br />{" "}
                        </h2>
                        <Form.Item key="triage_type">
                          {getFieldDecorator("triageType")(
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Triage Type"
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
                              <Option value="1">IDS</Option>
                              <Option value="2">Consult - R</Option>
                              <Option value="3">Consult - X</Option>
                              <Option value="4">Consult - General</Option>
                            </Select>
                          )}
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          Triage Tag <br />{" "}
                        </h2>
                        <Form.Item key="study_type">
                          {getFieldDecorator("studyType")(
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Triage Tag"
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
                              <Option value="1">Urgent</Option>
                              <Option value="2">ASAP</Option>
                              <Option value="3">HP CL</Option>
                              <Option value="4">HP</Option>
                              <Option value="5">Routine</Option>
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
                            style={({ fontSize: 13 }, { width: 450 })}
                            placeholder="Notes"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                          />
                        </Form.Item>
                      </div>
                      <div className="ReferralLink">
                        <h2>
                          Link To Referral File <br />
                        </h2>
                        <p> filename.pdf </p>
                      </div>
                    </div>
                  </TabPane>
                  {/* ––––––––––––––––––––––––––––––––––––––––––– Tab 2 ––––––––––––––––––––––––––––––––––––––––––––––– */}
                  <TabPane
                    tab="Appointment Information"
                    key="2"
                    className="StudyDetails"
                  >
                    <div className="ApptInfo">
                      <div>
                        <h2>
                          Date of Appointment <br />
                        </h2>
                        <Form.Item key="appt_date">
                          <DatePicker
                            key="apptDate"
                            format={dateFormat}
                            style={{ width: 250 }}
                          />{" "}
                          <br />
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item key="appt_booked">
                          <Checkbox key="apptBooked">
                            {" "}
                            Next Appointment Booked
                          </Checkbox>
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          Date of Next Appointment <br />
                        </h2>
                        <Form.Item key="next_appt_date">
                          <DatePicker
                            key="nextApptDate"
                            format={dateFormat}
                            style={{ width: 250 }}
                          />{" "}
                          <br />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="StudyInfo">
                      <div className="techName">
                        <h2>
                          Acquisition Tech Name <br />
                        </h2>
                        <Form.Item key="techName">
                          {getFieldDecorator("techName")(
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Tech Name"
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
                              <Option value="1">Johnny</Option>
                              <Option value="2">James</Option>
                              <Option value="3">Jimmy</Option>
                            </Select>
                          )}
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          Location <br />
                        </h2>
                        <Form.Item key="location">
                          {getFieldDecorator("location")(
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Bed Number"
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
                      <div>
                        <h2>
                          ACQ <br />
                        </h2>
                        <Form.Item key="acq">
                          {getFieldDecorator("acq")(
                            <Input
                              prefix={
                                <Icon type="number" style={{ fontSize: 13 }} />
                              }
                              placeholder="ACQ"
                              maxLength={9}
                              style={{ width: 250 }}
                            />
                          )}
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          Study Type <br />{" "}
                        </h2>
                        <Form.Item key="atudy_type">
                          {getFieldDecorator("StudyType")(
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Study Type"
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
                              <Option value="1">IDS</Option>
                              <Option value="2">RDS - R</Option>
                              <Option value="3">RDS - X</Option>
                              <Option value="4">CPAP</Option>
                              <Option value="5">BiPAP</Option>
                              <Option value="6">
                                Repeat Therapeutic Study
                              </Option>
                              <Option value="7">
                                Study to assess other therapy
                              </Option>
                            </Select>
                          )}
                        </Form.Item>
                      </div>
                    </div>
                  </TabPane>
                  {/* ––––––––––––––––––––––––––––––––––––––––––– Tab 3 ––––––––––––––––––––––––––––––––––––––––––––––– */}
                  <TabPane tab="Study Results" key="3" className="StudyResults">
                    <div className="Scoring">
                      <div>
                        <h2>
                          Scorer <br />
                        </h2>
                        <Form.Item key="scorer">
                          {getFieldDecorator("scorer")(
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Scorer"
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
                              <Option value="1">Johnny</Option>
                              <Option value="2">James</Option>
                              <Option value="3">Jimmy</Option>
                            </Select>
                          )}
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          Scored Date <br />
                        </h2>
                        <Form.Item key="scoreDate">
                          <DatePicker
                            format={dateFormat}
                            style={{ width: 250 }}
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          AHI <br />
                        </h2>
                        <Form.Item key="ahi">
                          {getFieldDecorator("AHI")(
                            <Input
                              style={{ width: 250 }}
                              maxLength={2}
                              placeholder="AHI"
                            />
                          )}
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          REM AHI <br />
                        </h2>
                        <Form.Item key="REMAHI">
                          {getFieldDecorator("REMAHI")(
                            <Input
                              style={{ width: 250 }}
                              maxLength={2}
                              placeholder="REM AHI"
                            />
                          )}
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          Sleep Study Score <br />
                        </h2>
                        <Form.Item key="studyScore">
                          {getFieldDecorator("studyScore")(
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Study Score"
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
                    <div className="AdditionalInfo">
                      <div>
                        <h2>
                          Study Tag <br />
                        </h2>
                        <Form.Item key="studyTag">
                          {getFieldDecorator("studyTag")(
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Study Tag"
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
                              <Option value="1">Tag 1</Option>
                              <Option value="2">Tag 2</Option>
                              <Option value="3">Tag 3</Option>
                            </Select>
                          )}
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          Referring Physician <br />
                        </h2>
                        <Form.Item key="referringPhysician">
                          {getFieldDecorator("referringPhysician")(
                            <Select
                              showSearch
                              style={{ width: 250 }}
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
                              <Option value="Dr. Gooderman">
                                Dr. Gooderman
                              </Option>
                              <Option value="Dr. Goodestman">
                                Dr. Goodestman
                              </Option>
                            </Select>
                          )}
                        </Form.Item>
                      </div>
                      <div className="StudyLink">
                        <h2>
                          Link to Study <br />
                        </h2>
                        <p>LinkToStudy.pdf</p>
                      </div>
                    </div>
                  </TabPane>
                  {/* ––––––––––––––––––––––––––––––––––––––––––– Tab 4 ––––––––––––––––––––––––––––––––––––––––––––––– */}
                  <TabPane
                    tab="Interpretation Details"
                    key="4"
                    className="InterpretationDetails"
                  >
                    <div className="StudyDets">
                      <div className="AHI">
                        <h2>
                          AHI <br />
                        </h2>
                        <b>25</b>
                        <br />
                        <br />
                      </div>
                      <div className="REMAHI">
                        <h2>
                          REM AHI <br />
                        </h2>
                        <b>12</b>
                        <br />
                        <br />
                      </div>
                      <div className="StudyScore">
                        <h2>
                          Sleep Study Score <br />
                        </h2>
                        <b>4</b>
                        <br />
                        <br />
                      </div>
                      <div className="InterpStudyLink">
                        <h2>
                          Link to Study <br />
                        </h2>
                        <p>LinkToStudy.pdf</p>
                      </div>
                    </div>
                    <div className="Interpretation">
                      <div>
                        <h2>
                          Interpreting Doctor <br />
                        </h2>
                        <Form.Item>
                          <Select
                            showSearch
                            style={{ width: 250 }}
                            placeholder="Interpreting Doctor"
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
                            <Option value="Raymond Gottschalk">
                              Raymond Gottschalk
                            </Option>
                          </Select>
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          Interpretation Date <br />
                        </h2>
                        <Form.Item>
                          <DatePicker
                            key="interpretationDate"
                            format={dateFormat}
                            style={{ width: 250 }}
                          />{" "}
                          <br />
                        </Form.Item>
                      </div>
                      <div>
                        <h2>
                          Doctor Rating <br />{" "}
                        </h2>
                        <Form.Item>
                          <Select
                            showSearch
                            style={{ width: 250 }}
                            placeholder="Doctor Rating"
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
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
                          </Select>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item>
                          <Checkbox className="urgentAction" onChange={onCheck}>
                            Urgent Action Required
                          </Checkbox>
                        </Form.Item>
                      </div>
                      <div className="Comments">
                        <h2>
                          {" "}
                          Special Comments <br />{" "}
                        </h2>
                        <Form.Item>
                          <TextArea
                            style={({ fontSize: 13 }, { width: 450 })}
                            placeholder="Notes"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </TabPane>
                  {/* ––––––––––––––––––––––––––––––––––––––––––– Tab 5 ––––––––––––––––––––––––––––––––––––––––––––––– */}
                  <TabPane tab="Post-Study Details" key="5">
                    <div className="PostStudyDetails">
                      <div className="ReportSendDate">
                        <h2>
                          Date Report Sent <br />
                        </h2>
                        <Form.Item>
                          <DatePicker
                            key="reportSendDate"
                            format={dateFormat}
                            style={{ width: 250 }}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Checkbox onChange={onCheck}>Study Billed</Checkbox>
                        </Form.Item>
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
                {/* ––––––––––––––––––––––––––––––––––––––––––– Buttons ––––––––––––––––––––––––––––––––––––––––––––––– */}
                <div className="bottomButtons">
                  <Button
                    type="danger"
                    ghost
                    className="archive-button"
                    onClick={() => {
                      this.onArchive();
                      // window.location.href = "/list";
                    }}
                  >
                    Archive Patient
                  </Button>
                  <div className="changeStatus">Change Status to: &nbsp;</div>
                  <Form.Item className="StatusUpdate">
                    <Select
                      defaultValue="Referral Received"
                      onChange={handleChange}
                      style={{ width: 250 }}
                    >
                      <Option value="Referral Received">
                        Referral Received
                      </Option>
                      <Option value="Triaged">Triaged</Option>
                      <Option value="Consultation Booked">
                        Consultation Booked
                      </Option>
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
                      <Option value="Follow-up complete">
                        Follow-up Complete
                      </Option>
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
                    className="cancel-button"
                    style={{ width: 75 }}
                  >
                    Cancel
                  </Button>
                </div>
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

export default Form.create()(PatientInfoPage);
