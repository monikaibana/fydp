import React from "react";
import "../styles/mainstyles.css";
import logo from "../placeholder.svg";
import { Button } from "antd";

class AccessDenied extends React.Component {

  render() {
    
    return (
      <div>
        <div className="Mountains"/>
        <div className="ContainerBackground">
          <div className="Logo">
            <img src={logo} alt="logo" style={{ height: 130 }}></img>
          </div>
          <div className="LogoText">
            <h2>BlueBook</h2>
          </div>
          <div className="DeniedButtons">
            <div className="DeniedContactUs">
              <Button type="secondary" size="large" href="mailto:info.mybluebook@gmail.com?subject=Mail from Our Site" style={{ width: 150}}>
                Contact Us
              </Button>
            </div>
            <div className="DeniedLogin">
              <Button type="primary" size="large" href="login" style={{ width: 150}}>
                Login
              </Button>
            </div>
          </div>
          <div className="DeniedText">
            <h1>
              403 - Access denied/forbidden
            </h1>
            <h5>
              Contact us to get started or login to view this page.
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default AccessDenied;
