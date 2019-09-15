import React from "react";
import { getCandidatesFromWorkshop } from "../../../routes/candidates";
import { Workshops } from "../../../global/config";
const workshops = Object.values(Workshops);

class SelectWorkshop extends React.PureComponent {
  state = { value: 0 };
  componentDidUpdate(prevProps) {
    if (
      this.props.currentView !== "Workshop" &&
      prevProps.currentView === "Workshop"
    ) {
      this.setState(() => {
        return { value: 0 };
      });
    }
  }

  handleChange(event) {
    const value = event.target.value;

    this.setState(() => {
      return { value };
    });

    this.changeWorkshop(value);
  }

  changeWorkshop = async value => {
    this.props.setCandidates(
      await getCandidatesFromWorkshop(value),
      "Workshop",
      workshops[value - 1]
    );
  };

  render() {
    return (
      <div>
        <select
          style={{ width: "100%" }}
          className="custom-select"
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        >
          <option value={0} disabled defaultValue>
            Select concrete workshop
          </option>
          {workshops.map(workshop => (
            <option key={workshop.number} value={workshop.number}>
              {workshop.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default SelectWorkshop;
