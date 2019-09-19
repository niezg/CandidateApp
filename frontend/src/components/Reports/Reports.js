import React from "react";
import { checkDoesCandidatesCanBeLock } from "../../scripts/candidateLock";
import InvalidMessages from "./InvalidMessages/InvalidMessages";
import LockButton from "./LockButton/LockButton";
import Alert from "./../Alert/Alert";
import { getIsLocked } from "../../routes/appLock";
import DownloadReports from "./DownloadReports/DownloadReports";

class Reports extends React.Component {
  state = {
    isCandidatesCanBeLock: false,
    invalidMessages: [],
    isLocked: false
  };

  componentDidMount() {
    this.setInvalidData();
    this.fetchIsLocked();
  }

  componentDidUpdate(prevProps) {
    if (this.props.allCandidates !== prevProps.allCandidates) {
      this.setInvalidData();
    }
  }

  setIsLocked = isLocked => {
    this.setState({
      isLocked
    });
  };

  async fetchIsLocked() {
    const data = await getIsLocked();

    this.setState({ isLocked: data.result.isLocked });
  }

  setInvalidData() {
    const { allCandidates } = this.props;
    if (allCandidates.length !== 0) {
      const {
        invalidMessages,
        isCandidatesCanBeLock
      } = checkDoesCandidatesCanBeLock(allCandidates);

      this.setState({
        invalidMessages,
        isCandidatesCanBeLock
      });
    }
  }

  render() {
    const { alert } = this.props;
    const { isCandidatesCanBeLock, isLocked, invalidMessages } = this.state;

    return (
      <>
        {alert.isDisplay && <Alert type={alert.type} message={alert.message} />}
        <DownloadReports />
        <LockButton
          isCandidatesCanBeLock={isCandidatesCanBeLock}
          isLocked={isLocked}
          setIsLocked={this.setIsLocked}
        />
        <InvalidMessages messages={invalidMessages} />
      </>
    );
  }
}

export default Reports;
