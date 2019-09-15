const { Decisions } = require("./config");

function isDecisionPossible(workshop, is_lecture, decision) {
  switch (decision.toUpperCase()) {
    case Decisions.ACC_LEC:
      if (!isSignedUpWorkshop(workshop) && is_lecture === true) return true;
      else return false;
    case Decisions.ACC_WOR:
      if (isSignedUpWorkshop(workshop)) return true;
      else return false;
    case Decisions.MV_LEC:
      if (isSignedUpWorkshop(workshop) && is_lecture === true) return true;
      else return false;
    case Decisions.REJ:
      return true;
    default:
      throw "Wrong decision format";
  }
}

function isSignedUpWorkshop(workshop) {
  return workshop >= 1;
}

exports.isDecisionPossible = isDecisionPossible;
