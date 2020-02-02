import React from "react";
import "../styles/mainstyles.css";
import "../styles/homeStyles.css";
class HomePage extends React.Component {
  render() {
    return (
      <div className= "homepage">
          <div className="background"/>
          <div className="MedicalPhoto"/>
          <div className="TextBackground"/>
          <div className="Introduction">
          <h1>What is Bluebook? </h1>
          <h3>
            BlueBook is a digital patient management system which aims to reduce 
            the time taken by sleep clinic staff to track and monitor patient 
            status as they progress through the diagnosis process. Typically, 
            patient tracking at sleep clinics is completed manually, by editing 
            spreadsheets, and renaming and moving files. BlueBook’s simplified 
            tracking process is designed to reduce human errors and increase clinic 
            efficiency.
            <br/>
            <br/>
            BlueBook is designed by 4th year engineering students at the 
            University of Waterloo.
          </h3>
          </div>
          </div>
    )
  }
}

export default HomePage;
