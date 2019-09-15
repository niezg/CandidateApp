import { Workshops, MaxEventParticipants } from "../global/config";
import { Decisions } from "../global/decisionType";

export function countEventParticipants(candidates) {
  return candidates.reduce((accumulator, candidate) => {
    return accumulator + isEventParticipant(candidate);
  }, 0);
}

export function countWorkshopParticipants(candidates) {
  return candidates.reduce((accumulator, candidate) => {
    return accumulator + isWorkshopParticipant(candidate);
  }, 0);
}

export function checkDoesCandidatesCanBeLock(allCandidates) {
  const invalidMessages = [];
  const workshops = Object.values(Workshops);

  const allParticipantsNumber = countEventParticipants(allCandidates);

  if (allParticipantsNumber > MaxEventParticipants)
    invalidMessages.push(
      `All participants are ${allParticipantsNumber} / ${MaxEventParticipants}`
    );
  console.log("object :", doesEveryoneHaveDecision(allCandidates));
  if (!doesEveryoneHaveDecision(allCandidates))
    invalidMessages.push(`Not all candidates have a decision`);

  const workshopsInvalidMessages = workshops.reduce(
    (invMessages, workshop, index) => {
      const participantsNumber = countWorkshopParticipants(
        // eslint-disable-next-line
        allCandidates.filter(candidate => candidate.workshop == index + 1)
      );

      if (participantsNumber > workshop.maxParticipants) {
        invMessages.push(
          `${workshop.name} workshop participants are ${participantsNumber} / ${workshop.maxParticipants}`
        );
      }
      return invMessages;
    },
    []
  );

  invalidMessages.push(...workshopsInvalidMessages);
  if (invalidMessages.length > 0)
    return {
      isCandidatesCanBeLock: false,
      invalidMessages
    };

  return {
    isCandidatesCanBeLock: true,
    invalidMessages: ["Candidates base can be lock."]
  };
}

export const isEventParticipant = candidate => {
  if (
    candidate.decision === Decisions.ACC_LEC ||
    candidate.decision === Decisions.MV_LEC ||
    candidate.decision === Decisions.ACC_WOR
  )
    return true;
  return false;
};

export const isWorkshopParticipant = candidate => {
  if (candidate.decision === Decisions.ACC_WOR) return true;
  return false;
};

function doesEveryoneHaveDecision(allCandidates) {
  return (
    allCandidates.find(
      candidate =>
        !isEventParticipant(candidate) && candidate.decision !== Decisions.REJ
    ) === undefined
  );
}
