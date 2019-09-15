import "../styles/App.css";
import React from "react";
import ShowCandidates from "./ShowCandidates/ShowCandidates";
import Home from "./Home/Home";
import AddCandidateForm from "./AddCandidate/AddCandidate";
import Reports from "./Reports/Reports";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { getAllCandidates } from "../routes/candidates";
import {
  validateData,
  displayDangerAlert,
  disableAlert
} from "../scripts/dataValidation";

class App extends React.Component {
  state = {
    allCandidates: [],
    alert: {
      isDisplay: false
    }
  };

  componentDidMount() {
    this.fetchAllCandidates();
  }

  fetchAllCandidates = async () => {
    const candidatesData = await getAllCandidates();

    if (validateData(candidatesData)) {
      disableAlert(this.setAlert);
      this.setAllCandidates(candidatesData.result);
    } else displayDangerAlert(candidatesData, this.setAlert);
  };

  setAllCandidates = allCandidates => {
    this.setState({ allCandidates });
  };

  setAlert = alert => {
    this.setState({
      alert
    });
  };

  render() {
    const { allCandidates, alert } = this.state;
    return (
      <Router>
        <>
          <nav className="navbar navbar-expand-lg bg-light navbar-light">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/show-candidates">
                  Show Candidates
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-candidate">
                  Add Candidate
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reports">
                  Reports
                </Link>
              </li>
            </ul>
          </nav>

          <section>
            <Switch>
              <Route
                path="/show-candidates"
                render={props => (
                  <ShowCandidates
                    {...props}
                    allCandidates={allCandidates}
                    setAllCandidates={this.setAllCandidates}
                    setAlert={this.setAlert}
                    alert={{ ...alert }}
                    fetchAllCandidates={this.fetchAllCandidates}
                  />
                )}
              />
              <Route path="/add-candidate" component={AddCandidateForm} />
              <Route
                path="/reports"
                render={props => (
                  <Reports
                    {...props}
                    allCandidates={allCandidates}
                    alert={{ ...alert }}
                  />
                )}
              />
              <Route path="/" component={Home} />
            </Switch>
          </section>
        </>
      </Router>
    );
  }
}

export default App;
