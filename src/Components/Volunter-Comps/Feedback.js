import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

function Feedback(props) {
  const { profileImage, profileName, feedbackText } = props;

  const [imageData, setImageData] = useState("");
  const img = profileImage.image;
  const data = profileImage.image.data;

  useEffect(() => {
    if (img && data) {
      const base64String = btoa(
        data.reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
      setImageData(`data:${profileImage.image.contentType};base64,${base64String}`);
    }
  }, [profileImage.image]);
    
  return (
    <div className="feedback">
      <div className="feedback-profile-image">
      <Avatar alt="Profile Picture" src={imageData} />
      </div>
      <div className="profile-info">
        <h4>{profileName}</h4>
        <p>{feedbackText}</p>
      </div>
    </div>
  );
}

export default Feedback;
