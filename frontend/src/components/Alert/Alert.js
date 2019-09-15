import React from "react";
import { Alerts } from "../../global/alertType";

const Alert = ({ type, message }) => {
  switch (type) {
    case Alerts.SUCCESS:
      return (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      );
    case Alerts.WARNING:
      return (
        <div className="alert alert-warning" role="alert">
          {message}
        </div>
      );
    case Alerts.DANGER:
      return (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      );
    case Alerts.INFO:
      return (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      );
    default:
      console.log("wrong alert statement");
  }
};

export default Alert;
