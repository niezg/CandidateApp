import React from "react";

import {
  getAllCandidates,
  getCandidatesFromWorkshop,
  getCandidatesForLecture
} from "../../../routes/candidates";

export function FilterButtons(props) {
  return (
    <div>
      <span style={{ fontWeight: 700, fontSize: "130%", marginRight: "10px" }}>
        Get Candidates:
      </span>
      <button
        className="btn btn-primary"
        onClick={async () =>
          props.setCandidates(await getAllCandidates(), "All")
        }
      >
        All
      </button>

      <button
        style={{ margin: "10px" }}
        className="btn btn-primary"
        onClick={async () => {
          props.setCandidates(
            await getCandidatesFromWorkshop("all"),
            "AllWorkshops"
          );
        }}
      >
        Workshops
      </button>

      <button
        className="btn btn-primary"
        onClick={async () => {
          props.setCandidates(await getCandidatesForLecture(), "ForLecture");
        }}
      >
        By Lecture
      </button>
    </div>
  );
}
