import React from "react";
import { countWorkshopParticipants } from "../../../scripts/candidateLock";

const WorkshopParticipantsCounter = props => {
  const { MaxParticipants, candidates, children: message } = props;

  const participantsCount = countWorkshopParticipants(candidates);
  console.log("participantsCount :", participantsCount);
  const counterColour = MaxParticipants <= participantsCount ? "red" : "black";

  return (
    <span
      style={{
        fontWeight: 700,
        fontSize: "130%",
        marginLeft: "30px",
        marginBottom: "20px",
        color: counterColour
      }}
    >
      {message} {participantsCount} / {MaxParticipants}
    </span>
  );
};

export default WorkshopParticipantsCounter;
