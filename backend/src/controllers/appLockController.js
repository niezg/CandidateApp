const { queryHandler } = require("../candidateRepository");
const {
  Workshops,
  MaxEventParticipants,
  Decisions,
  ErrorMessages
} = require("../config");
const workshops = Object.values(Workshops);

async function setAppLock() {
  try {
    const data = await queryHandler(
      `SELECT state FROM variables WHERE variable = 'is_locked'`
    );

    if (data[0].state === true) {
      return {
        message: "Base already Locked.",
        httpStatus: 402
      };
    }

    const recordsWithoutDecision = await queryHandler(
      `SELECT decision FROM candidates WHERE decision IS NULL `
    );

    const numberOfCandidatesWithoutDecision = recordsWithoutDecision.length;

    const dataCountEventParticipants = await queryHandler(
      `SELECT COUNT(decision) FROM candidates WHERE decision = $1 OR decision = $2 OR decision = $3`,
      [Decisions.ACC_WOR, Decisions.ACC_LEC, Decisions.MV_LEC]
    );

    const numberOfEventParticipants = dataCountEventParticipants[0].count * 1;

    const isWorkshopsExceededLimit = await Promise.all(
      workshops.map(async workshop => {
        const dataCountAccWor = await queryHandler(
          `SELECT COUNT(decision) FROM candidates WHERE workshop = $1 AND decision = $2;`,
          [workshop.number, Decisions.ACC_WOR]
        );
        const numberAccWor = dataCountAccWor[0].count * 1;
        return numberAccWor > workshop.maxParticipants;
      })
    );

    const errorMessages = [];
    if (numberOfCandidatesWithoutDecision > 0)
      errorMessages.push("There are candidates with no decision.");
    if (numberOfEventParticipants > MaxEventParticipants)
      errorMessages.push("Event participants limit exceeded.");
    if (isWorkshopsExceededLimit.find(item => item) !== undefined)
      errorMessages.push("Workshop participants limit exceeded.");

    if (errorMessages.length > 0) {
      return {
        message: errorMessages.join("\n"),
        httpStatus: 402
      };
    } else {
      await queryHandler(
        `UPDATE variables SET state = true WHERE variable = 'is_locked'`
      );

      return {
        message: "The base is locked",
        httpStatus: 200
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: ErrorMessages.SQL_WRONG_CONNECTION,
      httpStatus: 404
    };
  }
}

async function appUnlock() {
  try {
    const data = await queryHandler(
      `UPDATE variables SET state = false WHERE variable = 'is_locked'`
    );
    return {
      message: "The base is unlocked",
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

async function getIsLocked() {
  try {
    const data = await queryHandler(
      `SELECT state FROM variables WHERE variable = 'is_locked'`
    );
    console.log(data);
    return {
      data: { isLocked: data[0].state },
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

module.exports = {
  getIsLocked,
  setAppLock,
  appUnlock
};
