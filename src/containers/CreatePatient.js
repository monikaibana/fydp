// Placeholder file for Create a Patient Page

import React from "react";
import "antd/dist/antd.css";
import "../styles/mainstyles.css";
import { Form, Icon, Input, Button, Checkbox, Select } from "antd";


const { Option } = Select;

class CreatePatientPage extends React.Component {
	render() {
         return (
             <div className="create-patient-page">
             <div className="create-patient-container">
                 <h1>Add Patient</h1>
                 		<Form.Item label="Name">
				        </Form.Item>
				        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
				      	</Form.Item>

				        <Form.Item label="Gender">
				        </Form.Item>
				        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
				      	</Form.Item>
						
						<Form.Item label="Date of Birth">
				        </Form.Item>
				        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
				      	</Form.Item>

				      	<Form.Item label="PID">
				        </Form.Item>
				        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
				      	</Form.Item>

						<Form.Item label="Study Type">
				        </Form.Item>
				        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
				      	</Form.Item>
    			 <Button type="primary">Add Patient</Button>
             </div>
             </div>
         );
     }
}

export default CreatePatientPage;