import React, { useState } from "react";
import AuthService from "../AuthService";
import TutorialDataService from "../Service";

function UpdatePopUp(props) {
  const [arrivalDate, setArrivalDate] = useState("");
  const [whatIDid, setWhatIDid] = useState("");
  const { onClose, porgram_id } = props;

  const handleUpdateArrival = async () => {
    const token = AuthService.getToken("authToken");
    console.log("Updating arrival details:", arrivalDate, whatIDid);
    await TutorialDataService.createReport(
      token,
      whatIDid,
      porgram_id,
      arrivalDate
    );
    onClose();
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>New Report</h2>
        <div className="update-group">
          <div>
            <label htmlFor="arrivalDate" style={{ display: "block" }}>
              Date:
            </label>
            <input
              type="date"
              id="arrivalDate"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="whatIDid"
              style={{ display: "block", marginBottom: "10px" }}
            >
              My Progress for today:
            </label>
            <textarea
              id="whatIDid"
              value={whatIDid}
              onChange={(e) => setWhatIDid(e.target.value)}
              style={{ width: "100%", height: "200px" }}
            />
          </div>
        </div>
        <button onClick={handleUpdateArrival}>Add Report</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default UpdatePopUp;
