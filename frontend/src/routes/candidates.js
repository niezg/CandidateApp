import { UrlPort } from "../global/config";
import fetchData from "./fetchDataHandler";

export async function getAllCandidates() {
  const url = `${UrlPort}/candidates`;
  return await fetchData(url);
}

export async function getCandidatesForLecture() {
  const url = `${UrlPort}/candidates/lecture`;
  return await fetchData(url);
}

export async function getCandidatesFromWorkshop(workshop) {
  const url = `${UrlPort}/candidates/workshop/${workshop}`;
  return await fetchData(url);
}

export async function getIsLockCandidateChanges() {
  const url = `${UrlPort}/lock`;
  return await fetchData(url);
}

export async function addCandidate(candidate) {
  const url = `${UrlPort}/candidates`;
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(candidate)
  };

  return await fetchData(url, requestInit);
}

export async function updateDecisionCandidate(email, newDecision) {
  const url = `${UrlPort}/candidates/decision`;
  const requestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, decision: newDecision })
  };
  return await fetchData(url, requestInit);
}

export async function getCandidate(email) {
  const url = `${UrlPort}/candidate`;
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  };

  return await fetchData(url, requestInit);
}
