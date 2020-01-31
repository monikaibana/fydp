// Placeholder file for Create a Patient Page

import React from "react";
import "antd/dist/antd.css";
import "../styles/mainstyles.css";
import { Form, Icon, Input, Button, Select, Modal, Checkbox } from "antd";

const { Option } = Select;
const { TextArea } = Input;

function handleChange(value) {
  console.log(`selected ${value}`);
}

class CreatePatientPage extends React.Component {

state = {
    loading: false,
    visible: false,
  };

showModal = () => {
	this.setState({
	  visible: true,
	});
};

handleCancel = () => {
	this.setState({ visible: false });
};

handleCheckbox = () => {
	this.setState({ checked: true });
};

handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          alert('Received values of form: ', values);
        } else {
          alert(err)
        }
      });
    }

handleOk = () => {
	this.setState({ loading: true });
	setTimeout(() => {
	  this.setState({ loading: false, visible: false });
	}, 3000);
};

handleDateChange = (e) => {
	e.target.value = e.target.value.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d\/\d\d)(\d+)$/g,'$1/$2').replace(/[^\d/]/g,'');
};

render() {
	const { getFieldDecorator } = this.props.form;
	const { visible, loading } = this.state;

    return (
         <div className="create-patient-modal">
			<Button type="primary" onClick={this.showModal} >
	          Add Patient
	        </Button>
	        <Modal
	          visible={visible}
	          title="Add Patient"
	          onOk={this.handleOk}
	          onCancel={this.handleCancel}
	          footer={[
	          	<Checkbox key="add_another" onChange={this.handleCheckbox} style={{float: 'left'}} >Add another patient </Checkbox>,
	            <Button key="cancel" onClick={this.handleCancel}>
	              Cancel
	            </Button>,
	            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
	              Submit
	            </Button>,
	          ]}
	        >
             	<div className="create-patient-container">
	             	<Form.Item key="surname" >
			            {getFieldDecorator("Surname", {
			                rules: [
			                  { required: true,
			                  	message: "Please input the patient's surname" },
			                  { validator: this.checkPatientSurname }
			                ]
			              })(
			                <Input
			                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
			                  placeholder="Patient Surname"
			                />
			              )}  
					</Form.Item>
					<Form.Item key="first_name">
			            {getFieldDecorator("First Name(s)", {
			                rules: [
			                  { required: true,
			                  	message: "Please input the patient's first name(s)" },
			                  { validator: this.checkPatientFirstName }
			                ]
			              })(
			                <Input
			                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
			                  placeholder="Patient First Name(s)"
			                />
			              )}  
					</Form.Item>
					<Form.Item key="pid">
			            {getFieldDecorator("PID", {
			                rules: [
			                  { required: true,
			                  	message: "Please input the patient's PID" },
			                  { validator: this.checkPID }
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
			            {getFieldDecorator("Date of Birth", {
			                rules: [
			                  { required: true,
			                  	message: "Please input the patient's date of birth" },
			                  { validator: this.checkDOB }
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
						<Select defaultValue="Gender" style={{ width: 240 }} onChange={handleChange}>
							<Option value="Male">Male</Option>
						    <Option value="Female">Female</Option>
						</Select>
					</Form.Item>
					<Form.Item key="study_type">
						<Select defaultValue="Study Type" style={{ width: 240 }} onChange={handleChange}>
							<Option value="Initial Diagnostic study">Initial Diagnostic Study</Option>
						    <Option value="Repeat Diagnostic Study">Repeat Diagnostic Study</Option>
						    <Option value="Repeat Diagnostic Study">Repeat Diagnostic Study</Option>
						    <Option value="CPAP Study">CPAP Study</Option>
						    <Option value="BiPAP Study">BiPAP Study</Option>
						    <Option value="Repeat Therapeutic Study">Repeat Therapeutic Study</Option>
						    <Option value="Study to Assess Other Therapy">Study to Assess Other Therapy</Option>
						</Select>
					</Form.Item>
					<Form.Item key="notes">
						<TextArea placeholder="Notes" autoSize />
	        			<div style={{ margin: '24px 0' }} />
					</Form.Item>
				</div>
	        </Modal>
         </div>
    );
	}
}

export default Form.create()(CreatePatientPage);