import React from "react";
import "../styles/mainstyles.css";
import { ContactsOutlined, MonitorOutlined, PlusOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Menu, Button } from "antd";
import CreatePatientModal from "../containers/CreatePatientModal";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

class Sidebar extends React.Component {
  state = {
    isModalVisible: false
  };
  state = {
    redirect: false
  };
  state = {
    redirectHome: false
  };
  state = {
    redirectMetrics: false
  };
  callbackFunction = () => {
    this.setState({ isModalVisible: false });
  };
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  setRedirectHome = () => {
    this.setState({
      redirectHome: true
    });
  };
  setRedirectMetrics = () => {
    this.setState({
      redirectMetrics: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({
        redirect: false
      });
      return <Redirect to="/list" />;
    }
    if (this.state.redirectMetrics) {
      this.setState({
        redirectMetrics: false
      });
      return <Redirect to="/metrics" />;
    }
    if (this.state.redirectHome) {
      this.setState({
        redirectHome: false
      });
      return <Redirect to="/list" />;
    }
  };

  signOut = async () => {
    await Auth.signOut()
      .then(data => {
        console.log(data);
        window.location.href = "/";
      })
      .catch(err => console.log(err));
  };

  render() {
    const page_name = this.props.value;
    if (page_name === "Metrics") {
      var key = "2";
    } else {
      key = "1";
    }
    return (
      <div className="Sidebar">
        {this.renderRedirect()}
        <br />
        <div className="SidebarHeaderButton">
          <Button onClick={this.setRedirectHome}>BlueBook</Button>
        </div>
        <Menu
          defaultSelectedKeys={[key]}
          mode="vertical"
        >
          <Menu.Item key="1" align="left" onClick={this.setRedirect}>
            <ContactsOutlined />
            Patient Listing
          </Menu.Item>
          <Menu.Item key="2" align="left" onClick={this.setRedirectMetrics}>
            <MonitorOutlined />
            Metrics
          </Menu.Item>
        </Menu>
        <div className="CreatePatientButton">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => this.setState({ isModalVisible: true })}
          >
            Add patient
          </Button>
        </div>
        <div className="LogoutButton">
          <Button type="primary" icon={<PoweroffOutlined />} onClick={this.signOut} ghost>
            Logout
          </Button>
        </div>
        {this.state.isModalVisible ? (
          <CreatePatientModal parentCallback={this.callbackFunction} />
        ) : null}
      </div>
    );
  }
}
export default Sidebar;
