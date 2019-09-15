import React from "react";
import TableRow from "./TableRow/TableRow";

function CandidatesTable({
  candidates,
  additionFilters,
  changeDecision,
  currentView
}) {
  const accFilter = arr => {
    return additionFilters.reduce(
      (acc, cur) => acc.filter(cur.filterFunction),
      arr
    );
  };

  return (
    <table className="table table-hover ">
      <thead className="thead-light">
        <tr>
          <th>Name</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Role</th>
          <th>Company</th>
          {currentView !== "Workshop" && <th>Workshop</th>}
          <th>Is_Lecture</th>
          <th>Motivation</th>
          <th>Decision</th>
          <th>Change Decision</th>
        </tr>
      </thead>
      <tbody>
        {accFilter(candidates).map(candidate => (
          <TableRow
            changeDecision={changeDecision}
            candidate={candidate}
            currentView={currentView}
            key={candidate.email}
          />
        ))}
      </tbody>
    </table>
  );
}

export default CandidatesTable;
