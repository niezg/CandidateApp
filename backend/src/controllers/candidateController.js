const { queryHandler } = require("../candidateRepository");
const { isDecisionPossible } = require("../decisionValidation");
const { ErrorMessages } = require("../config");

const queryFields =
  "name, lastname, email, role, company, workshop, is_lecture, motivation, decision";

async function getAllCandidates() {
  try {
    const data = await queryHandler(`SELECT ${queryFields} FROM candidates`);
    return {
      data: data,
      httpStatus: 200
    };
  } catch (err) {
    console.log(err);
    return {
      message: ErrorMessages.SQL_WRONG_CONNECTION,
      httpStatus: 404
    };
  }
}

async function getCandidate(email) {
  try {
    const data = await queryHandler(
      `SELECT ${queryFields} FROM candidates WHERE email = $1`,
      [email]
    );
    if (data.length === 0)
      return {
        data: data,
        message: "Candidate with this email does not exist",
        httpStatus: 404
      };
    return {
      data: data,
      httpStatus: 200
    };
  } catch (err) {
    console.log(err);
    return {
      data: null,
      message: ErrorMessages.SQL_WRONG_CONNECTION,
      httpStatus: 400
    };
  }
}

async function getCandidatesForLecture() {
  try {
    const data = await queryHandler(
      `SELECT ${queryFields} FROM candidates WHERE is_lecture = '1'`
    );
    return {
      data: data,
      httpStatus: 200
    };
  } catch (err) {
    console.log(err);
    return {
      message: ErrorMessages.SQL_WRONG_CONNECTION,
      httpStatus: 400
    };
  }
}

async function getCandidatesFromWorkshop(workshop) {
  try {
    const { whereClause, parameters } = getQueryParameters(workshop);

    const data = await queryHandler(
      `SELECT ${queryFields} FROM candidates WHERE ${whereClause}`,
      parameters
    );

    return {
      data: data,
      httpStatus: 200
    };
  } catch (err) {
    console.log(err);
    return {
      message: ErrorMessages.SQL_WRONG_CONNECTION,
      httpStatus: 400
    };
  }
}

function getQueryParameters(workshop) {
  if (workshop === "all")
    return { whereClause: "workshop != $1", parameters: ["0"] };
  else return { whereClause: "workshop = $1", parameters: [workshop] };
}

async function updateDecisionCandidate(decision, email) {
  const data = await getCandidate(email);
  if (data.data[0] === null) return data;
  const { is_lecture, workshop } = data.data[0];

  try {
    if (isDecisionPossible(workshop, is_lecture, decision)) {
      const data = await queryHandler(
        "UPDATE candidates SET decision = $1 WHERE email = $2",
        [decision, email]
      );
      return {
        data,
        message: "Candidate updated",
        httpStatus: 201
      };
    }
    return {
      message:
        "Decision is not possible. You are not meeting preconditions of this operation.",
      httpStatus: 412
    };
  } catch (err) {
    console.log(err);
    return {
      message: ErrorMessages.SQL_WRONG_CONNECTION,
      httpStatus: 400
    };
  }
}

async function createNewCandidate(candidate) {
  console.log("crNC");
  const {
    name,
    lastName,
    email,
    role,
    company,
    workshop,
    isLecture,
    motivation
  } = candidate;

  const data = await getCandidate(email);
  if (data.httpStatus === 200)
    return {
      message: `candidate with email ${email} already exist`,
      httpStatus: 400,
      errorEmailExist: true
    };
  if (data.httpStatus !== 404) return data;

  try {
    console.log("candidate :", candidate);
    await queryHandler(
      "INSERT INTO candidates(name, lastname, email, role, company, workshop, is_lecture, motivation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
      [name, lastName, email, role, company, workshop, isLecture, motivation]
    );
    return {
      message: "The candidate has been successfully added.",
      httpStatus: 201
    };
  } catch (err) {
    console.log(err);
    return {
      message: ErrorMessages.SQL_WRONG_CONNECTION,
      httpStatus: 400,
      errorEmailExist: false
    };
  }
}

exports.updateDecisionCandidate = updateDecisionCandidate;
exports.getCandidatesFromWorkshop = getCandidatesFromWorkshop;
exports.getCandidatesForLecture = getCandidatesForLecture;
exports.getAllCandidates = getAllCandidates;
exports.createNewCandidate = createNewCandidate;
