import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Feedback from "../Components/Volunter-Comps/Feedback";
import profpic from "../Pictures/me.png";
import AuthService from "../AuthService";
import TutorialDataService from "../Service";

function ProgramDetailsPopup(props) {
  const [program, setProgram] = useState({});
  const { onClose, data, imageData } = props;
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProgram(data);
  }, [data]);

  useEffect(() => {
    async function fetchFeedbacks() {
      setLoading(true);
      try {
        const token = AuthService.getToken("authToken");
        const response = await TutorialDataService.getFeedbacks(
          token,
          program._id
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    }

    if (program._id) {
      fetchFeedbacks();
    }
  }, [program._id]);

  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <div className="program-details-popup">
      <div className="popup-header">
        {imageData && (
          <img className="cover-image" src={imageData} alt="Program" />
        )}
      </div>
      <div className="close-button" onClick={handleClose}>
        <CloseIcon />
      </div>
      <div className="program-details">
        <div className="program-info">
          <h3>{program.name}</h3>
          <p>{program.description}</p>
          <p>📍 {program.address}</p>
          <p>📅 {program.startDate}</p>
          <p>📅 {program.endDate}</p>
          <p>🧔 {program.maxVolunteer}</p>
        </div>
      </div>
      <div className="feedbacks-section">
        <h4>Feedbacks:</h4>
        {loading ? (
          <p>Loading feedbacks...</p>
        ) : (
          feedbacks.map((feedback) => (
            <Feedback
              key={feedback._id}
              profileImage={feedback.image || profpic}
              profileName={feedback.name || "Anonymous"}
              feedbackText={feedback.content}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProgramDetailsPopup;
