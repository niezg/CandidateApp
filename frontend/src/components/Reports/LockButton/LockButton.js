import React from "react";
import Swal from "sweetalert2";
import { validateData } from "./../../../scripts/dataValidation";
import { setAppLock, setAppUnLock } from "./../../../routes/appLock";

const LockButton = props => {
  const handleClickLock = () => {
    Swal.fire({
      title: "Are you sure?",
      text:
        "This button will enable automatic mailing to candidates and some changes will no longer be possible.",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, lock candidates.",
      cancelButtonText: "cancel"
    }).then(async result => {
      if (result.value) {
        const data = await setAppLock();

        if (validateData(data)) {
          Swal.fire(
            "Candidates blocked",
            "Changes of candidates are no longer possible.",
            "success"
          );
          props.setIsLocked(true);
        } else {
          Swal.fire("Something goes wrong", data.result.message, "error");
        }
      }
    });
  };

  const handleClickUnLock = () => {
    Swal.fire({
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, unlock candidates.",
      cancelButtonText: "cancel"
    }).then(async result => {
      if (result.value) {
        const data = await setAppUnLock();

        if (validateData(data)) {
          Swal.fire(
            "Candidates Unblocked",
            "Changes of candidates are already possible.",
            "success"
          );
          props.setIsLocked(false);
        } else {
          Swal.fire("Something goes wrong", data.result.message, "error");
        }
      }
    });
  };

  const { isCandidatesCanBeLock, isLocked } = props;
  return (
    <>
      {!isLocked && (
        <button disabled={!isCandidatesCanBeLock} onClick={handleClickLock}>
          Lock Candidates
        </button>
      )}
      {isLocked && (
        <button onClick={handleClickUnLock}>UnLock Candidates</button>
      )}
    </>
  );
};

export default LockButton;
