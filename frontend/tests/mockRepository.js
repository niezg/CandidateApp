import { Decisions } from "./../src/global/decisionType";

const candidates = [
  {
    name: "Jan",
    lastname: "Niezbędny",
    email: "email@email.com",
    role: "Traktorzysta",
    company: "Ursus",
    workshop: 1,
    is_lecture: true,
    motivation: "long motivation and very boring",
    decision: Decisions.REJ
  },
  {
    name: "Grzesiu",
    lastname: "Kawecki",
    email: "email2@email.com",
    role: "Poszukiwacz błota",
    company: "Pathfinder",
    workshop: null,
    is_lecture: true,
    motivation: "long motivation and very boring",
    decision: Decisions.ACC_LEC
  },
  {
    name: "Norman",
    lastname: "Fines",
    email: "email3@email.com",
    role: "Programista",
    company: "CL 2.0",
    workshop: 5,
    is_lecture: true,
    motivation: "long motivation and very boring",
    decision: Decisions.ACC_WOR
  },
  {
    name: "Fay",
    lastname: "Mann",
    email: "email4@email.com",
    role: "Fizyk",
    company: "USGov",
    workshop: 5,
    is_lecture: true,
    motivation: "long motivation and very boring",
    decision: Decisions.MV_LEC
  },
  {
    name: "Norman2",
    lastname: "Fines2",
    email: "email2n@email.com",
    role: "Programista",
    company: "CL 2.0",
    workshop: 5,
    is_lecture: true,
    motivation: "long motivation and very boring",
    decision: Decisions.REJ
  },
  {
    name: "Fay",
    lastname: "Mann",
    email: "email2f@email.com",
    role: "Fizyk",
    company: "USGov",
    workshop: 5,
    is_lecture: true,
    motivation: "long motivation and very boring",
    decision: Decisions.ACC_WOR
  }
];

function getCandidates() {
  return candidates;
}

export { getCandidates, candidates };
