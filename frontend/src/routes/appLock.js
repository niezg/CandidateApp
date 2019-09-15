import { UrlPort } from "../global/config";
import fetchData from "./fetchDataHandler";

export async function getIsLocked() {
  const url = `${UrlPort}/islocked`;
  return await fetchData(url);
}

export async function setAppLock() {
  const url = `${UrlPort}/lock`;
  const requestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  };
  return await fetchData(url, requestInit);
}

export async function setAppUnLock() {
  const url = `${UrlPort}/unlock`;
  const requestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  };
  return await fetchData(url, requestInit);
}
