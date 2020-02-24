import React from "react";
import "antd/dist/antd.css";
import "../styles/mainstyles.css";
import {
  Form,
  Icon,
  Input,
  Button,
  Select,
  Modal,
  Checkbox,
  Upload,
  message
} from "antd";
import createPatient from "../routes/api-routes";
const { Option } = Select;
const { TextArea } = Input;
function handleChange(value) {
  console.log(`selected ${value}`);
}

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text"
  },
  onChange(info) {
    if (info.file.status !== "attaching file") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file attached successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file attachment failed.`);
    }
  }
};

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
        notes: values.notes
      }
    }
  };
  return body;
}

class CreatePatientModal extends React.Component {
  createPatient = async (
    id,
    surname,
    givenName,
    dob,
    gender,
    study_type,
    notes
  ) => {
    try {
      console.log(id, surname, givenName, dob, gender, study_type, notes);
      alert(`Patient ${surname}, ${givenName} added`);
    } catch (e) {
      alert(e.message);
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        createPatient(requestBody(values));
        console.log(values);
        setTimeout(() => {
          this.props.parentCallback(false);
        }, 3000);
      } else {
        console.log(err);
      }
    });
  };

  state = {
    loading: false,
    visible: true
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.parentCallback(false);
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
            <Form.Item label="Patient Surname" key="surname">
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
            <Form.Item label="Patient Given Name(s)" key="givenName">
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
            <Form.Item label="PID" key="id">
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
            <Form.Item label="Date of Birth" key="dob">
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
            <Form.Item label="Gender" key="gender">
              {getFieldDecorator("gender", {
                rules: [
                  {
                    required: true,
                    message: "Please input the patient's gender"
                  }
                ],
                initialValue: "Gender"
              })(
                <Select style={{ width: 240 }} onChange={handleChange}>
                  <Option value="Gender" hidden>
                    Gender
                  </Option>
                  <Option value="M">Male</Option>
                  <Option value="F">Female</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Notes" key="notes" onChange={handleChange}>
              {getFieldDecorator("notes")(
                <TextArea placeholder="Notes" autoSize />
              )}
              <div style={{ margin: "24px 0" }} />
            </Form.Item>
            <Form.Item key="attached_referral">
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Click to Attach a Referral
                </Button>
              </Upload>
            </Form.Item>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(CreatePatientModal);