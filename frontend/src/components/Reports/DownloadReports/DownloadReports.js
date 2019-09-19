import React from "react";
import {
  getRejectedReport,
  getLectureReports,
  getWorkshopsReports
} from "../../../routes/reports";

import FileSaver from "file-saver";
const ColumnNames = "Name LastName Email\n";

const DownloadReports = () => {
  const downloadLectureReport = async () => {
    const data = await getLectureReports();

    const lectureAccReport = data.result.lectureAccReport.map(
      item => `${item.name} ${item.lastname} ${item.email}\n`
    );
    const lectureMvReport = data.result.lectureMvReport.map(
      item => `${item.name} ${item.lastname} ${item.email}\n`
    );

    const titleAcc = " AcceptedLecture \n";
    const titleMv = " MoveToLecture \n";

    FileSaver.saveAs(
      new Blob(
        [
          titleAcc,
          ColumnNames,
          ...lectureAccReport,
          titleMv,
          ColumnNames,
          ...lectureMvReport
        ],
        {
          type: "text/plain;charset=utf-8"
        }
      ),
      "lectureReport.csv"
    );
  };

  const downloadRejectedReport = async () => {
    const data = await getRejectedReport();

    const rejectedReport = data.result.rejectedReport.map(
      item => `${item.name} ${item.lastname} ${item.email}\n`
    );

    const title = " Rejected \n ";

    FileSaver.saveAs(
      new Blob([title, ColumnNames, ...rejectedReport], {
        type: "text/plain;charset=utf-8"
      }),
      "rejectedReport.csv"
    );
  };

  const downloadWorkshopsReports = async () => {
    const data = await getWorkshopsReports();

    console.log("data :", data);
    const workshopAccReports = data.result.workshopAccReports.map(accReport => {
      const report = accReport.report.map(
        item => `${item.name} ${item.lastname} ${item.email}\n`
      );
      const workshopName = accReport.workshop.name;
      const workshopNumber = accReport.workshop.number;

      const title = `Workshop${workshopNumber}: ${workshopName}`;
      return { report, title };
    });

    workshopAccReports.forEach(({ title, report }) => {
      FileSaver.saveAs(
        new Blob([`${title}\n\n`, ColumnNames, ...report], {
          type: "text/plain;charset=utf-8"
        }),
        `${title}Report.csv`
      );
    });
  };

  return (
    <>
      <button onClick={downloadRejectedReport}>Rejected report</button>
      <button onClick={downloadLectureReport}>Lecture report</button>
      <button onClick={downloadWorkshopsReports}>Workshops reports</button>
    </>
  );
};

export default DownloadReports;
