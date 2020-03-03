import React from "react";
import "../styles/homeStyles.css";
import logo from "../placeholder.svg";
import { Button } from "antd";

class HomePage extends React.Component {
  render() {
    return (
      <div className="Homepage">
        <div className="Background" />
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
            <Button>BlueBook</Button>
          </div>
        </div>
        <div className="MedicalPhoto" />
        <img src={logo} alt="logo" style={{ height: 300 }}></img>
        <div className="Introduction">
          <h1>What is Bluebook? </h1>
          <h3>
            BlueBook is a digital patient management system which aims to reduce
            the time taken by sleep clinic staff to track and monitor patient
            status as they progress through the diagnosis process. Typically,
            patient tracking at sleep clinics is completed manually, by editing
            spreadsheets, and renaming and moving files. BlueBook’s simplified
            tracking process is designed to reduce human errors and increase
            clinic efficiency.
            <br />
            <br />
            BlueBook is designed by 4th year engineering students at the
            University of Waterloo.
            <br />
            <br />
          </h3>

        </div>
      </div>
    );
  }
}

export default HomePage;
