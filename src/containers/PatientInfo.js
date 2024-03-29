import React from "react";
import AccessDenied from "../components/AccessDenied.js";
import {
  CalendarOutlined,
  LeftOutlined,
  NumberOutlined,
  UserOutlined
} from "@ant-design/icons";
import "@ant-design/compatible/assets/index.css";
import {
  Tabs,
  Select,
  Input,
  Button,
  DatePicker,
  Checkbox,
  message,
  Form
} from "antd";
import "../styles/PatientInfoStyles.css";
import "../styles/mainstyles.css";
import Sidebar from "../components/Sidebar.js";
import getDefaultValues, {
  getPatientId,
  getTimeInStatus,
  getExpressionValues,
  getUpdateExpression,
  getExpressionNames
} from "../components/utils.js";
import {
  getPatientInfo,
  archivePatient,
  updatePatient
} from "../routes/api-routes";

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

const dateFormat = "DD/MM/YYYY";

function onCheck(e) {
  console.log(`checked = ${e.target.checked}`);
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
        id: getPatientId(window.location.href)
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
        id: getPatientId(window.location.href)
      },
      UpdateExpression: "set #st = :archive",
      ExpressionAttributeValues: {
        ":archive": 13
      },
      ExpressionAttributeNames: {
        "#st": "status"
      }
    }
  };
  return body;
}

function savePatientBody(values) {
  var body = {
    operation: "update",
    tableName: "bluebook-patient",
    payload: {
      Key: {
        id: getPatientId(window.location.href)
      },
      UpdateExpression: getUpdateExpression(values),
      ExpressionAttributeValues: getExpressionValues(values),
      ExpressionAttributeNames: getExpressionNames(values)
    }
  };
  console.log(body);
  return body;
}

class PatientInfoPage extends React.Component {
  state = {
    key: "Patient_Information",
    db_data: []
  };

  formRef = React.createRef();

  loadData = async () => {
    try {
      var objvalues = await getPatientInfo(getPatientInfoBody());
      this.setState({ db_data: objvalues, didLoad: true });
      console.log(this.state.db_data);
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.didLoad) {
      this.loadData();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.didLoad !== this.state.didLoad) return true;
    return false;
  }

  handleSave() {
    message
      .loading("Saving..", 0.5)
      .then(() => message.success("Saved", 0.5))
      .then(() => (window.location.href = "/list"));
  }

