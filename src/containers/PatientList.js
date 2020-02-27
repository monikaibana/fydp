import React from "react";
import "../styles/mainstyles.css";
import "../styles/PatientListStyles.css";
import "antd/dist/antd.css";
import Sidebar from "../components/Sidebar.js";
import { getPatientList } from "../routes/api-routes";
// import { Auth } from "aws-amplify";
import { Form, Select, Table, Input , Button, Icon} from "antd";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const { Option } = Select;
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
function setId(id) {
    id = id.toString();
    console.log(id);
    window.location.replace(`/info/${id}`)
  }

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
  
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  
  render() {
    //var dataSource = this.state.db_data["Items"];
    var StudyType = [];
    for (var i = 0; i < this.state.db_data.Count; i++) {
      if (this.state.db_data["Items"][i].studyType === 1) {
        StudyType[i]= "IDS"
      }
      else if (this.state.db_data["Items"][i].studyType === 2) {
        StudyType[i]= "RDS-R"
      }
      else if (this.state.db_data["Items"][i].studyType === 3) {
        StudyType[i]= "RDS-X"
      }
      else if (this.state.db_data["Items"][i].studyType === 4) {
        StudyType[i]= "CPAP Study"
      }
      else if (this.state.db_data["Items"][i].studyType === 5) {
        StudyType[i]= "BiPAP Study"
      }
      else if (this.state.db_data["Items"][i].studyType === 6) {
        StudyType[i]= "Repeat Therapeutic Study"
      }
      else if (this.state.db_data["Items"][i].studyType === 7) {
        StudyType[i]= "Study to Assess Other Therapy"
      }
      else {
        StudyType[i]="Undefined"
      }

    };
    var dataSource = [];
    for (var count = 0; count < this.state.db_data.Count; count++) {
      dataSource[count] = {
        name: this.state.db_data["Items"][count].surname + ", " + this.state.db_data["Items"][count].givenName,
        id: this.state.db_data["Items"][count].id,
        TIS: count + " days", // leave this for now
        studyType: StudyType[count],
        triageTag: "triage tag", //left for now
        notes: this.state.db_data["Items"][count].notes,
        Link: "Link", // left for now
        key: this.state.db_data["Items"][count].id
      };
    }

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps('name'),
      },
      {
        title: "PID",
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id,
        ...this.getColumnSearchProps('id'),
      },
      {
        title: "Time In Status",
        key: "TIS",
        dataIndex: "TIS",
        sorter: (a, b) => a.TIS.localeCompare(b.TIS),
      },
      {
        title: "Study Type",
        key: "studyType",
        dataIndex: "studyType",
        sorter: (a, b) => a.studyType.localeCompare(b.studyType),
        
      },
      {
        title: "Triage Tag",
        key: "triageTag",
        dataIndex: "triageTag",
        sorter: (a, b) => a.triageTag - b.triageTag
      },
      {
        title: "Notes",
        dataIndex: "notes",
        key: "notes",
        ellipsis: true,
        width: 200
      },
      {
        title: "Patient File",
        dataIndex: "Link",
        key: "Link",
        render: text => <a href="list">{text}</a>
      }
    ];

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
              defaultValue="All Statuses"
              onChange={handleChange}
              style={{ width: 250 }}
            >
              <Option value="All Statuses">
                All Statuses
              </Option>
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
            <b> {this.state.db_data.Count} </b> &nbsp; Patients in this status
          </div>
          {/*
          <div className="Display">Display</div>
          <div className="NumberOfItems">
            <Form.Item>
              <Select defaultValue="10" onChange={handleSizeChange}>
                <Option value="10">10</Option>
                <Option value="25">25</Option>
                <Option value="50">50</Option>
                <Option value="100">100</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="PerPage">items per page.</div> */}
          <div className="Table">
            <Router>
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  pagination={({ position: "bottom", alignment: "center", showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'] })}
                  scroll={{ y: 415 }}
                  size={"small"}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: event => {setId(record.id)}, // click row to open patient's info page with info/[PID] as url
                    };
                  }}
                />
              <Route path="/:id"/>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}
export default PatientListPage;
