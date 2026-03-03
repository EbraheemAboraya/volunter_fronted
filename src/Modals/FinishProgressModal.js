import React from "react";
import "../App.css";

function FinishProgressModal({ onClose, onConfirmFinish }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Finish Progress</h2>
        <p>Are you sure you want to finish the progress?</p>
        <div className="popup-buttons">
          <button className="confirm-button" onClick={onConfirmFinish}>
            Yes
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinishProgressModal;
