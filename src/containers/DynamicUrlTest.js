import React from "react";
import "../styles/mainstyles.css";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

class App extends React.Component {
  render() {
    return (
      <Router>
        <h2>Accounts</h2>
        <ul>
          <li><Link to="/netflix">Netflix</Link></li>
          <li><Link to="/zillow-group">Zillow Group</Link></li>
          <li><Link to="/yahoo">Yahoo</Link></li>
          <li><Link to="/modus-create">Modus Create</Link></li>
        </ul>
        <Route path="/:id" component={Child}/>
      </Router>
    )
  }
}

export default App