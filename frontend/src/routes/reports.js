import { UrlPort } from "../global/config";
import fetchData from "./fetchDataHandler";

export async function getWorkshopsReports() {
  const url = `${UrlPort}/report/workshops`;
  return await fetchData(url);
}

export async function getRejectedReport() {
  const url = `${UrlPort}/report/rejected`;
  return await fetchData(url);
}

export async function getLectureReports() {
  const url = `${UrlPort}/report/lecture`;
  return await fetchData(url);
}
