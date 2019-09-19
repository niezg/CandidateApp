const { queryHandler } = require("../candidateRepository");
const { ErrorMessages, Workshops, Decisions } = require("../config");
const reportFields = "name, lastname, email";

async function getWorkshopsReports() {
  const workshops = Object.values(Workshops);
  try {
    const workshopAccReports = await Promise.all(
      workshops.map(async workshop => {
        const report = await queryHandler(
          `SELECT ${reportFields} FROM candidates WHERE workshop = $1 AND decision = $2;`,
          [workshop.number, Decisions.ACC_WOR]
        );

        return { workshop, report };
      })
    );

    return {
      data: {
        workshopAccReports
      },
      httpStatus: 200
    };
  } catch (err) {
    return {
      data: data,
      message: ErrorMessages.SQL_WRONG_CONNECTION,
      httpStatus: 400
    };
  }
}

async function getLectureReports() {
  try {
    const lectureAccReport = await queryHandler(
      `SELECT ${reportFields} FROM candidates WHERE decision = $1;`,
      [Decisions.ACC_LEC]
    );
    const lectureMvReport = await queryHandler(
      `SELECT ${reportFields} FROM candidates WHERE decision = $1;`,
      [Decisions.MV_LEC]
    );

    return {
      data: {
        lectureAccReport,
        lectureMvReport
      },
      httpStatus: 200
    };
  } catch (err) {
    return {
      data: data,
      message: ErrorMessages.SQL_WRONG_CONNECTION,
      httpStatus: 400
    };
  }
}

async function getRejectedReport() {
  try {
    const rejectedReport = await queryHandler(
      `SELECT ${reportFields} FROM candidates WHERE decision = $1;`,
      [Decisions.REJ]
    );

    return {
      data: {
        rejectedReport
      },
      httpStatus: 200
    };
  } catch (err) {
    return {
      data: data,
      message: ErrorMessages.SQL_WRONG_CONNECTION,
      httpStatus: 400
    };
  }
}

module.exports = { getWorkshopsReports, getLectureReports, getRejectedReport };
