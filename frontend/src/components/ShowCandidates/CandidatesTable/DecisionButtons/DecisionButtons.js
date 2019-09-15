import React from "react";
import { isDecisionPossible } from "../../../../scripts/decisionValidation";
import { Decisions } from "../../../../global/decisionType";
import { updateDecisionCandidate } from "../../../../routes/candidates";
import {
  validateData,
  displayDangerAlert
} from "../../../../scripts/dataValidation";

const DecisionButtons = props => {
  const { candidate } = props;

  const handleClick = async (decision, email) => {
    const data = await updateDecisionCandidate(email, decision);

    if (validateData(data)) {
      props.changeDecision(email, decision);
    } else displayDangerAlert(data, props.setAlert);
  };

  return (
    <div>
      <div>
        {isDecisionPossible(candidate, Decisions.ACC_LEC) && (
          <button
            style={{ margin: "4px 1px" }}
            className="btn btn-outline-success btn-block"
            onClick={() => handleClick(Decisions.ACC_LEC, candidate.email)}
          >
            ACC_LEC
          </button>
        )}
      </div>
      <div>
        {isDecisionPossible(candidate, Decisions.ACC_WOR) && (
          <button
            style={{ margin: "4px 1px" }}
            className="btn btn-outline-success btn-block"
            onClick={() => handleClick(Decisions.ACC_WOR, candidate.email)}
          >
            ACC_WOR
          </button>
        )}
      </div>
      <div>
        {isDecisionPossible(candidate, Decisions.MV_LEC) && (
          <button
            style={{ margin: "4px 1px" }}
            className="btn btn-outline-warning btn-block"
            onClick={() => handleClick(Decisions.MV_LEC, candidate.email)}
          >
            MV_LEC
          </button>
        )}
      </div>
      <div>
        {isDecisionPossible(candidate, Decisions.REJ) && (
          <button
            style={{ margin: "4px 1px" }}
            className="btn btn-outline-danger btn-block"
            onClick={() => handleClick(Decisions.REJ, candidate.email)}
          >
            REJECTED
          </button>
        )}
      </div>
    </div>
  );
};

export default DecisionButtons;
