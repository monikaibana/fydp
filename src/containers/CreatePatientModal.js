import React from "react";
import "antd/dist/antd.css";
import "../styles/mainstyles.css";
import {
  CalendarOutlined,
  NumberOutlined,
  UploadOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Input,
  Button,
  Select,
  Modal,
  Checkbox,
  Upload,
  message,
  Form
} from "antd";
import createPatient from "../routes/api-routes";
const { Option } = Select;
const { TextArea } = Input;
const today = new Date().toISOString().slice(0, 10);

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
        notes: values.notes,
        status: 1,
        time_1: today
      }
    }
  };
  return body;
}

class CreatePatientModal extends React.Component {
  formRef = React.createRef();
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
    document.getElementById("submitButton").click();
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFinish = async values => {
    await createPatient(requestBody(values));
    if (this.state.checked !== true) {
      setTimeout(() => {
        this.props.parentCallback(false);
      }, 2500);
      window.location.reload();
    } else {
      this.onReset();
    }
  };

  state = {
    loading: false,
    visible: true,
    checked: false
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
    if (this.state.checked === true) {
      this.setState({ checked: false });
      console.log(this.state.checked);
    } else {
      this.setState({ checked: true });
      console.log(this.state.checked);
    }
  };

  render() {
    const { visible, loading } = this.state;

    return (
      <div className="create-patient-modal">
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          labelCol={{
            span: 9
          }}
          wrapperCol={{
            span: 13
          }}
        >
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
                type="primary"
                key="submit"
                loading={loading}
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            ]}
          >
            <div className="create-patient-container">
              <Form.Item
                name="surname"
                label="Patient Surname"
                getValueFromEvent={e =>
                  e.target.value.replace(/\b\w{3,}/g, function(l) {
                    return l.charAt(0).toUpperCase() + l.slice(1);
                  })
                }
                rules={[
                  {
                    required: true,
                    message: "Please input the patient's surname"
                  }
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ fontSize: 13 }} />}
                  placeholder="Patient Surname"
                />
              </Form.Item>
              <Form.Item
                name="givenName"
                label="Patient Given Name(s)"
                getValueFromEvent={e =>
                  e.target.value.replace(/\b\w{3,}/g, function(l) {
                    return l.charAt(0).toUpperCase() + l.slice(1);
                  })
                }
                rules={[
                  {
                    required: true,
                    message: "Please input the patient's given name(s)"
                  }
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{ fontSize: 13 }} />}
                  placeholder="Patient Given Name(s)"
                />
              </Form.Item>
              <Form.Item
                name="id"
                label="PID"
                rules={[
                  {
                    required: true,
                    message: "Please input the patient's PID"
                  }
                ]}
              >
                <Input
                  prefix={<NumberOutlined style={{ fontSize: 13 }} />}
                  placeholder="PID"
                  maxLength={9}
                />
              </Form.Item>
              <Form.Item
                name="dob"
                label="Date of Birth"
                getValueFromEvent={e =>
                  e.target.value
                    .replace(/^(\d\d)(\d)$/g, "$1/$2")
                    .replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2")
                    .replace(/[^\d/]/g, "")
                }
                rules={[
                  {
                    required: true,
                    message: "Please input the patient's date of birth"
                  }
                ]}
              >
                <Input
                  prefix={<CalendarOutlined style={{ fontSize: 13 }} />}
                  placeholder="Date of Birth (dd/mm/yyyy)"
                  maxLength={10}
                  style={{ width: 240 }}
                />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Please input the patient's gender"
                  }
                ]}
              >
                <Select
                  style={{ width: 240 }}
                  showSearch
                  placeholder="Gender"
                  optionFilterProp="children"
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
              <Form.Item name="notes" label="Notes" key="notes">
                <TextArea placeholder="Notes" autoSize />
              </Form.Item>
              <Form.Item
                name="referral"
                style={{
                  marginLeft: "135px"
                }}
              >
                <Upload {...props}>
                  <Button>
                    <UploadOutlined /> Click to Attach a Referral
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </Modal>
          <Form.Item>
            <Button htmlType="submit" id="submitButton" hidden />
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default CreatePatientModal;
