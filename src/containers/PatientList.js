import React from "react";
import "../styles/mainstyles.css";
import "../styles/PatientListStyles.css"
import "antd/dist/antd.css";
import Sidebar from "../components/Sidebar.js";
// import { Auth } from "aws-amplify";
import { Form, Select, Table, Tag, Input } from "antd";
const { Option } = Select;
const {Search} = Input;
function handleChange(value) {
  console.log(`selected ${value}`);
}
const columns = [
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    render: text => <a>{text}</a>
  },
  {
    title: "Date Of Birth",
    dataIndex: "DOB",
    key: "Date Of Birth"
  },
  {
    title: "Gender",
    dataIndex: "Gender",
    key: "Gender"
  },
  {
    title: "Time In Status",
    key: "TIS",
    dataIndex: "TIS"
  },
  {
    title: "Tags",
    key: "Tags",
    dataIndex: "tags",
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = "geekblue";
          if (tag === "Urgent") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "Notes",
    dataIndex: "Notes",
    key: "Notes"
  },
  {
    title: "Link to Patient File",
    dataIndex: "Link",
    key: "Link to Patient File"
  }
];

/*filler data until linked to backend */
const data = [
  {
    key: "1",
    Name: "John Brown",
    DOB: "1965-03-08",
    Gender: "Male",
    TIS: "3:45",
    tags: ["Urgent", "IDS"],
    Notes: "words words words",
    Link: "Link"
  },
  {
    key: "2",
    Name: "Jenna Brown",
    DOB: "1978-07-21",
    Gender: "Female",
    TIS: "19:40",
    tags: ["Routine", "RDS"],
    Notes: "words words words",
    Link: "Link"
  },
  {
    key: "3",
    Name: "John Brown",
    DOB: "1965-03-08",
    Gender: "Male",
    TIS: "3:45",
    tags: ["Urgent", "IDS"],
    Notes: "words words words",
    Link: "Link"
  }
];

class PatientListPage extends React.Component {
  render() {
    return (
      <div className="ListingPage">
        <div className="Sidebar">
          <Sidebar value={"PatientList"} />
        </div>
        <div className="Title">
          <h2>Patient Listing</h2>
        </div>
        <div className="Filter">
          <h2>Please pick a status:</h2>
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
        <div className="ListedPatients">
          <div className="NumberOfPatients">
            <b>3</b> &nbsp; Patients in this status
          </div>
          <div className="Display">Display</div>
          <div className="NumberOfItems">
            <Form.Item>
              <Select defaultValue="10" onChange={handleChange}>
                <Option value="10">10</Option>
                <Option value="25">25</Option>
                <Option value="50">50</Option>
                <Option value="100">100</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="PerPage">items per page.</div>
          <div className="SearchBar">
            <Search
            placeholder="Search"
            onSearch={value => console.log(value)}
            style={{ width: 250 }}
            />
          </div>
          <div className="Table">
            <Table
              columns={columns}
              dataSource={data}
              pagination={({ position: "bottom" }, { alignment: "centre" })}
              size={'small'}
            />
            ;
          </div>
        </div>
      </div>
    );
  }
}
export default PatientListPage;
