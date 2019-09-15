require("dotenv").config();

const ConnectionString = process.env.CONNECTION_STRING;

const UrlPort = "http://localhost:3001";

const MaxEventParticipants = 250;

const Workshops = {
  ONE: { name: "Workshop one", maxParticipants: 6, number: 1 },
  TWO: { name: "Workshop two", maxParticipants: 6, number: 2 },
  THREE: { name: "Workshop three", maxParticipants: 4, number: 3 },
  FOUR: { name: "Workshop four", maxParticipants: 4, number: 4 },
  FIVE: { name: "Workshop five", maxParticipants: 8, number: 5 },
  SIX: { name: "Workshop six", maxParticipants: 8, number: 6 }
};

const Decisions = {
  ACC_LEC: "ACC_LEC",
  ACC_WOR: "ACC_WOR",
  MV_LEC: "MV_LEC",
  REJ: "REJ"
};

const ErrorMessages = {
  SQL_WRONG_CONNECTION:
    "Something goes wrong with the connection to the SQL database."
};

module.exports = {
  UrlPort,
  MaxEventParticipants,
  Workshops,
  Decisions,
  ErrorMessages,
  ConnectionString
};
