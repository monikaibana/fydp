// Placeholder file for Create a Patient Page

import React from "react";
import "antd/dist/antd.css";
import "../styles/mainstyles.css";
import { Form, Icon, Input, Button, Select } from "antd";

const { Option } = Select;
const { TextArea } = Input;

function handleChange(value) {
  console.log(`selected ${value}`);
}

class CreatePatientPage extends React.Component {

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

render() {
	const { getFieldDecorator } = this.props.form;
    return (
         <div className="create-patient-page">
             <div className="create-patient-container">
             	<h1>Add Patient</h1>
             	<Form.Item>
		            {getFieldDecorator("Name", {
		                rules: [
		                  { required: true,
		                  	message: "Please input the patient's name" },
		                  { validator: this.checkPatientName }
		                ]
		              })(
		                <Input
		                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
		                  placeholder="Patient Name"
		                />
		              )}  
				</Form.Item>
				<Form.Item>
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
		                />
		              )}
				</Form.Item>
				<Form.Item>
		            {getFieldDecorator("Date of Birth", {
		                rules: [
		                  { required: true,
		                  	message: "Please input the patient's date of birth" },
		                  { validator: this.checkDOB }
		                ]
			             })(
		                <Input
		                  prefix={<Icon type="calendar" style={{ fontSize: 13 }} />}
		                  placeholder="Date of Birth"
		                />
		            )}  
				</Form.Item>
				<Form.Item>
					<Select defaultValue="Gender" style={{ width: 240 }} onChange={handleChange}>
						<Option value="Male">Male</Option>
					    <Option value="Female">Female</Option>
					</Select>
				</Form.Item>
				<Form.Item>
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
				<Form.Item>
					<TextArea placeholder="Notes" autoSize />
        			<div style={{ margin: '24px 0' }} />
				</Form.Item>
    			<Form.Item>
    				<Button type="primary">Add Patient</Button>
				</Form.Item>
             </div>
         </div>
    );
	}
}

export default Form.create()(CreatePatientPage);