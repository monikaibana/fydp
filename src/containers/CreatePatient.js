// Create a Patient Page

import React from "react";
import "antd/dist/antd.css";
import "../styles/mainstyles.css";
import "../styles/CreatePatientStyles.css";
import { Form, Icon, Input, Button, Select, Card } from "antd";
import createPatient from "../routes/api-routes";
import Sidebar from "../components/Sidebar.js";

const { Option } = Select;
const { TextArea } = Input;
const Tabs = [
  {
    key: "patientInformation",
    tab: "Patient Information"
  },]

const tablist = {
  /* this is where we edit the content for the tabs*/
  patientInformation: <p>Patient info content</p>,
};

function handleChange(value) {
  console.log(`selected ${value}`);
}

function formatDate(value) {
  return value.replace(/^(\d\d)\/(\d\d)\/(\d\d\d\d)$/g, "$3-$2-$1");
}

function requestBody(values) {
  var body = {
    operation: "create",
    tableName: "bluebook-patient",
    payload: {
      Item: {
        id: parseInt(values.id),
        surname: values.surname,
        givenName: values.givenName,
        dob: formatDate(values.dob),
        gender: values.gender,
        studyType: parseInt(values.studyType),
        notes: values.notes
      }
    }
  };
  return body;
}

class CreatePatientPage extends React.Component {
  handleSubmit = async e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        createPatient(requestBody(values));
        console.log(values);
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
          window.location.href = "/info";
        }, 3000);
      } else {
        console.log(err);
      }
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCheckbox = () => {
    this.setState({ checked: true });
  };

  handleDateChange = e => {
    e.target.value = e.target.value
      .replace(/^(\d\d)(\d)$/g, "$1/$2")
      .replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2")
      .replace(/[^\d/]/g, "");
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="PatientInfoPage">
        {/* <Button type="primary" onClick={this.showModal}>
          Add Patient
        </Button> */}
        <div className="Sidebar">
          <Sidebar value={"PatientList"} />
        </div>
        <div className="BackButton">
          <Icon type="left" /> Back
        </div>
        <div className="PatientName">
        	Add Patient
        </div>
        <div className="InfoTabs">
          <Card
            style={{ width: "100%" }}
            tabList={Tabs}
          >
          <div className="CreatePatientForm">
            <Form.Item key="surname">
              {getFieldDecorator("surname", {
                rules: [
                  {
                    required: true,
                    message: "Please input the patient's surname"
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  placeholder="Patient Surname"
                />
              )}
            </Form.Item>
            <Form.Item key="givenName">
              {getFieldDecorator("givenName", {
                rules: [
                  {
                    required: true,
                    message: "Please input the patient's given name(s)"
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  placeholder="Patient Given Name(s)"
                />
              )}
            </Form.Item>
            <Form.Item key="id">
              {getFieldDecorator("id", {
                rules: [
                  { required: true, message: "Please input the patient's PID" }
                ]
              })(
                <Input
                  prefix={<Icon type="number" style={{ fontSize: 13 }} />}
                  placeholder="PID"
                  maxLength={9}
                />
              )}
            </Form.Item>
            <Form.Item key="dob">
              {getFieldDecorator("dob", {
                rules: [
                  {
                    required: true,
                    message: "Please input the patient's date of birth"
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="calendar" style={{ fontSize: 13 }} />}
                  placeholder="Date of Birth (dd/mm/yyyy)"
                  onChange={this.handleDateChange}
                  maxLength={10}
                  style={{ width: 300 }}
                />
              )}
            </Form.Item>
            <Form.Item key="gender">
              {getFieldDecorator("gender", { initialValue: "Gender" })(
                <Select style={{ width: 300 }} onChange={handleChange}>
                  <Option value="Gender" hidden>
                    Gender
                  </Option>
                  <Option value="M">Male</Option>
                  <Option value="F">Female</Option>
                </Select>
              )}
            </Form.Item>
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
            <Form.Item key="notes">
              {getFieldDecorator("notes")(
                <TextArea placeholder="Notes" autoSize />
              )}
              <div style={{ margin: "24px 0" }} />
            </Form.Item>
            <Form.Item>
      			<Button type="primary" >Submit</Button>
      		</Form.Item>
      		</div>
      	</Card>
        </div>
       </div>
    );
  }
}

export default Form.create()(CreatePatientPage);
