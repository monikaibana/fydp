import React from "react";
import "../styles/mainstyles.css";
import { Icon, Menu, Button } from "antd";

export default function Sidebar(props) {
  const page_name = props.value;
  if (page_name === "Metrics") {
    var key = 2;
  } else {
    key = 1;
  }
  return (
    <div className="Sidebar">
      <br />
      <h1>BlueBook</h1>
      <Menu defaultSelectedKeys={[key]} mode="vertical">
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
        <Button type="primary" icon="plus">
          Add patient
        </Button>
      </div>
      <div className="LogoutButton">
        <Button type="primary" icon="poweroff" ghost>
          Logout
        </Button>
      </div>
    </div>
  );
}