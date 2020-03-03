import React from "react";
import "../styles/homeStyles.css";
import logo from "../placeholder.svg";
import { Button } from "antd";

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
