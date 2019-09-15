import React from "react";
import {
  validateData,
  displayDangerAlert,
  disableAlert
} from "../../scripts/dataValidation";
import CandidatesTable from "./CandidatesTable/CandidatesTable";
import { FilterButtons } from "./FilterButtons/FilterButtons";
import EventParticipantsCounter from "./ParticipantsCounter/EventParticipantsCounter";
import WorkshopParticipantsCounter from "./ParticipantsCounter/WorkshopParticipantsCounter";
import SelectWorkshop from "./SelectWorkshop/SelectWorkshop";
import Alert from "../Alert/Alert";
import Search from "./Search/Search";
import { MaxEventParticipants } from "../../global/config";

class ShowCandidates extends React.PureComponent {
  state = {
    displayCandidates: [],
    additionFilters: [],
    currentView: "All",
    isCandidatesCanBeLock: false
  };

  async componentDidMount() {
    this.displayAllCandidates();
    await this.props.fetchAllCandidates();
    this.displayAllCandidates();
  }

  displayAllCandidates() {
    this.setState({ displayCandidates: this.props.allCandidates });
  }

  changeDecision = (email, newDecision) => {
    const displayCandidates = this.changeDecisionByEmail(
      email,
      newDecision,
      this.state.displayCandidates
    );
    const allCandidates = this.changeDecisionByEmail(
      email,
      newDecision,
      this.props.allCandidates
    );

    this.setState({ displayCandidates });
    this.props.setAllCandidates(allCandidates);
  };

  changeDecisionByEmail = (email, newDecision, candidates) => {
    return candidates.map(candidate => {
      if (candidate.email === email) {
        const newCandidate = { ...candidate };
        newCandidate.decision = newDecision;
        return newCandidate;
      }
      return candidate;
    });
  };

  setCandidates = (data, currentView, workshop) => {
    const { setAlert, setAllCandidates } = this.props;
    if (validateData(data)) {
      disableAlert(setAlert);
      if (currentView === "All") {
        this.setState({
          displayCandidates: data.result,
          currentView: currentView
        });
        setAllCandidates(data.result);
      } else
        this.setState({
          displayCandidates: data.result,
          currentView: currentView,
          currentWorkshop: workshop
        });
    } else displayDangerAlert(data, setAlert);
  };

  addFilter = (additionFilter, name) => {
    this.setState(prevState => {
      return {
        additionFilters: [
          ...prevState.additionFilters,
          { filterFunction: additionFilter, name }
        ]
      };
    });
  };

  removeFilter = filterName => {
    this.setState(prevState => {
      return {
        additionFilters: prevState.additionFilters.filter(
          filter => filter.name !== filterName
        )
      };
    });
  };

  render() {
    const {
      displayCandidates,
      additionFilters,
      currentWorkshop,
      currentView
    } = this.state;

    const { alert, allCandidates } = this.props;

    return (
      <>
        <div style={{ margin: "10px 20px 10px 30px" }}>
          <div>
            <FilterButtons setCandidates={this.setCandidates} />
          </div>
          <Search addFilter={this.addFilter} removeFilter={this.removeFilter} />
          <div className="d-inline">
            <SelectWorkshop
              setCandidates={this.setCandidates}
              currentView={currentView}
            />
          </div>
        </div>
        <div>
          <EventParticipantsCounter
            candidates={allCandidates}
            MaxParticipants={MaxEventParticipants}
          >
            Event Participants:
          </EventParticipantsCounter>

          {currentView === "Workshop" && (
            <WorkshopParticipantsCounter
              candidates={displayCandidates}
              MaxParticipants={currentWorkshop.maxParticipants}
            >
              {currentWorkshop.name} Participants:
            </WorkshopParticipantsCounter>
          )}
        </div>

        <div>
          {alert.isDisplay && (
            <Alert type={alert.type} message={alert.message} />
          )}
          <CandidatesTable
            additionFilters={additionFilters}
            candidates={displayCandidates}
            changeDecision={this.changeDecision}
            currentView={currentView}
          />
        </div>
      </>
    );
  }
}

export default ShowCandidates;
