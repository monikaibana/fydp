import React from "react";
import "../styles/mainstyles.css";
import "../styles/PatientListStyles.css";
import "antd/dist/antd.css";
import Sidebar from "../components/Sidebar.js";
import { getPatientList } from "../routes/api-routes";
import { Form, Select, Table, Input, Button, Icon } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";

const { Option } = Select;

function setId(id) {
  id = id.toString();
  window.location.assign(`/info/${id}`);
}

class PatientListPage extends React.Component {
  state = { didLoad: null, db_data: [], filter: 0 };

  requestBody() {
    var body = {
      operation: "list",
      payload: {
        TableName: "bluebook-patient"
      }
    };
    if (this.state.filter === 0) {
      return body;
    } else {
      body = {
        operation: "list",
        payload: {
          TableName: "bluebook-patient",
          FilterExpression: "#st = :filter",
          ExpressionAttributeNames: {
            "#st": "status"
          },
          ExpressionAttributeValues: {
            ":filter": parseInt(this.state.filter)
          }
        }
      };
      return body;
    }
  }

  loadData = async () => {
    try {
      var objvalues = await getPatientList(this.requestBody());
      this.setState({ db_data: objvalues, didLoad: true });
      console.log(this.state.db_data);
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.didLoad) {
      this.loadData();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.didLoad !== this.state.didLoad ||
      nextState.filter !== this.state.filter ||
      nextState.db_data.length !== this.state.db_data.length ||
      nextState.db_data.Count !== this.state.db_data.Count
    )
      return true;
    return false;
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
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
    }
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  handleChange = value => {
    this.setState({ filter: parseInt(value) });
  };

  render() {
    var StudyType = [];
    for (var i = 0; i < this.state.db_data.Count; i++) {
      if (this.state.db_data["Items"][i].studyType === 1) {
        StudyType[i] = "IDS";
      } else if (this.state.db_data["Items"][i].studyType === 2) {
        StudyType[i] = "RDS-R";
      } else if (this.state.db_data["Items"][i].studyType === 3) {
        StudyType[i] = "RDS-X";
      } else if (this.state.db_data["Items"][i].studyType === 4) {
        StudyType[i] = "CPAP Study";
      } else if (this.state.db_data["Items"][i].studyType === 5) {
        StudyType[i] = "BiPAP Study";
      } else if (this.state.db_data["Items"][i].studyType === 6) {
        StudyType[i] = "Repeat Therapeutic Study";
      } else if (this.state.db_data["Items"][i].studyType === 7) {
        StudyType[i] = "Study to Assess Other Therapy";
      } else {
        StudyType[i] = "Undetermined";
      }
    }
    var dataSource = [];
    for (var j = 0; j < this.state.db_data.Count; j++) {
      dataSource[j] = {
        name:
          this.state.db_data["Items"][j].surname +
          ", " +
          this.state.db_data["Items"][j].givenName,
        id: this.state.db_data["Items"][j].id,
        TIS: j, // leave this for now
        studyType: StudyType[j],
        triageTag: "triage tag", //left for now
        notes: this.state.db_data["Items"][j].notes,
        Link: "Link" // left for now
      };
    }

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        ...this.getColumnSearchProps("name")
      },
      {
        title: "PID",
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id,
        ...this.getColumnSearchProps("id")
      },
      {
        title: "Days in Status",
        key: "TIS",
        dataIndex: "TIS",
        sorter: (a, b) => a.TIS - b.TIS
      },
      {
        title: "Study Type",
        key: "studyType",
        dataIndex: "studyType",
        sorter: (a, b) => a.studyType.localeCompare(b.studyType)
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
      <>
        {this.props.isAuthenticated ? (
          <>
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
                    onChange={value => this.handleChange(value)}
                    style={{ width: 250 }}
                  >
                    <Option value="0">All Statuses</Option>
                    <Option value="1">Referral Received/For Triage</Option>
                    <Option value="2">Triaged</Option>
                    <Option value="3">Consultation Booked</Option>
                    <Option value="4">Consultation Complete</Option>
                    <Option value="5">Study Booked</Option>
                    <Option value="6">Study Data Collected</Option>
                    <Option value="7">Study Scored</Option>
                    <Option value="8">Results Interpreted by Physician</Option>
                    <Option value="9">Study Follow-up booked</Option>
                    <Option value="10">Follow-up Complete</Option>
                    <Option value="11">Treatment Follow-up Booked</Option>
                    <Option value="12">Treatment Follow-up Complete</Option>
                    <Option value="13">Archived</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="ListedPatients">
                <div className="NumberOfPatients">
                  <b> {this.state.db_data.Count} </b> &nbsp; Patients in this
                  status
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
                      pagination={{
                        position: "bottom",
                        alignment: "center",
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "25", "50", "100"]
                      }}
                      scroll={{ y: 800}}
                      size={"small"}
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: event => {
                            setId(record.id);
                          } // click row to open patient's info page with info/[PID] as url
                        };
                      }}
                    />
                    <Route path="/:id" />
                  </Router>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Access Denied</p>
        )}
      </>
    );
  }
}
export default PatientListPage;
