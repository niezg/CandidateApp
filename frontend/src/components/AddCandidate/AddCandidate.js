import React from "react";
import { addCandidate } from "../../routes/candidates";
import "../../styles/AddCandidate.css";
import Alert from "../Alert/Alert";
import {
  validateData,
  displayDangerAlert,
  displaySuccessAlert
} from "./../../scripts/dataValidation";

class AddCandidate extends React.PureComponent {
  state = {
    candidate: { isLecture: false },
    alert: {
      isDisplay: false
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const data = await addCandidate(this.state.candidate);

    if (validateData(data)) displaySuccessAlert(data, this.setAlert);
    else displayDangerAlert(data, this.setAlert);
  };

  setAlert = alert => {
    this.setState({
      alert
    });
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      candidate: Object.assign(prevState.candidate, { [name]: value })
    }));
  };

  handleInputCheckboxChange = e => {
    const { checked } = e.target;

    this.setState(prevState => {
      const candidate = { ...prevState.candidate };
      candidate.isLecture = checked;
      return {
        candidate
      };
    });
  };

  render() {
    const { alert, candidate } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Name:
              <input
                className="form-control"
                onChange={this.handleInputChange}
                type="text"
                name="name"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              LastName:
              <input
                className="form-control"
                onChange={this.handleInputChange}
                type="text"
                name="lastName"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email:
              <input
                className="form-control"
                onChange={this.handleInputChange}
                type="email"
                name="email"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Role:
              <input
                className="form-control"
                onChange={this.handleInputChange}
                type="text"
                name="role"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Company:
              <input
                className="form-control"
                onChange={this.handleInputChange}
                type="text"
                name="company"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Workshop:
              <select
                className="form-control"
                onChange={this.handleInputChange}
                name="workshop"
              >
                <option value={0}>No</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="checkboxLecture" className="form-check-label">
              Is Lecture:
            </label>
            <input
              className="form-check-input"
              onChange={this.handleInputCheckboxChange}
              checked={candidate.isLecture}
              type="checkbox"
              name="isLecture"
              id="checkboxLecture"
            />
          </div>
          <div className="form-group">
            <label>
              Motivation:
              <textarea
                className="form-control"
                onChange={this.handleInputChange}
                name="motivation"
              />
            </label>
          </div>
          {alert.isDisplay && (
            <Alert type={alert.type} message={alert.message} />
          )}
          <button type="submit" className="btn btn-primary">
            Add Candidate
          </button>
        </form>
      </div>
    );
  }
}

export default AddCandidate;
