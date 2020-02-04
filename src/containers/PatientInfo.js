// Placeholder file for Patient Information Page

import React from "react";
import { Card, Icon, Select, Form } from 'antd';
import "../styles/PatientInfoStyles.css";
import Sidebar from "../components/Sidebar.js";

const { Option } = Select;
function handleChange(value) {
    console.log(`selected ${value}`);
  }
const Tabs = [
    {
      key: 'Patient_Information',
      tab: 'Patient Information',
    },
    {
      key: 'Study_Information',
      tab: 'Study Information',
    },
    {
      key: 'Study_Results',
      tab: 'Study Results',
    },
    {
        key: 'Interpretation_Details',
        tab: 'Interpretation Details'
    }
  ];
  
  const tablist= {
      /* this is where we edit the content for the tabs*/
    Patient_Information: <p>Patient info content</p>,
    Study_Information: <p>study info content</p>,
    Study_Results: <p>study result content</p>,
    Interpretation_Details: <p> Interpretation details content</p>
  };

class PatientInfoPage extends React.Component {

    state = {
        key: 'Patient_Information',
      };
    
      onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
      };

    render() {
        return(
            <div className= 'PatientInfoPage'>
                <div className="Sidebar">
                    <Sidebar value={"PatientInfo"} />
                </div>
                <div className='BackButton'>
                    <Icon type="left" /> Back
                </div>
                <div className='PatientName'>
                    Patient Name
                </div>
                <div className='StatusInfo'>
                    <div className='PatientStatus'>
                        Status
                        <br/>
                        <Form.Item>
                        <Select defaultValue="Patient Status" onChange={handleChange} style={{width: 250}}>
                            <Option value="Referral Received/For Triage">
                            Referral Received/For Triage
                            </Option>
                            <Option value="Triaged">Triaged</Option>
                            <Option value="Consultation Booked">Consultation Booked</Option>
                            <Option value="Consultation Complete">
                            Consultation Complete
                            </Option>
                            <Option value="Study Booked">Study Booked</Option>
                            <Option value="Study Data Collected">Study Data Collected</Option>
                            <Option value="Study Scored">Study Scored</Option>
                            <Option value="Results Interpreted by Physician">
                            Results Interpreted by Physician
                            </Option>
                            <Option value="Study Follow-up booked">
                            Study Follow-up booked
                            </Option>
                            <Option value="Follow-up complete">Follow-up Complete</Option>
                            <Option value="Treatment Follow-up Booked">
                            Treatment Follow-up Booked
                            </Option>
                            <Option value="Treatment Follow-up Complete">
                            Treatment Follow-up Complete
                            </Option>
                        </Select>
                        </Form.Item>
                    </div>
                    <div className="TimeInStatus">
                        Time in Status
                        <br/>
                        3 Days
                    </div>
                </div>
                <div className='InfoTabs'>
                    <Card
                    style={{ width: '100%' }}
                    tabList={Tabs}
                    activeTabKey={this.state.noTitleKey}
                    onTabChange={key => {
                    this.onTabChange(key, 'noTitleKey');
                    }}>
                        {tablist[this.state.noTitleKey]}
                    </Card>
                </div>
            </div>
        )
    }
}

export default PatientInfoPage;