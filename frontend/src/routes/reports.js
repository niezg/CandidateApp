import { UrlPort } from "../global/config";
import fetchData from "./fetchDataHandler";

export async function getReport() {
  const url = `${UrlPort}/report`;
  return await fetchData(url);
}
