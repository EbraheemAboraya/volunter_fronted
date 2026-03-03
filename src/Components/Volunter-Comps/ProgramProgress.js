import React, { useEffect, useState } from "react";
import UpdatePopUp from "../../Modals/UpdatePopUp"; // Import the UpdatePopUp component
import "../../App.css";

import ReviewPopup from "../../Modals/ReviewPopup"; // Import the ReviewPopup component

function ProgramProgress(props) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
  const [programData, setProgramData] = useState({});
  const [imageData, setImageData] = useState("");
  const { program } = props;
  const img = program.image;
  const data = program.image.image.data;

  useEffect(() => {
    if (img && data) {
      const base64String = btoa(
        data.reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
      setImageData(`data:${program.image.contentType};base64,${base64String}`);
    }
  }, [program.image]);

  useEffect(() => {
    setProgramData(program);
  }, [program]);

  const handleUpdateClick = () => {
    setIsPopUpOpen(true);
  };

  const handleFinishClick = () => {
    setIsFinishModalOpen(true);
  };

  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
  };

  const handleYesClick = () => {
    console.log("User clicked Yes");
    setIsReviewMode(true);
    setIsFinishModalOpen(false); // Close the finish modal
  };

  const handleCancelClick = () => {
    console.log("User clicked Cancel");
    setIsFinishModalOpen(false); // Close the finish modal
  };

  const handleWriteReviewClick = () => {
    setIsReviewPopupOpen(true);
  };

  const handleCloseReviewPopup = () => {
    setIsReviewPopupOpen(false);
  };

  return (
    <div className="program-container">
      <div className="program-image">
        {imageData && <img src={imageData} alt="Program" />}
      </div>
      <div className="program-details">
        <div className="program-info">
          <h3>{programData.name}</h3>
          <p>{programData.description}</p>
          <p>📍 {programData.address}</p>
          <p>📅 {programData.startDate}</p>
          <p>📅 {programData.endDate}</p>
        </div>
        <div>
          {isReviewMode ? (
            <button className="review-button" onClick={handleWriteReviewClick}>
              Write a review!
            </button>
          ) : (
            <>
              <button className="finish-button" onClick={handleFinishClick}>
                Finish
              </button>
              <button className="update-button" onClick={handleUpdateClick}>
                Update
              </button>
            </>
          )}
        </div>
      </div>
      {isPopUpOpen && (
        <UpdatePopUp onClose={handleClosePopUp} porgram_id={programData._id} />
      )}
      {isFinishModalOpen && (
        <div className="finish-modal">
          <div className="modal-content">
            <p>Are you sure you want to finish the progress?</p>
            <div className="button-container">
              <button className="yes-button" onClick={handleYesClick}>
                Yes
              </button>
              <button className="cancel-button" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isReviewPopupOpen && (
        <ReviewPopup
          onClose={handleCloseReviewPopup}
          porgram_id={programData._id}
        />
      )}
    </div>
  );
}

export default ProgramProgress;
