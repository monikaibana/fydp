// Create a Patient Page

import React from "react";
import "antd/dist/antd.css";
import "../styles/mainstyles.css";
import { Form, Icon, Input, Button, Select, Modal, Checkbox } from "antd";
import createPatient from "../routes/api-routes";

const { Option } = Select;
const { TextArea } = Input;

function handleChange(value) {
  console.log(`selected ${value}`);
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
        dob: values.dob,
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
        }, 3000);
      } else {
        alert(err);
      }
    });
  };

  state = {
    loading: false,
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
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
    const { visible, loading } = this.state;

    return (
      <div className="create-patient-modal">
        <Button type="primary" onClick={this.showModal}>
          Add Patient
        </Button>
        <Modal
          visible={visible}
          title="Add Patient"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Checkbox
              key="add_another"
              onChange={this.handleCheckbox}
              style={{ float: "left" }}
            >
              Add another patient{" "}
            </Checkbox>,
            <Button key="cancel" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          ]}
        >
          <div className="create-patient-container">
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
                  style={{ width: 240 }}
                />
              )}
            </Form.Item>
            <Form.Item key="gender">
              {getFieldDecorator("gender", { initialValue: "Gender" })(
                <Select style={{ width: 240 }} onChange={handleChange}>
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
                <Select style={{ width: 240 }} onChange={handleChange}>
                  <Option value="0" hidden>
                    Study Type
                  </Option>
                  <Option value="1">Initial Diagnostic Study</Option>
                  <Option value="2">Repeat Diagnostic Study</Option>
                  <Option value="3">Repeat Diagnostic Study</Option>
                  <Option value="4">CPAP Study</Option>
                  <Option value="5">BiPAP Study</Option>
                  <Option value="6">Repeat Therapeutic Study</Option>
                  <Option value="7">Study to Assess Other Therapy</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item key="notes">
              {getFieldDecorator("notes")(
                <TextArea placeholder="Notes" autoSize />
              )}
              <div style={{ margin: "24px 0" }} />
            </Form.Item>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(CreatePatientPage);
