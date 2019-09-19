const {
  getAllCandidates,
  getCandidate,
  createNewCandidate,
  getCandidatesForLecture,
  getCandidatesFromWorkshop,
  updateDecisionCandidate
} = require("./controllers/candidateController");

const {
  getWorkshopsReports,
  getLectureReports,
  getRejectedReport
} = require("./controllers/reportsController");

const {
  getIsLocked,
  setAppLock,
  appUnlock
} = require("./controllers/appLockController");

function addCandidateRoutes(app) {
  app.get("/candidates", async (request, response) => {
    const { data, httpStatus } = await getAllCandidates();
    response.status(httpStatus).send(data);
  });

  app.post("/candidate", async (request, response) => {
    const { email } = request.body;
    const { data, httpStatus } = await getCandidate(email);
    response.status(httpStatus).send(data);
  });

  app.get("/candidates/lecture", async (request, response) => {
    const { data, httpStatus } = await getCandidatesForLecture();
    response.status(httpStatus).send(data);
  });

  app.get("/candidates/workshop/:workshop", async (request, response) => {
    const { workshop } = request.params;
    const { data, httpStatus } = await getCandidatesFromWorkshop(workshop);
    response.status(httpStatus).send(data);
  });

  app.post("/candidates", async (request, response) => {
    const candidate = request.body;
    const { httpStatus, message, errorEmailExist } = await createNewCandidate(
      candidate
    );
    response.status(httpStatus).send({ message, errorEmailExist });
  });

  app.put("/candidates/decision", async (request, response) => {
    const { email, decision } = request.body;
    const { message, httpStatus } = await updateDecisionCandidate(
      decision,
      email
    );
    response.status(httpStatus).send({ message });
  });

  app.get("/report/workshops", async (request, response) => {
    const { data, httpStatus } = await getWorkshopsReports();
    response.status(httpStatus).send(data);
  });

  app.get("/report/lecture", async (request, response) => {
    const { data, httpStatus } = await getLectureReports();
    response.status(httpStatus).send(data);
  });

  app.get("/report/rejected", async (request, response) => {
    const { data, httpStatus } = await getRejectedReport();
    response.status(httpStatus).send(data);
  });

  app.put("/lock", async (request, response) => {
    const { message, httpStatus } = await setAppLock();
    response.status(httpStatus).send({ message });
  });

  app.put("/unlock", async (request, response) => {
    const { message, httpStatus } = await appUnlock();
    response.status(httpStatus).send({ message });
  });

  app.get("/islocked", async (request, response) => {
    const { data, httpStatus } = await getIsLocked();
    response.status(httpStatus).send(data);
  });
}

exports.addCandidateRoutes = addCandidateRoutes;
