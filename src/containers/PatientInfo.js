// Patient Information Page

import React from "react";
import "antd/dist/antd.css";
import "../styles/mainstyles.css";
import { Typography } from "antd";

const { Paragraph } = Typography;
const { Text } = Typography;

class PatientInfoPage extends React.Component {
    
    state = {
    str: '[Notes]',
	};
	onChange = str => {
	    console.log('Content change:', str);
	    this.setState({ str });
	};

render() {
    return (
         <div className="patient-info-page">
             <div className="patient-info-container">
             	<h1>Patient Information</h1>
             	<h4>Name</h4>
             	<Text>[Name]</Text>
             	<br /><br />
             	<h4>PID</h4>
             	<Paragraph copyable>#########</Paragraph>
             	<h4>Date of Birth</h4>
             	<Text>[##/##/####]</Text>
             	<br /><br />
             	<h4>Gender</h4>
             	<Text>[Gender]</Text>
             	<br /><br />
             	<h4>Study Type</h4>
             	<Text>[Study Type]</Text>
             	<br /><br />
             	<h4>Notes</h4>
             	<Paragraph editable={{ onChange: this.onChange }}>{this.state.str}</Paragraph>
             </div>
         </div>
    );
	}
}

export default PatientInfoPage;