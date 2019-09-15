import React from "react";
import { countEventParticipants } from "../../../scripts/candidateLock";

const EventParticipantsCounter = props => {
  const { MaxParticipants, candidates, children: message } = props;

  const participantsCount = countEventParticipants(candidates);

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

export default EventParticipantsCounter;
