import React from "react";
import "../styles/homeStyles.css";
import logo from "../placeholder.svg";
import { Button, Icon } from "antd";
//import { LikeOutlined, CheckCircleOutlined, SearchOutlined } from "@ant-design/icons";

class HomePage extends React.Component {
  render() {
    return (
      <div className="Homepage">
        <div className="Background" />
        <div className="MountainsPhoto" />
        <div className="SloganContainerBackground"/>
        <div className="SloganContainerContent">
          <div className="SloganLogoText">
            <h2>BlueBook</h2>
          </div>
          <div className="SloganLogoImage">
            <img src={logo} alt="logo" style={{ height: 220 }}></img>
          </div>
          <div className="Slogan">
            <h1>
              The sleep clinic patient management tool that can help you and your patients sleep easier.
            </h1>
          </div>
        </div>
        <div className="ValuePropsContainer">
          <div className="ValueProp1">
            <div className="Icon1">
              <Icon type="like" style={{ color: "#1890ff" }} />
            </div>
            <h2>
              More Efficient
            </h2>
            <h5>
              than tracking patients with traditional tracking methods
            </h5>
          </div>
          <div className="ValueProp2">
            <div className="Icon2">
              <Icon type="check-circle" style={{ color: "#1890ff"}} />
            </div>
            <h2>
              Designed
            </h2>
            <h5>
              specifically for sleep clinics in Ontario with CPSO and OHIP guidleines in mind
            </h5>
          </div>
          <div className="ValueProp3">
            <div className="Icon3">
              <Icon type="search" style={{ color: "#1890ff"}} />
            </div>
            <h2>
              Analytics
            </h2>
            <h5>
              to track and improve clinic performance
            </h5>
          </div>
        </div>
        <div className="NavBar">
          <div className="NavBarContact">
            <Button type="secondary" size="large" href="contact-us" style={{ width: 150}}>
              Contact Us
            </Button>
          </div>
          <div className="NavBarLogin">
            <Button type="primary" size="large" href="login" style={{ width: 150}}>
              Login
            </Button>
          </div>
          <div className="NavBarLogo">
            <h2>BlueBook</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
