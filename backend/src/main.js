const express = require("express");
const { addCandidateRoutes } = require("./routing");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

addCandidateRoutes(app);

app.listen(3001, function() {
  console.log("Listening..");
});
