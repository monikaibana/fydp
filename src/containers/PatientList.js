import React from "react";
import "../styles/mainstyles.css";
import "../styles/PatientListStyles.css";
import "antd/dist/antd.css";
import Sidebar from "../components/Sidebar.js";
import { getPatientList } from "../routes/api-routes";
import { SearchOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Select, Table, Input, Button } from "antd";
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
          icon={<SearchOutlined />}
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
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
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

  getTimeInStatus = lastUpdated => {
    const today = new Date();
    const updateDate = new Date(lastUpdated);
    var one_day = 1000 * 60 * 60 * 24;
    var timeInStatus = (today.getTime() - updateDate.getTime()) / one_day;
    if (isNaN(timeInStatus)) {
      return null;
    } else {
      var days = Math.floor(timeInStatus);
      if (days === 0) {
        return days;
      } else {
        return days - 1;
      }
    }
  };

  render() {
    var StudyType = [];
    var triageTag = [];
    var patientStatus = [];
    const studyTypeString = [
      "IDS",
      "RDS-R",
      "RDS-X",
      "CPAP Study",
      "BiPAP Study",
      "Repeat Therapeutic Study",
      "Study to Assess Other Therapy"
    ];
    const triageTagString = ["Urgent", "ASAP", "HP CL", "HP", "Routine"];
    const statusString = [
      "Referral Received",
      "Triaged",
      "Consultation Booked",
      "Consultation Complete",
      "Study Booked",
      "Study Data Collected",
      "Study Scored",
      "Results Interpreted",
      "Study Follow-up booked",
      "Study Follow-up Complete",
      "Treatment Follow-up Booked",
      "Treatment Follow-up Complete",
      "Archived"
    ];
    for (var i = 0; i < this.state.db_data.Count; i++) {
      if (this.state.db_data["Items"][i].studyType) {
        StudyType[i] =
          studyTypeString[this.state.db_data["Items"][i].studyType - 1];
      } else {
        StudyType[i] = "Undetermined";
      }
      if (this.state.db_data["Items"][i].priority) {
        triageTag[i] =
          triageTagString[this.state.db_data["Items"][i].priority - 1];
      } else {
        triageTag[i] = "";
      }
      if (this.state.db_data["Items"][i].status) {
        patientStatus[i] =
          statusString[this.state.db_data["Items"][i].status - 1];
      } else {
        patientStatus[i] = "Undetermined";
      }
    }

    var dataSource = [];
    for (var j = 0; j < this.state.db_data.Count; j++) {
      var lastUpdated = "";
      var item = this.state.db_data["Items"][j];
      for (var k = 13; k > 0; k--) {
        var timeVar = "time_" + k.toString();
        if (item[timeVar]) {
          lastUpdated = item[timeVar];
          break;
        }
      }

      dataSource[j] = {
        name:
          this.state.db_data["Items"][j].surname +
          ", " +
          this.state.db_data["Items"][j].givenName,
        id: this.state.db_data["Items"][j].id,
        TIS: this.getTimeInStatus(lastUpdated),
        studyType: StudyType[j],
        triageTag: triageTag[j],
        notes: this.state.db_data["Items"][j].notes,
        key: this.state.db_data["Items"][j].id,
        status: patientStatus[j]
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
        sorter: (a, b) => a.TIS - b.TIS,
        defaultSortOrder: "descend"
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
        sorter: (a, b) => a.triageTag.localeCompare(b.triageTag)
      },
      {
        title: "Notes",
        dataIndex: "notes",
        key: "notes",
        ellipsis: true,
        width: 200
      }
    ];

    const allColumns = columns.concat({
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status)
    });

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
                <div className="Table">
                  <Router>
                    <Table
                      columns={this.state.filter === 0 ? allColumns : columns}
                      dataSource={dataSource}
                      pagination={{
                        position: "bottom",
                        alignment: "center",
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "25", "50", "100"]
                      }}
                      scroll={{ y: 550 }}
                      size={"small"}
                      rowClassName={(record, index) => "row-class"}
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: event => {
                            setId(record.id);
                          }
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
          <div>
            <div className="loadingScreen">
              <br /> <br />
              Loading...
            </div>
            <p className="accessDenied">Access Denied</p>
          </div>
        )}
      </>
    );
  }
}
export default PatientListPage;
