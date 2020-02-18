import React from "react";
import "../styles/mainstyles.css";
import "../styles/PatientListStyles.css";
import "antd/dist/antd.css";
import Sidebar from "../components/Sidebar.js";
import { getPatientList } from "../routes/api-routes";
// import { Auth } from "aws-amplify";
import { Form, Select, Table, Tag, Input } from "antd";
const { Option } = Select;
const { Search } = Input;
function handleChange(value) {
  console.log(`selected ${value}`);
}

function requestBody() {
  var body = {
    operation: "list",
    tableName: "bluebook-patient",
    payload: {
      tableName: "bluebook-patient"
    }
  };
  return body;
}

const columns = [
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    render: text => <a>{text}</a>
  },
  {
    title: "PID",
    dataIndex: "PID",
    key: "PID"
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
    key: "Link to Patient File",
    render: text => <a>{text}</a>
  }
];

/*filler data until linked to backend */
const data = [
  {
    key: "1",
    Name: "John Brown",
    PID: "112049586",
    TIS: "17 days",
    tags: ["Urgent", "IDS"],
    Notes: "",
    Link: "Link"
  },
  {
    key: "2",
    Name: "Jenna Brown",
    PID: "112049599",
    TIS: "7 days",
    tags: ["Routine", "RDS"],
    Notes: "",
    Link: "Link"
  },
  {
    key: "3",
    Name: "John Brown",
    TIS: "0 days",
    PID: "112049631",
    tags: ["Urgent", "IDS"],
    Notes: "Occupation involves driving",
    Link: "Link"
  }
];

class PatientListPage extends React.Component {
  state = { db_data: [] };

  async componentDidMount() {
    try {
      var objvalues = await getPatientList(requestBody());
      this.setState({ db_data: objvalues });
      console.log(this.state.db_data);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="ListingPage">
        <div className="Sidebar">
          <Sidebar value={"PatientList"} />
        </div>
        <div className="PageTitle">
          <h2>Patient Listing</h2>
        </div>
        <div className="Filter">
          <h2>Please pick a status:</h2>
          <Form.Item>
            <Select
              defaultValue="Patient Status"
              onChange={handleChange}
              style={{ width: 250 }}
            >
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
              dataSource={this.componentDidMount}
              pagination={({ position: "bottom" }, { alignment: "centre" })}
              size={"small"}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default PatientListPage;
