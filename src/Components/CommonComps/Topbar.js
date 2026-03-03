import React, { useEffect, useState } from "react";
import "../../App.css";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import Avatar from "@mui/material/Avatar";

function Topbar(props) {
  const { username, displayName, profilePic } = props;
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    if (profilePic && profilePic.data && profilePic.data.image && profilePic.data.image.data) {
      const base64String = btoa(
        profilePic.data.image.data.reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
      setImageData(
        `data:${profilePic.data.contentType};base64,${base64String}`
      );
    } else {
      setImageData("default_image_url"); 
    }
  }, [profilePic]);

  return (
    <div className="Topbar">
      <div className="left">
        <span>Home</span>
      </div>
      <div className="right">
        <div className="notification">
          <NotificationsIcon />
        </div>
        <div className="separator"></div>
        <div className="profile">
          <Avatar alt="Profile Picture" src={imageData} />
          <div className="profile-info">
            <span className="larger-span">{username}</span>
            <span className="smaller-span">{displayName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
