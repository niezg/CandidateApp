import { Decisions } from "../global/decisionType";

export function isDecisionPossible(
  { workshop, is_lecture, decision },
  newDecision
) {
  switch (newDecision) {
    case Decisions.ACC_LEC:
      if (
        !isSignedUpWorkshop(workshop) &&
        is_lecture === true &&
        !isDecisionTheSame(newDecision, decision)
      )
        return true;
      else return false;

    case Decisions.ACC_WOR:
      if (
        isSignedUpWorkshop(workshop) &&
        !isDecisionTheSame(newDecision, decision)
      )
        return true;
      else return false;

    case Decisions.MV_LEC:
      if (
        isSignedUpWorkshop(workshop) &&
        is_lecture === true &&
        !isDecisionTheSame(newDecision, decision)
      )
        return true;
      else return false;

    case Decisions.REJ:
      if (!isDecisionTheSame(newDecision, decision)) return true;
      else return false;

    default:
      console.log("Wrong decision format");
  }
}

function isDecisionTheSame(newDecision, decision) {
  if (!decision) return false;
  return newDecision.toUpperCase() === decision.toUpperCase();
}

function isSignedUpWorkshop(workshop) {
  return workshop >= 1;
}
