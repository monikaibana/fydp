import React from "react";
import "../styles/mainstyles.css";
import { Icon, Menu, Button } from "antd";
import CreatePatientModal from "../containers/CreatePatientModal";
import { Redirect } from "react-router-dom"

class Sidebar extends React.Component {
  state = {
    isModalVisible: false
  };
  state = {
    redirect: false
  }
  state = {
    redirectHome: false
  }
  callbackFunction = () => {
    this.setState({ isModalVisible: false });
  };
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  setRedirectHome = () => {
    this.setState({
      redirectHome: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({
      redirect: false
      })
      return <Redirect to="/list"/>
    }
    if (this.state.redirectHome) {
      this.setState({
      redirectHome: false
      })
      return <Redirect to="/list"/>
    }
  }

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
          <Button onClick={this.setRedirectHome}>
            BlueBook
          </Button>
        </div>
        <Menu defaultSelectedKeys={[key]} mode="vertical" onClick={this.setRedirect}>
          <Menu.Item key="1" align="left">
            <Icon type="contacts" />
            Patient Listing
          </Menu.Item>
          <Menu.Item key="2" align="left">
            <Icon type="monitor" />
            Metrics
          </Menu.Item>
        </Menu>
        <div className="CreatePatientButton">
          <Button
            type="primary"
            icon="plus"
            onClick={() => this.setState({ isModalVisible: true })}
          >
            Add patient
          </Button>
        </div>
        <div className="LogoutButton">
          <Button type="primary" icon="poweroff" ghost href="/">
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
