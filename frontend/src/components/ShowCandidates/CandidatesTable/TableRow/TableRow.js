import React from "react";
import DecisionButtons from "../DecisionButtons/DecisionButtons";
import Alert from "../../../Alert/Alert";

class TableRow extends React.PureComponent {
  state = { alert: { isDisplay: false } };

  setAlert = alert => {
    this.setState({
      alert: alert
    });
  };

  render() {
    const { candidate, changeDecision, currentView } = this.props;
    return (
      <tr>
        <td>{candidate.name}</td>
        <td>{candidate.lastname}</td>
        <td>{candidate.email}</td>
        <td>{candidate.role}</td>
        <td>{candidate.company}</td>
        {currentView !== "Workshop" && <td>{String(candidate.workshop)}</td>}
        <td>{candidate.is_lecture ? "Yes" : "No"}</td>
        <td>{candidate.motivation}</td>
        <td>{candidate.decision || "None"}</td>
        <td>
          <DecisionButtons
            candidate={candidate}
            setAlert={this.setAlert}
            changeDecision={changeDecision}
          />
          {this.state.alert.isDisplay && (
            <Alert
              type={this.state.alert.type}
              message={this.state.alert.message}
            />
          )}
        </td>
      </tr>
    );
  }
}

export default TableRow;
