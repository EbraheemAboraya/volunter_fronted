import React, { useEffect, useState } from "react";
import "../../App.css";
import ProgramDetailsPopup from "../../Modals/ProgramDetailsPopup";
import TutorialDataService from "../../Service";
import AuthService from "../../AuthService";


function Program(props) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("Apply Now!");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
    async function checkVolunteerStatus() {
      const token = AuthService.getToken("authToken");

      const userData = await TutorialDataService.getUserData(token);
      const volunteer_id = userData.data.id;
      if (program.volunteers.includes(volunteer_id)) {
        setApplicationStatus("Pending");
      }
    }
    checkVolunteerStatus();
  }, [program]);
  const handleApplyClick = () => {
    setIsApplyModalOpen(true);
  };
  const handleApplyConfirmed = async (event) => {
    console.log("Applying...");
    setIsApplyModalOpen(false);
    setApplicationStatus("Pending");
    event.stopPropagation();
    const token = AuthService.getToken("authToken");
    await TutorialDataService.sendToJoin(token, program._id);
  };
  const handleCancelClick = () => {
    setIsApplyModalOpen(false);
  };
  const handleProgramClick = (event) => {
    if (!event.target.classList.contains("apply-button")) {
      setIsPopupOpen(true);
    }
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <div className="program-container" onClick={handleProgramClick}>
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
          {applicationStatus === "Apply Now!" ? (
            <button className="apply-button" onClick={handleApplyClick}>
              {applicationStatus}
            </button>
          ) : (
            <button className="pending-button">{applicationStatus}</button>
          )}
        </div>
      </div>
      {isApplyModalOpen && (
        <div className="finish-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <p>Are you sure you want to apply?</p>
            <div className="button-container">
              <button className="yes-button" onClick={handleApplyConfirmed}>
                Yes
              </button>
              <button className="cancel-button" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isPopupOpen && (
        <ProgramDetailsPopup onClose={handleClosePopup} data={programData} imageData={imageData} />
      )}
    </div>
  );
}
export default Program;
