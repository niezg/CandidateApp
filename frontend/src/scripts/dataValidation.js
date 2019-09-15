import { Alerts } from "../global/alertType";

export const validateData = data => {
  console.log("data :", data);
  if (data.fetchError === true || !data.response.ok) return false;
  else return true;
};

export const displayDangerAlert = (data, setAlert) => {
  const alert = { isDisplay: true, type: Alerts.DANGER, message: "" };

  if (data.fetchError === true) {
    alert.message = "The connection to the server is failed.";
  } else {
    if (!data.response.ok) {
      alert.message = "The connection to the SQL database is failed.";
    }

    if (data.result.errorEmailExist) {
      alert.message = "Member with this email already exist.";
    }
  }

  setAlert(alert);
};

export const displaySuccessAlert = (data, setAlert) => {
  const alert = {
    isDisplay: true,
    type: Alerts.SUCCESS,
    message: data.result.message
  };
  setAlert(alert);
};

export const disableAlert = setAlert => {
  const alert = {
    isDisplay: false
  };
  setAlert(alert);
};
