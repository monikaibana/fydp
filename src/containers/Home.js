import React from "react";
import "../styles/homeStyles.css";
import logo from "../placeholder.svg";
import { Button } from "antd";
import {
  LikeOutlined,
  CheckCircleOutlined,
  SearchOutlined
} from "@ant-design/icons";

class HomePage extends React.Component {
  render() {
    return (
      <div className="Homepage">
        <div className="Background" />
        <div className="MountainsPhoto3" />
        <div className="HideMountains2" />
        <div className="MountainsPhoto2" />
        <div className="HideMountains1" />
        <div className="MountainsPhoto1" />
        <div className="WhatContainer">
          <div className="WhatText">
            <h1>What is BlueBook?</h1>
            <h5>
              BlueBook is a digital patient tracking system which aims to reduce
              the time taken by sleep clinic staff to track and monitor patient
              status as they progress through the diagnostic process. Typically,
              patient tracking at sleep clinics is completed manually, by
              editing spreadsheets, and renaming and moving files. BlueBook’s
              simplified tracking process is designed to reduce human errors and
              increase clinic efficiency.
            </h5>
          </div>
          <div className="WhatLogo">
            <img src={logo} alt="logo" style={{ height: 220 }}></img>
          </div>
        </div>
        <div className="AboutUsContainer">
          <div className="AboutUsImage" />
          <div className="AboutUsText">
            <h1>About Us</h1>
            <h5>
              BlueBook was designed and built by Monika, Andy, Amelia, and Alex.
              We are 4th year Systems Design engineering students at the
              University of Waterloo.
            </h5>
          </div>
          <div className="ContactUs">
            <Button
              type="secondary"
              size="large"
              href="mailto:info.mybluebook@gmail.com?subject=Mail from Our Site"
              style={{ width: 150 }}
            >
              Contact Us
            </Button>
          </div>
        </div>
        <div className="SloganContainerBackground" />
        <div className="SloganContainerContent">
          <div className="SloganLogoText">
            <h2>BlueBook</h2>
          </div>
          <div className="SloganLogoImage">
            <img src={logo} alt="logo" style={{ height: 220 }}></img>
          </div>
          <div className="Slogan">
            <h1>
              The sleep clinic patient tracking tool that can help you and your
              patients sleep easier.
            </h1>
          </div>
        </div>
        <div className="ValuePropsContainer">
          <div className="ValueProp1">
            <div className="Icon1">
              <LikeOutlined style={{ color: "#1890ff" }} />
            </div>
            <h2>More Efficient</h2>
            <h5>than tracking patients with traditional tracking methods</h5>
          </div>
          <div className="ValueProp2">
            <div className="Icon2">
              <CheckCircleOutlined style={{ color: "#1890ff" }} />
            </div>
            <h2>Designed</h2>
            <h5>
              specifically for sleep clinics in Ontario with CPSO and OHIP
              guidleines in mind
            </h5>
          </div>
          <div className="ValueProp3">
            <div className="Icon3">
              <SearchOutlined style={{ color: "#1890ff" }} />
            </div>
            <h2>Analytics</h2>
            <h5>to track and improve clinic performance</h5>
          </div>
        </div>
        <div className="NavBar">
          <div className="NavBarContact">
            <Button
              type="secondary"
              size="large"
              href="mailto:info.mybluebook@gmail.com?subject=Mail from Our Site"
              style={{ width: 150 }}
            >
              Contact Us
            </Button>
          </div>
          <div className="NavBarLogin">
            <Button
              type="primary"
              size="large"
              href="login"
              style={{ width: 150 }}
            >
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