  onTabChange = (key, type) => {
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

  onFinish = async values => {
    console.log(savePatientBody(values));
    await updatePatient(savePatientBody(values));
  };

  getPatientStatus = () => {
    const patientStatus = [
      "Referral Received/For Triage",
      "Triaged",
      "Consultation Booked",
      "Consultation Complete",
      "Study Booked",
      "Study Data Collected",
      "Study Scored",
      "Results Interpreted by Physician",
      "Study Follow-up booked",
      "Study Follow-up Complete",
      "Treatment Follow-up Booked",
      "Treatment Follow-up Complete",
      "Archived"
    ];
    return patientStatus[this.state.db_data.Item.status - 1];
  };

  getDefaultTab = () => {
    const defaultTab = [
      "1",
      "2",
      "2",
      "2",
      "2",
      "3",
      "4",
      "5", // hard code this
      "4",
      "5",
      "4",
      "5",
      "1"
    ];
    return defaultTab[this.state.db_data.Item.status - 1];
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  checkStatus = () => {
    var isDisabled = false;
    if (this.state.db_data.Item.status === 13) {
      isDisabled = true;
    }
    return isDisabled;
  };

  render() {
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
                <LeftOutlined /> Back
              </Button>
              <div className="PatientName">
                {this.state.db_data.Item.surname},{" "}
                {this.state.db_data.Item.givenName}
              </div>
              <div className="StatusInfo">
                <div>
                  Status
                  <br />
                  <b>{this.getPatientStatus()}</b>{" "}
                  {/* will address later due to issue with .status thing*/}
                </div>
                <div className="TimeInStatus">
                  Time in Status
                  <br />{" "}
                  <b>
                    {getTimeInStatus(this.state.db_data.Item)}
                    {getTimeInStatus(this.state.db_data.Item) === 1
                      ? " Day"
                      : " Days"}
                  </b>
                </div>
              </div>
              <Form
                onFinish={this.onFinish}
                initialValues={getDefaultValues(this.state.db_data.Item)}
                ref={this.formRef}
              >
                <div className="InfoTabs">
                  <Tabs type="card" defaultActiveKey={this.getDefaultTab()}>
                    {/* ––––––––––––––––––––––––––––––––––––––––––– Tab 1 ––––––––––––––––––––––––––––––––––––––––––––––– */}
                    <TabPane
                      tab="Patient Information"
                      key="1"
                      className="PatientDetails"
                    >
                      <div className="PatientInfo">
                        <div className="whiteBar" />
                        <div>
                          <h2>
                            Patient Surname <br />
                          </h2>
                          <Form.Item name="surname">
                            <Input
                              prefix={<UserOutlined style={{ fontSize: 13 }} />}
                              placeholder="Patient Surname"
                              style={{ width: 250 }}
                              autoComplete="off"
                              disabled={this.checkStatus()}
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            Patient Given Name(s) <br />
                          </h2>
                          <Form.Item name="givenName">
                            <Input
                              prefix={<UserOutlined style={{ fontSize: 13 }} />}
                              placeholder="Patient Given Name(s)"
                              style={{ width: 250 }}
                              autoComplete="off"
                              disabled={this.checkStatus()}
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            PID <br />
                          </h2>
                          <Form.Item name="pid">
                            <Input
                              prefix={
                                <NumberOutlined style={{ fontSize: 13 }} />
                              }
                              placeholder="PID"
                              maxLength={9}
                              style={{ width: 250 }}
                              autoComplete="off"
                              disabled={this.checkStatus()}
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            Patient DOB <br />
                          </h2>
                          <Form.Item name="dob">
                            <Input
                              prefix={
                                <CalendarOutlined style={{ fontSize: 13 }} />
                              }
                              placeholder="Date of Birth (dd/mm/yyyy)"
                              onChange={this.handleDateChange}
                              maxLength={10}
                              style={{ width: 250 }}
                              disabled={this.checkStatus()}
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            Patient Gender <br />{" "}
                          </h2>
                          <Form.Item name="gender">
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Gender"
                              optionFilterProp="children"
                              onSearch={onSearch}
                              disabled={this.checkStatus()}
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              <Option value="M">Male</Option>
                              <Option value="F">Female</Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="Triaging">
                        <div>
                          <h2>
                            Triage Result <br />{" "}
                          </h2>
                          <Form.Item name="triageResult">
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Triage Type"
                              optionFilterProp="children"
                              onSearch={onSearch}
                              disabled={this.checkStatus()}
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
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            Triage Tag <br />{" "}
                          </h2>
                          <Form.Item name="priority">
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Triage Tag"
                              optionFilterProp="children"
                              onSearch={onSearch}
                              disabled={this.checkStatus()}
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
                          </Form.Item>
                        </div>
                        <div className="Notes">
                          <h2>
                            {" "}
                            Notes <br />{" "}
                          </h2>
                          <Form.Item name="notes">
                            <TextArea
                              style={({ fontSize: 13 }, { width: 450 })}
                              placeholder="Notes"
                              autoSize={{ minRows: 2, maxRows: 6 }}
                              disabled={this.checkStatus()}
                            />
                          </Form.Item>
                        </div>
                        <div className="ReferralLink">
                          <h2>
                            Link To Referral File <br />
                          </h2>
                          <p></p>
                          <a
                            href="https://bluebook-public.s3.amazonaws.com/patient-referral-file.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            smb://server/referrals/2020/
                            {this.state.db_data.Item.surname}-
                            {this.state.db_data.Item.givenName}-Referral.pdf
                          </a>
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
                        <div className="whiteBar" />
                        <div>
                          <h2>
                            Date of Appointment <br />
                          </h2>
                          <Form.Item name="appDate">
                            <DatePicker
                              key="appDate"
                              format={dateFormat}
                              style={{ width: 250 }}
                              disabled={this.checkStatus()}
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <Form.Item name="appBooked" valuePropName="checked">
                            <Checkbox
                              key="apptBooked"
                              disabled={this.checkStatus()}
                            >
                              Next Appointment Booked
                            </Checkbox>
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            Date of Next Appointment <br />
                          </h2>
                          <Form.Item name="nextAppDate">
                            <DatePicker
                              key="nextApptDate"
                              format={dateFormat}
                              style={{ width: 250 }}
                              disabled={this.checkStatus()}
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="StudyInfo">
                        <div className="techName">
                          <h2>
                            Acquisition Tech Name <br />
                          </h2>
                          <Form.Item name="acqTech">
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Tech Name"
                              optionFilterProp="children"
                              onSearch={onSearch}
                              disabled={this.checkStatus()}
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              <Option value="1">[Acquisition Tech #1]</Option>
                              <Option value="2">[Acquisition Tech #2]</Option>
                              <Option value="3">[Acquisition Tech #3]</Option>
                            </Select>
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            Location <br />
                          </h2>
                          <Form.Item name="location">
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Bed Number"
                              optionFilterProp="children"
                              onSearch={onSearch}
                              disabled={this.checkStatus()}
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              <Option value="1">HAM-1</Option>
                              <Option value="2">HAM-2</Option>
                              <Option value="3">HAM-3</Option>
                              <Option value="4">HAM-4</Option>
                              <Option value="5">HAM-5</Option>
                              <Option value="6">HAM-6</Option>
                              <Option value="7">HAM-7</Option>
                              <Option value="8">HAM-8</Option>
                              <Option value="9">HAM-9</Option>
                              <Option value="10">HAM-10</Option>
                              <Option value="11">HAM-11</Option>
                              <Option value="12">HAM-12</Option>
                              <Option value="13">STK-1</Option>
                              <Option value="14">STK-2</Option>
                              <Option value="15">STK-3</Option>
                              <Option value="16">STK-4</Option>
                              <Option value="17">STK-5</Option>
                              <Option value="18">STK-6</Option>
                              <Option value="19">CMH-1</Option>
                              <Option value="20">CMH-2</Option>
                              <Option value="21">CMH-3</Option>
                              <Option value="22">CMH-4</Option>
                              <Option value="23">CMH-5</Option>
                              <Option value="24">CMH-6</Option>
                            </Select>
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            ACQ <br />
                          </h2>
                          <Form.Item name="acq">
                            <Input
                              prefix={
                                <NumberOutlined style={{ fontSize: 13 }} />
                              }
                              placeholder="ACQ"
                              maxLength={9}
                              style={{ width: 250 }}
                              disabled={this.checkStatus()}
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            Study Type <br />{" "}
                          </h2>
                          <Form.Item name="appType">
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Study Type"
                              optionFilterProp="children"
                              onSearch={onSearch}
                              disabled={this.checkStatus()}
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
                          </Form.Item>
                        </div>
                      </div>
                    </TabPane>
                    {/* ––––––––––––––––––––––––––––––––––––––––––– Tab 3 ––––––––––––––––––––––––––––––––––––––––––––––– */}
                    <TabPane
                      tab="Study Results"
                      key="3"
                      className="StudyResults"
                    >
                      <div className="Scoring">
                        <div className="whiteBar" />
                        <div>
                          <h2>
                            Scorer <br />
                          </h2>
                          <Form.Item name="scoringTech">
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Scorer"
                              optionFilterProp="children"
                              onSearch={onSearch}
                              disabled={this.checkStatus()}
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              <Option value="1">[Scoring Tech #1]</Option>
                              <Option value="2">[Scoring Tech #2]</Option>
                              <Option value="3">[Scoring Tech #3]</Option>
                            </Select>
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            Scored Date <br />
                          </h2>
                          <Form.Item name="scoringDate">
                            <DatePicker
                              key="scoringDate"
                              format={dateFormat}
                              style={{ width: 250 }}
                              disabled={this.checkStatus()}
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            AHI <br />
                          </h2>
                          <Form.Item name="ahi">
                            <Input
                              style={{ width: 250 }}
                              maxLength={2}
                              placeholder="AHI"
                              disabled={this.checkStatus()}
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            REM AHI <br />
                          </h2>
                          <Form.Item name="remahi">
                            <Input
                              style={{ width: 250 }}
                              maxLength={2}
                              placeholder="REM AHI"
                              disabled={this.checkStatus()}
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            Scorer Rating <br />
                          </h2>
                          <Form.Item name="studyScore">
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Scorer Rating"
                              optionFilterProp="children"
                              onSearch={onSearch}
                              disabled={this.checkStatus()}
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
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div className="AdditionalInfo">
                        <div>
                          <h2>
                            Study Tag <br />
                          </h2>
                          <Form.Item name="studyTag">
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Study Tag"
                              optionFilterProp="children"
                              onSearch={onSearch}
                              disabled={this.checkStatus()}
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              <Option
                                value="1"
                                style={{ background: "#dd7e6b" }}
                              >
                                Urgent
                              </Option>
                              <Option
                                value="2"
                                style={{ background: "#a4c2f4" }}
                              >
                                CPAP/ BiPAP titration
                              </Option>
                              <Option
                                value="3"
                                style={{ background: "#b6d7a8" }}
                              >
                                Needs review
                              </Option>
                              <Option
                                value="3"
                                style={{ background: "#d9d2e9" }}
                              >
                                Daytime Study
                              </Option>
                            </Select>
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            Referring Physician <br />
                          </h2>
                          <Form.Item name="refPhysician">
                            <Input
                              style={{ width: 250 }}
                              placeholder="Referring Physician"
                              disabled={this.checkStatus()}
                            />
                          </Form.Item>
                        </div>
                        <div className="StudyLink">
                          <h2>
                            Link to Study <br />
                          </h2>
                          <p></p>
                          <a
                            href="https://bluebook-public.s3.amazonaws.com/patient-study-file.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            smb://server/study/2020/
                            {this.state.db_data.Item.surname}-
                            {this.state.db_data.Item.givenName}-Study.pdf
                          </a>
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
                        <div className="whiteBar" />
                        <div className="AHI">
                          <h2>
                            AHI <br />
                          </h2>
                          <b>{this.state.db_data.Item.ahi}</b>
                          <br />
                          <br />
                        </div>
                        <div className="REMAHI">
                          <h2>
                            REM AHI <br />
                          </h2>
                          <b>{this.state.db_data.Item.remahi}</b>
                          <br />
                          <br />
                        </div>
                        <div className="ScorerRating">
                          <h2>
                            Scorer Rating <br />
                          </h2>
                          <b>{this.state.db_data.Item.studyScore}</b>
                          <br />
                          <br />
                        </div>
                        <div className="InterpStudyLink">
                          <h2>Link to Study</h2>
                          <a
                            href="https://bluebook-public.s3.amazonaws.com/patient-study-file.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            smb://server/
                            {this.state.db_data.Item.surname}-
                            {this.state.db_data.Item.givenName}-Study.pdf
                          </a>
                        </div>
                      </div>
                      <div className="Interpretation">
                        <div>
                          <h2>
                            Interpreting Doctor <br />
                          </h2>
                          <Form.Item name="interDoctor">
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Interpreting Doctor"
                              optionFilterProp="children"
                              onSearch={onSearch}
                              disabled={this.checkStatus()}
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              <Option value="1">
                                [Interpreting Doctor #1]
                              </Option>
                              <Option value="2">
                                [Interpreting Doctor #2]
                              </Option>
                              <Option value="3">
                                [Interpreting Doctor #3]
                              </Option>
                            </Select>
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            Interpretation Date <br />
                          </h2>
                          <Form.Item name="interDate">
                            <DatePicker
                              key="interDate"
                              format={dateFormat}
                              disabled={this.checkStatus()}
                              style={{ width: 250 }}
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <h2>
                            Doctor Rating <br />{" "}
                          </h2>
                          <Form.Item name="interRating">
                            <Select
                              showSearch
                              style={{ width: 250 }}
                              placeholder="Doctor Rating"
                              optionFilterProp="children"
                              onSearch={onSearch}
                              disabled={this.checkStatus()}
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
                            </Select>
                          </Form.Item>
                        </div>
                        <div>
                          <Form.Item
                            name="urgentActionRequired"
                            valuePropName="checked"
                          >
                            <Checkbox
                              className="urgentAction"
                              onChange={onCheck}
                              disabled={this.checkStatus()}
                            >
                              Urgent Action Required
                            </Checkbox>
                          </Form.Item>
                        </div>
                        <div className="Comments">
                          <h2>
                            {" "}
                            Special Comments <br />{" "}
                          </h2>
                          <Form.Item name="comments">
                            <TextArea
                              style={({ fontSize: 13 }, { width: 450 })}
                              placeholder="Comments"
                              autoSize={{ minRows: 2, maxRows: 6 }}
                              disabled={this.checkStatus()}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </TabPane>
                    {/* ––––––––––––––––––––––––––––––––––––––––––– Tab 5 ––––––––––––––––––––––––––––––––––––––––––––––– */}
                    <TabPane tab="Post-Study Details" key="5">
                      <div className="PostStudyDetails">
                        <div className="ReportSendDate">
                          <div className="whiteBar" />
                          <h2>
                            Date Report Sent <br />
                          </h2>
                          <Form.Item name="reportDate">
                            <DatePicker
                              key="reportSendDate"
                              format={dateFormat}
                              style={{ width: 250 }}
                              disabled={this.checkStatus()}
                            />
                          </Form.Item>
                          <Form.Item name="billed" valuePropName="checked">
                            <Checkbox
                              onChange={onCheck}
                              disabled={this.checkStatus()}
                            >
                              Study Billed
                            </Checkbox>
                          </Form.Item>
                        </div>
                      </div>
                    </TabPane>
                  </Tabs>
                  {/* ––––––––––––––––––––––––––––––––––––––––––– Buttons ––––––––––––––––––––––––––––––––––––––––––––––– */}
                  {this.checkStatus() === true ? (
                    <div className="Unarchive">
                      <Button
                        type="primary"
                        className="unarchive_button"
                        style={{ width: 100 }}
                      >
                        Unarchive
                      </Button>
                    </div>
                  ) : (
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
                      <Form.Item
                        label="Change Status to:"
                        className="change-status"
                        name="status"
                      >
                        <Select style={{ width: 250 }}>
                          <Option value="1">Referral Received</Option>
                          <Option value="2">Triaged</Option>
                          <Option value="3">Consultation Booked</Option>
                          <Option value="4">Consultation Complete</Option>
                          <Option value="5">Study Booked</Option>
                          <Option value="6">Study Data Collected</Option>
                          <Option value="7">Study Scored</Option>
                          <Option value="8">
                            Results Interpreted by Physician
                          </Option>
                          <Option value="9">Study Follow-up booked</Option>
                          <Option value="10">Study Follow-up Complete</Option>
                          <Option value="11">Treatment Follow-up Booked</Option>
                          <Option value="12">
                            Treatment Follow-up Complete
                          </Option>
                          <Option value="13">Archived</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="save-button"
                          style={{ width: 75 }}
                          onClick={this.handleSave}
                        >
                          Save
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="normal"
                          className="cancel-button"
                          style={{ width: 75 }}
                          onClick={this.onReset}
                        >
                          Cancel
                        </Button>
                      </Form.Item>
                    </div>
                  )}
                </div>
              </Form>
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

export default PatientInfoPage;
