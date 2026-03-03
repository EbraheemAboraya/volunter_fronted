import React, { useState } from "react";
import "../App.css"; // Import the CSS file for styling
import ProfilePicture from "../Pictures/Program.png"; // Import the profile picture
import AuthService from "../AuthService";
import TutorialDataService from "../Service";

function ReviewPopup(props) {
  const [reviewText, setReviewText] = useState(""); // State to track the review text
  const { onClose, porgram_id } = props;

  const handleInputChange = (event) => {
    setReviewText(event.target.value); // Update the review text state
  };

  const handleSubmit = async () => {
    const token = AuthService.getToken("authToken");
    console.log("Review submitted:", reviewText);
    const reportRes = await TutorialDataService.finishProgram(token,porgram_id,reviewText);
    console.log(reportRes);
    onClose();
  };

  return (
    <div className="review-popup">
      <div className="popup-content">
        <img src={ProfilePicture} alt="Profile" className="profile-picture" />
        <textarea
          className="review-textarea"
          placeholder="How was your experience?"
          value={reviewText} // Bind the value of the textarea to the reviewText state
          onChange={handleInputChange} // Handle changes in the textarea
        ></textarea>
        <div className="button-container">
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewPopup;
